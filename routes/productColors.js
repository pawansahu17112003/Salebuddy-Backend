const express = require("express");
var upload = require("./multer");
var pool = require("./pool");

const router = express.Router();

router.post("/insert_productColors", upload.none(), function (req, res, next) {
  try {
    pool.query(
      "insert into productColors(serviceid , brandid,  productid, productcolor,productcolorname) values(?,?,?,?,?)",
      [
        req.body.serviceid,
        req.body.brandid,
        req.body.productid,
        req.body.productcolor,
        req.body.productcolorname,
      ],
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
            .json({
              status: true,
              message: "Product Color Sucessfully Inserted",
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
        message: "Critical Error, Pls Contact Server Administrator",
      });
  }
});

router.get("/fetch_productColors", function (req, res, next) {
  try {
    pool.query(
      "select C.*,P.*,B.*,S.* from productcolors C,products P,brands B,services S where C.brandid=B.brandid  and C.serviceid=S.serviceid and C.productid=P.productid",
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

router.post("/fetch_productcolor_by_product", function (req, res, next) {
  try {
    pool.query(
      "select P.*,PC.* from products P,productcolors PC where P.productid=PC.productid and P.productid=?",
      [req.body.productid],
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

router.post("/delete_productColors", function (req, res, next) {
  try {
    console.log(req.body);
    pool.query(
      "delete from productColors where productcolorid=?",
      [req.body.productcolorid],
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
            .json({
              status: true,
              message: "Product Color Sucessfully Deleted",
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
        message: "Critical Error, Pls Contact Server Administrator",
      });
  }
});

router.post("/update_productColors", function (req, res, next) {
  try {
    pool.query(
      "update productColors set  serviceid=?, brandid=?, productid=?, productcolor=?,productcolorname=? where productcolorid=? ",
      [
        req.body.serviceid,
        req.body.brandid,
        req.body.productid,
        req.body.productcolor,
        req.body.productcolorname,
        req.body.productcolorid,
      ],
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
            .json({
              status: true,
              message: "Product Color Updated Sucessfully..",
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
        message: "Critical Error, Pls Contact Server Administrator",
      });
  }
});

module.exports = router;
