var express = require("express");
var router = express.Router();
var pool = require("./pool");

/* GET users listing. */
router.post("/chk_admin_login", function (req, res, next) {
  pool.query(
    "select * from admins where (emailid=? or mobileno=?) and password=?",
    [req.body.emailid, req.body.emailid, req.body.password],
    function (error, result) {
      if (error) {
        console.log(error);
        res
          .status(200)
          .json({
            status: false,
            message: "Database Error,Pls Contact Backend Team",
          });
      } else {
        if (result.length == 1)
          res
            .status(200)
            .json({ status: true, message: "Login Successful", data: result });
        else
          res
            .status(200)
            .json({
              status: false,
              message: "Invalid Emailid/Mobileno/Password",
            });
      }
    }
  );
});

module.exports = router;
