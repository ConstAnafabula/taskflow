const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./taskflow.db");

db.run(`
CREATE TABLE IF NOT EXISTS checklist (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    task_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    is_completed INTEGER NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,

    FOREIGN KEY (task_id)
        REFERENCES tasks(id)
        ON DELETE CASCADE
);
    `);

module.exports = db;
