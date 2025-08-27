const express = require("express");
var upload = require("./multer");
var pool = require("./pool");

const router = express.Router();

router.post(
  "/insert_productVarients",
  upload.none(),
  function (req, res, next) {
    try {
      pool.query(
        "insert into productVarients(serviceid , brandid,  productid, productram,productstorage) values(?,?,?,?,?)",
        [
          req.body.serviceid,
          req.body.brandid,
          req.body.productid,
          req.body.productram,
          req.body.productstorage,
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
                message: "Product Varient Sucessfully Inserted",
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
  }
);
router.post("/fetch_productvarient_by_product", function (req, res, next) {
  try {
    pool.query(
      "select P.*,PV.* from products P,productvarients PV where P.productid=PV.productid and P.productid=?",
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

router.get("/fetch_productVarients", function (req, res, next) {
  try {
    pool.query(
      `select * from  productvarients V
                    inner join services S
                    on V.serviceid=S.serviceid
                    inner join brands B
                    on V.brandid=B.brandid
                    inner join products P
                    on V.productid=P.productid`,
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

router.post("/delete_productVarients", function (req, res, next) {
  try {
    console.log("DELETE VARIENT ID:", req.body);
    pool.query(
      "delete from productVarients where productvarientid=?",
      [req.body.productvarientid],
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
              message: "Product Varient Sucessfully Deleted",
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

router.post("/update_productVarients", function (req, res, next) {
  try {
    console.log(req.body);

    pool.query(
      "update productvarients set  serviceid=?, brandid=?, productid=?, productram=?,productstorage=? where productvarientid=? ",
      [
        req.body.serviceid,
        req.body.brandid,
        req.body.productid,
        req.body.productram,
        req.body.productstorage,
        req.body.productvarientid,
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
              message: "Product Varient Updated Sucessfully..",
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
