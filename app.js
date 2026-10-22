const express = require("express");
const app = express();
const db = require("./db/database");
const boardsRouter = require("./router/boards");
const usersRouter = require('./router/users')
const tasksRouter = require('./router/tasks')
const bcrypt = require("bcrypt");
const session = require("express-session");
const PORT = process.env.PORT || 3000;
const { requireAuth, requireGuest } = require("./middleware/auth");

app.use(express.json());
app.use(express.static("public"));
app.use(
  session({
    secret: "taskflow-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  }),
);
app.use("/boards", boardsRouter);
app.use('/users', usersRouter)
app.use('/tasks', tasksRouter)

app.post("/register/api", requireGuest, (req, res) => {
  const { name, username, email, password } = req.body;
  const validationQuery = "SELECT * FROM users WHERE username = ? or email = ?";
  const insertQuery =
    'INSERT INTO users(fullname, username, email, password, created_at) VALUES (?, ?, ?, ?, DATETIME("now", "+8 hours"))';

  db.get(validationQuery, [username, email], (err, row) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
    if (row) {
      return res.status(409).json({
        success: false,
        message: "Username or email already exists",
      });
    }
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Internal Server Error",
        });
      }
      db.run(insertQuery, [name, username, email, hashedPassword], (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: "Internal Server Error",
          });
        }
        return res.status(201).json({
          success: true,
          message: "Account created successfully.",
        });
      });
    });
  });
});
app.post("/login/api", requireGuest, (req, res) => {
  const { username, password } = req.body;
  const query = "SELECT id, password, role FROM users WHERE username = ?";
  db.get(query, [username], (err, user) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Internal Server Error",
        });
      }
      if (!result) {
        return res.status(401).json({
          success: false,
          message: "Invalid username or password",
        });
      }
      req.session.userId = user.id;
      return res.status(200).json({
        success: true,
        message: "Login successful",
      });
    });
  });
});
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/html/index.html");
});
app.get("/login", requireGuest, (req, res) => {
  res.sendFile(__dirname + "/html/login.html");
});
app.get("/register", requireGuest, (req, res) => {
  res.sendFile(__dirname + "/html/signup.html");
});
app.get("/dashboard", requireAuth, (req, res) => {
  res.sendFile(__dirname + "/html/dashboard.html");
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
