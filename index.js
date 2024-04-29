import express from "express";
import pg from "pg";
import bodyParser from "body-parser";
import session from "express-session";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
dotenv.config();

const password = process.env.PASS;
const port = process.env.PORT;
const app = express();

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "Affinity",
  password: password,
  port: port,
});
db.connect();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(
  session({
    secret: "secret-key",
    resave: true,
    saveUninitialized: true,
  })
);

// Function to hash password
const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
};

// Error handler middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
};

app.post("/signup", async (req, res, next) => {
  try {
    const hashedPassword = await hashPassword(req.body.pass);
    await db.query(
      "INSERT INTO user_data (username, email, password) VALUES ($1, $2, $3)",
      [req.body.user, req.body.mail, hashedPassword]
    );
    res.render("index.ejs");
  } catch (error) {
    next(error);
  }
});

app.post("/log", async (req, res, next) => {
  try {
    const pass = req.body.pass;
    const hashedPassword = await hashPassword(pass);
    req.session.pass = hashedPassword;
    const userData = await db.query(
      "SELECT name, username FROM user_data WHERE password = $1",
      [hashedPassword]
    );
    res.render("index.ejs", {
      Name: userData.rows[0].name,
    });
  } catch (error) {
    next(error);
  }
});

app.get("/profile", async (req, res, next) => {
  try {
    const userData = await db.query(
      "SELECT * FROM user_data WHERE password = $1",
      [req.session.pass]
    );
    if (userData.rows.length > 0) {
      const { name, email, phone, mob, address, web, github, twitter, instagram, facebook, username, password, image } = userData.rows[0];
      res.render("profile.ejs", {
        Name: name,
        Mail: email,
        phone: phone,
        Mobile: mob,
        Address: address,
        website: web,
        Github: github,
        twitter: twitter,
        insta: instagram,
        facebook: facebook,
        user: username,
        image: image,
      });
    } else {
      res.render("index.ejs");
    }
  } catch (error) {
    next(error);
  }
});

app.use(errorHandler);

app.listen(2000, () => {
  console.log("Server started on port 2000");
});
