import express from "express";
import pg from "pg";
import bodyParser from "body-parser";
import session from "express-session";
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

app.post("/signup", async (req, res) => {
  await db.query(
    "Insert into user_data (username, email,password) values($1,$2,$3)",
    [req.body.user, req.body.mail, req.body.pass]
  );
  const userData = await db.query(
    "select name, username from user_data where password = $1",
    [req.body.pass]
  );
  res.render("index.ejs", {
    Name: userData.rows[0].name,
  });
});

app.get("/index", async (req, res) => {
  res.render("index.ejs");
});
app.get("/courses", async (req, res) => {
  res.render("courses.ejs");
});
app.get("/environment", async (req, res) => {
  res.render("environment.ejs");
});
app.post("/profile", async (req, res) => {
  const userData = await db.query("select * from user_data");
  console.log(userData);
  if (userData.rows.length > 0) {
    const { nm, mal, phn, mob, add, web, git, twi, inst, fb, usr, ps, img } =
      userData.rows[0];
    res.render("profile.ejs", {
      Name: nm,
      Mail: mal,
      phone: phn,
      Mobile: mob,
      Address: add,
      website: web,
      Github: git,
      twitter: twi,
      insta: inst,
      facebook: fb,
      user: usr,
      image: img,
    });
  } else {
    render("index.js");
  }
});
app.post("/home", async(req,res) => {
  const userData = await db.query("select name from user_data where password = $1",[req.session.pass]);
  res.render("index.ejs",{
    Name:userData.rows[0].name,
  })
})
app.post("/log", async (req, res) => {
    const pass = req.body.pass;
    req.session.pass = pass;
    const userData = await db.query(
      "select name, username from user_data where password = $1",
      [req.body.pass]
    );
    res.render("index.ejs", {
      Name: userData.rows[0].name,
    });
  });


app.get("/profile", async (req, res) => {
  const userData = await db.query("select * from user_data where password=$1",[req.session.pass]);
  console.log(req.session.pass);
  console.log(userData.rows[0]);
  if (userData.rows.length > 0) {
    const nm = userData.rows[0].name;
    const mal = userData.rows[0].email;
    const phn = userData.rows[0].phone;
    const mob = userData.rows[0].mob;
    const add = userData.rows[0].address;
    const web = userData.rows[0].web;
    const git = userData.rows[0].github;
    const twi = userData.rows[0].twitter;
    const inst = userData.rows[0].instagram;
    const fb = userData.rows[0].facebook;
    const usr = userData.rows[0].username;
    const ps = userData.rows[0].password;
    const img = userData.rows[0].image;

    console.log(nm + " " + mal);
    res.render("profile.ejs", {
      Name: nm,
      Mail: mal,
      phone: phn,
      Mobile: mob,
      Address: add,
      website: web,
      Github: git,
      twitter: twi,
      insta: inst,
      facebook: fb,
      user: usr,
      image: img,
    });
  } else {
    res.render("index.ejs");
  }
});

app.post("/enviornment", async(req,res) => {
  const userData = await db.query('select name from user_data where password = $1',[req.session.pass]);
  if(userData.rows.length>0){
    res.render("environment.ejs",{
      Name: userData.rows[0].name,
    })
  }else{
  res.render("environment.ejs");
  }
});

app.get("/contact", async (req, res) => {
  const userData = await db.query('select name from user_data where password = $1',[req.session.pass]);
  if(userData.rows.length>0){
    res.render("contact.ejs",{
      Name: userData.rows[0].name,
    })
  }else{
  res.render("contact.ejs");
  }
});
app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/thankyou", (req, res) => {
  res.render("thankyou.ejs");
}); 
app.get("/resource", async (req,res)=>{
  const userData = await db.query("select name from user_data where password = $1",[req.session.pass]);
  if(userData.rows.length>0){
    res.render('resourse.ejs',{
      Name: userData.rows[0].name,
    });
  }else{
    res.render('resourse.ejs');
  }
});

app.post('/submit-score', (req, res) => {
  console.log('Score received:', req.body.score);
  // Process score here (e.g., save to database)
});

app.get("/learn", async (req,res)=>{
  const userData = await db.query("select name from user_data where password = $1",[req.session.pass]);
  if(userData.rows.length>0){
    res.render('learn.ejs',{
      Name: userData.rows[0].name,
    });
  }else{
    res.render('resourse.ejs');
  }
});
app.get("/payment",(req,res) => {
  res.render("payment.ejs");
});
app.get('/thankyou',async(req,res)=>{
  
})
app.get("/", async (req, res) => {
  res.render("index.ejs");
});
app.listen(2000, () => {
  console.log("Server started on port 2000");
});
