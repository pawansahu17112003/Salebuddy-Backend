var express = require("express");
var router = express.Router();
var upload = require("./multer");
var pool = require("./pool");

router.get("/userinterface_fetch_services", function (req, res, next) {
  try {
    pool.query("select * from services", function (error, result) {
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
          .json({ status: true, message: "Success...", data: result });
      }
    });
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

router.get("/userinterface_fetch_brands", function (req, res, next) {
  try {
    pool.query(
      "select B.*,S.* from brands B,services S where b.serviceid=S.serviceid",
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
            .json({ status: true, message: "Success...", data: result });
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

router.post("/userinterface_fetch_productdetails", function (req, res, next) {
  try {
    pool.query(
      "SELECT P.*, B.*, S.*, PC.*, PV.*, PD.* FROM products P, brands B, services S, productcolors PC, productvarients PV, productdetails PD where P.productid=PD.productid and B.brandid=PD.brandId and S.serviceid=PD.serviceid and PC.productcolorid=Pd.productcolorid  and PV.productvarientid=pd.productvarientid and pd.status=?",
      [req.body.status],
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

router.post("/userinterface_fetch_ads", function (req, res, next) {
  try {
    pool.query(
      "select A.*, P.* from ads A, products P where A.productid=P.productid and A.imgno=?",
      [req.body.imgno],
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
            .json({ status: true, message: "Success...", data: result });
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

router.post(
  "/userinterface_fetch_productdetails_by_id",
  function (req, res, next) {
    try {
      pool.query(
        "SELECT P.*, B.*, S.*, PC.*, PV.*, PD.* FROM products P, brands B, services S, productcolors PC, productvarients PV, productdetails PD where P.productid=PD.productid and B.brandid=PD.brandId and S.serviceid=PD.serviceid and PC.productcolorid=Pd.productcolorid  and PV.productvarientid=pd.productvarientid and pd.productdetailsid=?",
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
            //console.log(result)
            res
              .status(200)
              .json({ status: true, message: "Success..", data: result[0] });
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

router.post(
  "/userinterface_fetch_productcolor_by_id",
  function (req, res, next) {
    try {
      pool.query(
        "SELECT P.*, S.*, PC.* FROM products P, services S, productcolors PC where P.serviceid=S.serviceid and PC.productid=P.productid and P.productid=?",
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
  }
);

router.post("/userinterface_fetch_productram_by_id", function (req, res, next) {
  try {
    pool.query(
      "SELECT P.*, S.*, PV.* FROM products P, services S, productvarients PV where P.serviceid=S.serviceid and PV.productid=P.productid and P.productid=? group by PV.productram",
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

router.post(
  "/userinterface_fetch_productstorage_by_id",
  function (req, res, next) {
    try {
      pool.query(
        "SELECT P.*, S.*, PV.* FROM products P, services S, productvarients PV where P.serviceid=S.serviceid and PV.productid=P.productid and P.productid=? group by PV.productstorage",
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
  }
);

router.post("/moreimages_by_id", function (req, res, next) {
  try {
    pool.query(
      "SELECT M.* FROM productdetails PD, morepicture M  where PD.productdetailsid=M.productdetailsid  and pd.productdetailsid=?",
      [req.body.productdetailsid],
      function (error, result) {
        if (error) {
          res
            .status(500)
            .json({
              status: false,
              message: "Database Error,Pls Contact Backend Team",
            });
        } else {
          res
            .status(200)
            .json({ status: true, message: "Success..", data: result[0] });
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
  "/userinterface_fetch_productdetails_by_id_color",
  function (req, res, next) {
    try {
      pool.query(
        "SELECT * FROM productdetails WHERE productid = ? AND productcolorid = ?",
        [req.body.productid, req.body.productcolorid],
        function (error, result) {
          if (error) {
            res
              .status(200)
              .json({
                status: false,
                message: "Database Error,Pls Contact Backend Team",
              });
          } else {
            //console.log(result)
            res
              .status(200)
              .json({ status: true, message: "Success..", data: result[0] });
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

router.post(
  "/userinterface_fetch_productdetails_by_id_ram",
  function (req, res, next) {
    try {
      pool.query(
        "SELECT * FROM productdetails WHERE productid = ? AND productvarientid = ?",
        [req.body.productid, req.body.productvarientid],
        function (error, result) {
          if (error) {
            res
              .status(200)
              .json({
                status: false,
                message: "Database Error,Pls Contact Backend Team",
              });
          } else {
            console.log(result);
            res
              .status(200)
              .json({ status: true, message: "Success..", data: result[0] });
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

router.post(
  "/userinterface_fetch_productdetails_by_id_storage",
  function (req, res, next) {
    try {
      pool.query(
        "SELECT * FROM productdetails WHERE productid = ? AND productvarientid = ?",
        [req.body.productid, req.body.productvarientid],
        function (error, result) {
          if (error) {
            res
              .status(200)
              .json({
                status: false,
                message: "Database Error,Pls Contact Backend Team",
              });
          } else {
            console.log(result);
            res
              .status(200)
              .json({ status: true, message: "Success..", data: result[0] });
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
router.post("/userinterface_user_submit", function (req, res, next) {
  try {
    pool.query(
      "insert into users values(?,?,?,?,?,?) ",
      [
        req.body.mobileno,
        req.body.emailid,
        req.body,
        username,
        req.body.dob,
        req.body.gender,
        req.body.doa,
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
          console.log(result);
          res.status(200).json({ status: true, message: "Success.." });
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

router.post("/userinterface_chk_mobile_email", function (req, res, next) {
  try {
    pool.query(
      "select * from users where emailid=? or mobileno=?",
      [req.body.mobileno, req.body.mobileno],
      function (error, result) {
        if (error) {
          res
            .status(200)
            .json({
              status: false,
              message: "Database Error,Pls Contact Backend Team",
            });
        } else {
          console.log(result);
          if (result.length == 1)
            res
              .status(200)
              .json({ status: true, message: "Success..", data: result[0] });
          else
            res.status(200).json({ status: false, message: "Fail", data: [] });
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

router.post("/userinterface_submit_mobile", function (req, res, next) {
  try {
    pool.query(
      "insert into users(mobileno) values(?)",
      [req.body.mobileno],
      function (error, result) {
        if (error) {
          console.log(error);
          res
            .status(201)
            .json({
              status: false,
              message: "Database Error,Pls Contact Backend Team",
            });
        } else {
          res.status(200).json({ status: true, message: "Success.." });
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

router.post("/userinterface_chk_address", function (req, res, next) {
  try {
    pool.query(
      "select * from useraddress where (emailid=? or mobileno=?)",
      [req.body.mobileno, req.body.mobileno],
      function (error, result) {
        if (error) {
          res
            .status(200)
            .json({
              status: false,
              message: "Database Error,Pls Contact Backend Team",
            });
        } else {
          if (result.length >= 1)
            res
              .status(200)
              .json({ status: true, message: "Success..", data: result });
          else
            res.status(200).json({ status: false, message: "Fail", data: [] });
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

router.post("/userinterface_user_address_submit", function (req, res, next) {
  try {
    pool.query(
      "insert into useraddress(emailid, mobileno, address, state, city, pincode, landmark, username, gender,nickname,area)values(?,?,?,?,?,?,?,?,?,?,?) ",
      [
        req.body.emailid,
        req.body.mobileno,
        req.body.address,
        req.body.state,
        req.body.city,
        req.body.pincode,
        req.body.landmark,
        req.body.username,
        req.body.gender,
        req.body.nickname,
        req.body.area,
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
          res.status(200).json({ status: true, message: "Success.." });
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

router.post("/userinterface_user_search", function (req, res, next) {
  try {
    const text = `%${req.body.searchtext}%`;
    pool.query(
      "SELECT P.*, B.*, S.*, PC.*, PV.*, PD.* FROM products P, brands B, services S, productcolors PC, productvarients PV, productdetails PD where P.productid=PD.productid and B.brandid=PD.brandId and S.serviceid=PD.serviceid and PC.productcolorid=Pd.productcolorid  and PV.productvarientid=pd.productvarientid and (P.productname LIKE ? OR B.brandname LIKE ? OR S.servicename LIKE ?)",
      [text, text, text],
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
          // console.log(result)
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

router.post("/userinterface_fetch_user_by_mobile", function (req, res, next) {
  try {
    pool.query(
      "select * from useraddress where mobileno=?",
      [req.body.mobileno],
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
            .json({ status: true, message: "Success...", data: result[0] });
        }
      }
    );
  } catch (e) {
    console.log(e);
    res
      .status(200)
      .json({
        status: false,
        message: "Critical Error, Pls Contact Server Administrator",
      });
  }
});
router.post("/userinterface_fetch_user_by_id", function (req, res, next) {
  try {
    pool.query(
      "select * from useraddress where addressid=?",
      [req.body.addressid],
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
            .json({ status: true, message: "Success...", data: result[0] });
        }
      }
    );
  } catch (e) {
    console.log(e);
    res
      .status(200)
      .json({
        status: false,
        message: "Critical Error, Pls Contact Server Administrator",
      });
  }
});

router.post("/update_address", function (req, res, next) {
  try {
    pool.query(
      "update useraddress set  address=?,state=?, city=?, pincode=?,landmark=?,nickname=?,area=? where addressid=? ",
      [
        req.body.address,
        req.body.state,
        req.body.city,
        req.body.pincode,
        req.body.landmark,
        req.body.nickname,
        req.body.area,
        req.body.addressid,
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
          res.status(200).json({ status: true, message: "Succesfull.." });
        }
      }
    );
  } catch (e) {
    console.log(e);
    res
      .status(200)
      .json({
        status: false,
        message: "Critical Error, Pls Contact Server Administrator",
      });
  }
});

router.post("/update_user", function (req, res, next) {
  try {
    pool.query(
      "update useraddress set  emailid=?,mobileno=?, username=?, gender=? where addressid=? ",
      [
        req.body.emailid,
        req.body.mobileno,
        req.body.username,
        req.body.gender,
        req.body.addressid,
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
          res.status(200).json({ status: true, message: "Succesfull.." });
        }
      }
    );
  } catch (e) {
    console.log(e);
    res
      .status(200)
      .json({
        status: false,
        message: "Critical Error, Pls Contact Server Administrator",
      });
  }
});

router.post("/userinterface_fetch_orders_by_mobile", function (req, res, next) {
  try {
    pool.query(
      "SELECT P.*, B.*, S.*, PC.*, PV.*, PD.*, O.*, D.* FROM products P, brands B, services S, productcolors PC, productvarients PV, productdetails PD,orders O, orderdetails D where P.productid=PD.productid and B.brandid=PD.brandId and S.serviceid=PD.serviceid and PC.productcolorid=Pd.productcolorid  and PV.productvarientid=pd.productvarientid and O.orderid=D.orderid and PD.productdetailsid=D.productdetailsid and O.mobileno=?",
      [req.body.mobileno],
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

router.get("/userinterface_fetch_orders", function (req, res, next) {
  try {
    pool.query(
      "SELECT P.*, B.*, S.*, PC.*, PV.*, PD.*, O.*, D.* FROM products P, brands B, services S, productcolors PC, productvarients PV, productdetails PD,orders O, orderdetails D where P.productid=PD.productid and B.brandid=PD.brandId and S.serviceid=PD.serviceid and PC.productcolorid=Pd.productcolorid  and PV.productvarientid=pd.productvarientid and O.orderid=D.orderid and PD.productdetailsid=D.productdetailsid",
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

router.post("/userinterface_fetch_orders_by_date", function (req, res, next) {
  try {
    // Helper to convert YYYY/M/D -> YYYY-MM-DD
    const formatDate = (dateStr) => {
      if (!dateStr) return null;
      const d = new Date(dateStr);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      return `${yyyy}-${mm}-${dd}`;
    };

    let orderdate = formatDate(req.body.orderdate);
    let startdate = formatDate(req.body.startdate);
    let enddate = formatDate(req.body.enddate);

    const sql = `
            SELECT P.*, B.*, S.*, PC.*, PV.*, PD.*, O.*, D.*
            FROM products P
            JOIN productdetails PD ON P.productid = PD.productid
            JOIN brands B ON B.brandid = PD.brandId
            JOIN services S ON S.serviceid = PD.serviceid
            JOIN productcolors PC ON PC.productcolorid = PD.productcolorid
            JOIN productvarients PV ON PV.productvarientid = PD.productvarientid
            JOIN orderdetails D ON PD.productdetailsid = D.productdetailsid
            JOIN orders O ON O.orderid = D.orderid
            WHERE ${
              orderdate
                ? "DATE(O.orderdate) = ?"
                : "DATE(O.orderdate) BETWEEN ? AND ?"
            }
        `;

    pool.query(
      sql,
      orderdate ? [orderdate] : [startdate, enddate],
      function (error, result) {
        if (error) {
          console.log(error);
          res.status(200).json({ status: false, message: "Database Error" });
        } else {
          res
            .status(202)
            .json({ status: true, message: "Success", data: result });
        }
      }
    );
  } catch (e) {
    console.log(e);
    res.status(203).json({ status: false, message: "Critical Error" });
  }
});

module.exports = router;
