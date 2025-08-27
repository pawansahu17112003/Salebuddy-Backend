var express = require("express");
var router = express.Router();
var upload = require("./multer");
var pool = require("./pool");
const { stack } = require("./ads");

router.post(
  "/insert_productdetails",
  upload.fields([
    { name: "picture", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  function (req, res, next) {
    try {
      pool.query(
        "insert into productdetails (serviceid, brandid, productid, productcolorid, productvarientid, imei, productstatus, warrenty, ratings, price, offerprice, membershipprice, productcondition, description, stock, picture, video,status) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [
          req.body.serviceid,
          req.body.brandid,
          req.body.productid,
          req.body.productcolorid,
          req.body.productvarientid,
          req.body.imei,
          req.body.productstatus,
          req.body.warrenty,
          req.body.ratings,
          req.body.price,
          req.body.offerprice,
          req.body.membershipprice,
          req.body.productcondition,
          req.body.description,
          req.body.stock,
          req.files["picture"]?.[0]?.filename,
          req.files["video"]?.[0]?.filename,
          req.body.status,
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

router.get("/fetch_productdetails", function (req, res, next) {
  try {
    pool.query(
      "SELECT P.*, B.*, S.*, PC.*, PV.*, PD.* FROM products P, brands B, services S, productcolors PC, productvarients PV, productdetails PD where P.productid=PD.productid and B.brandid=PD.brandId and S.serviceid=PD.serviceid and PC.productcolorid=Pd.productcolorid  and PV.productvarientid=pd.productvarientid",
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

router.post("/fetch_productdetail_by_product", function (req, res, next) {
  try {
    pool.query(
      "SELECT P.*, B.*, S.*, PC.*, PV.*, PD.* FROM products P, brands B, services S, productcolors PC, productvarients PV, productdetails PD where P.productid=PD.productid and B.brandid=PD.brandId and S.serviceid=PD.serviceid and PC.productcolorid=Pd.productcolorid  and PV.productvarientid=pd.productvarientid and pd.productid=?",
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

router.post("/edit_productdetails", function (req, res, next) {
  try {
    pool.query(
      "update productdetails set serviceid=?, brandid=?, productid=?, productcolorid=?, productvarientid=?, imei=?, productstatus=?, warrenty=?, ratings=?, price=?, offerprice=?, membershipprice=?, productcondition=?, description=?, stock=?,status=? where productdetailsid=?",
      [
        req.body.serviceid,
        req.body.brandid,
        req.body.productid,
        req.body.productcolorid,
        req.body.productvarientid,
        req.body.imei,
        req.body.productstatus,
        req.body.warrenty,
        req.body.ratings,
        req.body.price,
        req.body.offerprice,
        req.body.membershipprice,
        req.body.productcondition,
        req.body.description,
        req.body.stock,
        req.body.status,
        req.body.productdetailsid,
      ],
      function (error, result) {
        console.error("DB Error:", error);
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
              message: "Product Details Updated Successfully..",
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
});

router.post("/delete_productdetails", function (req, res, next) {
  try {
    pool.query(
      "delete from productdetails where productdetailsid=?",
      [req.body.productdetailsid],
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
              message: "Product Details Deleted Successfully..",
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
});
router.post(
  "/update_icon",
  upload.single("picture"),
  function (req, res, next) {
    try {
      pool.query(
        "update productdetails set picture=? where productdetailsid=?",
        [req.file.filename, req.body.productdetailsid],
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

router.post("/update_video", upload.single("video"), function (req, res, next) {
  try {
    pool.query(
      "update productdetails set video=? where productdetailsid=?",
      [req.file.filename, req.body.productdetailsid],
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
              message: "Product Video Updated Successfully..",
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
});
module.exports = router;
