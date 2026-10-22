const express = require("express");
const router = express.Router();
const path = require("path");
const { requireAuth } = require("../middleware/auth");
const db = require("../db/database");

function generateJoinCode(length = 8) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    code += chars[randomIndex];
  }

  return code;
}
function validateJoinCode(callback) {
  const joinCode = generateJoinCode();
  const validationQuery = "SELECT * FROM boards WHERE join_code = ?";
  db.get(validationQuery, [joinCode], (err, board) => {
    if (err) {
      return callback(err);
    }
    if (board) {
      return validateJoinCode(callback);
    }
    callback(null, joinCode);
  });
}
router.get("/api", requireAuth, (req, res) => {
  const userId = req.session.userId;
  const query =
    "SELECT boards.* FROM board_members JOIN boards ON board_members.board_id = boards.id WHERE board_members.user_id = ?";
  db.all(query, [userId], (err, rows) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
    return res.status(200).json({
      success: true,
      data: rows,
    });
  });
});
router.post("/new/api", requireAuth, (req, res) => {
  const { name, desc, visibility } = req.body;
  const userId = req.session.userId;

  validateJoinCode((err, joinCode) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
    const boardQuery =
      "INSERT INTO boards(owner_id, name, description, visibility, join_code, created_at, updated_at) VALUES (?, ?, ?, ?, ?, DATETIME('now', '+8 hours'), DATETIME('now', '+8 hours'))";
    const boardMemberQuery =
      'INSERT INTO board_members(board_id, user_id, joined_at) VALUES(?, ?, DATETIME("now", "+8 hours"))';
    db.run("BEGIN TRANSACTION", (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: 'Internal Server Error'
        })
      }
      db.run(boardQuery, [userId, name, desc, visibility, joinCode], function (err) {
          if (err) {
            return db.run('ROLLBACK', () => {
              console.log(err);
              res.status(500).json({
                success: false,
                message: "Internal Server Error",
              });
            })
          }
          
          const boardId = this.lastID;

          db.run(boardMemberQuery, [boardId, userId], (err) => {
            if (err) {
              return db.run('ROLLBACK', () => {
                console.log(err);
                res.status(500).json({
                  success: false,
                  message: "Internal Server Error",
                });
              })
            }

            db.run('COMMIT', (err) => {
              if (err) {
                return db.run('ROLLBACK', () => {
                  console.log(err);
                  res.status(500).json({
                    success: false,
                    message: 'Internal Server Error'
                  })
                })
              }
              return res.status(200).json({
                success: true,
                message: "Board created successfully",
              });
            })
          });
        },
      );
    });
  });
});
router.get("/:id/api", (req, res) => {
  const id = req.params.id;
  const userID = req.session.userId
  const validationQuery = `
                          SELECT 1 
                          FROM board_members
                          WHERE board_id= ? AND user_id = ?
                          `
  const boardQuery = `
                      SELECT boards.*, owner.fullname AS owner_name
                      FROM boards
                      JOIN users AS owner
                      ON owner.id = boards.owner_id
                      WHERE boards.id = ?;
                    `;
  const membersQuery = `
                        SELECT users.id, users.fullname
                        FROM board_members
                        JOIN users
                        ON users.id = board_members.user_id
                        WHERE board_members.board_id = ?;
                        `
  db.get(validationQuery, [id, userID], (err, member) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: 'Internal Server Error'
      })
    }
    if (!member) {
      return res.status(404).json({
        success: false,
        message: '404 Not found'
      })
    }
    db.get(boardQuery, [id], (err, board) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Internal Server Error",
        });
      }
      if (!board) {
        return res.status(404).json({
          success: false,
          message: "Board not found"
        });
      }
      db.all(membersQuery, [id], (err, members) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: "Internal Server Error",
          });
        }
        return res.status(200).json({
          success: true,
          data: {
            board: board,
            members: members
          },
        });
      });
    })
  })
});
router.get('/join/:code/api', requireAuth, (req, res) => {
  const code = req.params.code
  const query = 'SELECT boards.*, users.fullname, COUNT(board_members.user_id) as memberNum FROM boards JOIN users ON boards.owner_id = users.id JOIN board_members ON boards.id = board_members.board_id WHERE join_code = ? GROUP BY boards.id'
  db.get(query, [code], (err, board) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: 'Internal Server Error'
      })
    }
    return res.status(200).json({
      success: true,
      data: board
    })
  })
})
router.post('/join/:code/api', (req, res) => {
  const userId = Number(req.session.userId)
  const { boardID } = req.body
  const validationQuery = 'SELECT user_id FROM board_members WHERE board_id = ? AND user_id = ?'
  const query = 'INSERT INTO board_members(board_id, user_id, joined_at) VALUES (?, ?, DATETIME("now", "+8 hours"))'
  db.get(validationQuery, [boardID, userId], (err, user) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: 'Internal Server Error'
      })
    }
    if (user) {
      return res.status(409).json({
        success: false,
        message: "You're already a member of this board"
      })
    }
    db.run(query, [boardID, userId], (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: 'Internal Server Error'
        })
      }
      return res.status(200).json({
        success: true,
        message: 'Member joined successfully'
      })
    })
  })
})
router.get("/", requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "html", "boards.html"));
});
router.get("/:id", requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "html", "board.html"));
});
router.get('/join/:code', requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'html', 'join.html'))
})
module.exports = router;
