const express = require("express");
const cors = require("cors");
const restaurantRouter = require("./routes/restaurant.router");
const { sequelize } = require("./models");

// Create Server
const app = express();

//Sequlize config
const db = require("./models")
const Role = db.role;

db.sequelize.sync({force:true}).then(()=>{
  console.log("Drop and Resync database");
  initial();
})
 const initial = () =>{
  Role.create({
    id:1,
    name:"user"
  });

   Role.create({
    id:2,
    name:"moderator"
  });

   Role.create({
    id:3,
    name:"admin"
  });
 }

//Use Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Router
app.get("/", (req, res) => {
  res.send("<h1>This is Restaurant API</h1>");
});
// Restaurant router
app.use("/apis", restaurantRouter);

//Authen & User Router
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

// Running server
app.listen(5000, () => {
  console.log("Server listening to port 5000");
});
