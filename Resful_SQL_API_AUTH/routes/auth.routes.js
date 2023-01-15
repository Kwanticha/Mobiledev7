const {verifySignUp} = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  //sign up
  //http://localhost:5000/apis/auth/signup
  app.post(
    "/apis/auth/signup", //paht
    [verifySignUp.checkDuplicateUserOrEmail,verifySignUp.checkRoleExisted], //middleware
    controller.signup //function
  );

  //sign in
  //http://localhost:5000/apis/auth/signin
  app.post(
    "/apis/auth/signin", // path
    controller.signin //function
  );
};