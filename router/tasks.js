const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/auth");
const db = require("../db/database");

router.get('/api', requireAuth, (req, res) => {
  const id = Number(req.query.boardID)
  const query = `SELECT id, title, description, status, priority, due_date, assignee_id FROM tasks WHERE board_id = ?`
  db.all(query, [id], (err, tasks) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: 'Internal Server Error'
      })  
    }
    return res.status(200).json({
      success: true,
      data: tasks
    })
  })
})
router.post("/new/api", requireAuth, (req, res) => {
  const boardID = Number(req.body.boardID)
  const assigneeID = Number(req.body.assigneeID)
  const { title, description, status, priority, due } = req.body;
  if (Number.isNaN(boardID)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid board id'
    })
  }
  if (Number.isNaN(assigneeID)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid assignee id'
    })
  }
  if (!title?.trim() || !description?.trim() || !due?.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Invalid inputs'
    })
  }
  const query = 'INSERT INTO tasks(board_id, assignee_id, title, description, status, priority, due_date, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, DATETIME("now", "+8 hours"))'
  db.run(query, [boardID, assigneeID, title, description, status, priority, due], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: 'Internal Server Error'
      })
    }
    return res.status(200).json({
      success: true,
      message: 'Task created successfully'
    })
  })
});

module.exports = router;
