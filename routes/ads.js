var express = require("express");
var router = express.Router();
var upload = require("./multer");
var pool = require("./pool");

router.post("/insert_ads", upload.any(), function (req, res, next) {
  try {
    var images = req.files.map((item) => item.filename);
    images = images + "";
    pool.query(
      "insert into ads (serviceid, brandid, productid, images, description, imgno) values(?,?,?,?,?,?)",
      [
        req.body.serviceid,
        req.body.brandid,
        req.body.productid,
        images,
        req.body.description,
        req.body.imgno,
      ],
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
          res
            .status(200)
            .json({
              status: true,
              message: "Product Pictures Successfully Submitted..",
            });
        }
      }
    );
  } catch (e) {
    console.log(error);
    res
      .status(200)
      .json({
        status: false,
        message: "Critical Error,Pls Contact Server Administrator",
      });
  }
});
router.get("/fetch_ads", function (req, res, next) {
  try {
    pool.query(
      "SELECT P.*, B.*, S.*,AD.*  FROM products P, brands B, services S,ads AD where P.productid=AD.productid AND S.serviceid=AD.serviceid AND B.brandid=AD.brandid",
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
          res
            .status(200)
            .json({ status: true, message: "Success..", data: result });
        }
      }
    );
  } catch (e) {
    res
      .status(200)
      .json({
        status: false,
        message: "Critical Error,Pls Contact Server Administrator",
      });
  }
});
router.post("/delete_ads", function (req, res, next) {
  try {
    pool.query(
      "delete from ads where adid=?",
      [req.body.adid],
      function (error, result) {
        if (error) {
          res
            .status(200)
            .json({
              status: false,
              message: "Database Error,Pls Contact Backend Team",
            });
        } else {
          res
            .status(200)
            .json({ status: true, message: "Ads Deleted Successfully.." });
        }
      }
    );
  } catch (e) {
    res
      .status(200)
      .json({
        status: false,
        message: "Critical Error,Pls Contact Server Administrator",
      });
  }
});

module.exports = router;
