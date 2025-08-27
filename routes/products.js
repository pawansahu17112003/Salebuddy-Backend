var express = require("express");
var router = express.Router();
var upload = require("./multer");
var pool = require("./pool");

router.post(
  "/insert_products",
  upload.single("productpicture"),
  function (req, res, next) {
    try {
      pool.query(
        "insert into products (serviceid,brandid,productname,productdescription,productpicture) values(?,?,?,?,?)",
        [
          req.body.serviceid,
          req.body.brandid,
          req.body.productname,
          req.body.productdescription,
          req.file.filename,
        ],
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
              .json({
                status: true,
                message: "Products Successfully Submitted..",
              });
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
  }
);
router.get("/fetch_products", function (req, res, next) {
  try {
    pool.query(
      "select P.*,B.*,S.* from products P,brands B,services S where P.brandid=B.brandid and P.serviceid=S.serviceid",
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

router.post("/fetch_product_by_brand", function (req, res, next) {
  try {
    pool.query(
      "select P.*,B.* from products P,brands B where B.brandid=P.brandid and B.brandid=?",
      [req.body.brandid],
      function (error, result) {
        if (error) {
          console.log(error);
          res
            .status(200)
            .json({
              status: false,
              message: "Database Error, Pls Contact Backend Team",
            });
        } else {
          res
            .status(200)
            .json({ status: true, message: "Sucess...", data: result });
        }
      }
    );
  } catch (e) {
    console.log(error);
    res
      .status(200)
      .json({
        status: false,
        message: "Critical Error, Pls Contact Server Administrator",
      });
  }
});

router.post("/edit_products", function (req, res, next) {
  try {
    pool.query(
      "update products set serviceid=?,brandid=?,productname=?,productdescription=? where productid=?",
      [
        req.body.serviceid,
        req.body.brandid,
        req.body.productname,
        req.body.productdescription,
        req.body.productid,
      ],
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
            .json({ status: true, message: "Products Updated Successfully.." });
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

router.post("/delete_products", function (req, res, next) {
  try {
    pool.query(
      "delete from products where productid=?",
      [req.body.productid],
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
            .json({ status: true, message: "Products Deleted Successfully.." });
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
router.post(
  "/update_icon",
  upload.single("productpicture"),
  function (req, res, next) {
    try {
      pool.query(
        "update products set productpicture=? where productid=?",
        [req.file.filename, req.body.productid],
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
                message: "Product Icon Updated Successfully..",
              });
          }
        }
      );
    } catch (e) {
      console.log("EE", error);
      res
        .status(200)
        .json({
          status: false,
          message: "Critical Error,Pls Contact Server Administrator",
        });
    }
  }
);
module.exports = router;
