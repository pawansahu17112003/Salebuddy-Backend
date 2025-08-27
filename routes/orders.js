var express = require("express");
var router = express.Router();
var pool = require("./pool");
router.post("/orders_submit", function (req, res, next) {
  pool.query(
    "insert into orders(orderdate,ordertime,totalamount,mobileno,emailid,status,paymentmode,transactionid) values(?,?,?,?,?,?,?,?)",
    [
      req.body.orderdate,
      req.body.ordertime,
      req.body.totalamount,
      req.body.mobileno,
      req.body.emailid,
      req.body.status,
      req.body.paymentmode,
      req.body.transactionid,
    ],
    function (error, result) {
      try {
        if (error) {
          console.log(error);
          res
            .status(201)
            .json({
              status: false,
              message: "Database Error,Pls Contact Backend Team",
            });
        } else {
          res
            .status(200)
            .json({
              status: true,
              message: "Sucess...",
              orderid: result.insertId,
            });
        }
      } catch (e) {
        console.log(e);
        res
          .status(500)
          .json({
            status: false,
            message: "Critical Error,Pls Contact Server Administrator",
          });
      }
    }
  );
});

router.post("/insert_orderdetails", function (req, res, next) {
  q =
    "insert into orderdetails (orderid, mobileno, productdetailsid, price, offerprice, amount, qty, deliverystatus, address, city, state, paymentstatus, productname)values ?";
  pool.query(
    q,
    [
      req.body.cart.map((item) => [
        req.body.orderid,
        req.body.mobileno,
        item.productdetailsid,
        item.price,
        item.offerprice,
        item.offerprice > 0
          ? item.offerprice * item.qty
          : item.price * item.qty,
        item.qty,
        req.body.deliverystatus,
        req.body.address,
        req.body.city,
        req.body.state,
        req.body.paymentstatus,
        `${item.productname} ${item.productram} ${item.productstorage} ${item.productcolorname}`,
      ]),
    ],
    function (error, result) {
      try {
        if (error) {
          console.log(error);
          res
            .status(201)
            .json({
              status: false,
              message: "Database Error,Pls Contact Backend Team",
            });
        } else {
          res.status(200).json({ status: true, message: "Success..." });
        }
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
});

module.exports = router;
