const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/auth");
const db = require("../db/database");

router.get("/api", requireAuth, (req, res) => {
    const { boardID } = req.query
    if (!boardID) {
        return res.status(400).json({
            success: false,
            message: "Board ID is required"
        });
    }
    const query = 'SELECT users.* FROM board_members JOIN users ON board_members.user_id = users.id WHERE board_members.board_id = ?'
    db.all(query, [boardID], (err, users) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error'
            })
        }
        return res.status(200).json({
            success: true,
            data: users
        })
    })
});
router.get("/:id", requireAuth, (req, res) => {
    
})
module.exports = router;
