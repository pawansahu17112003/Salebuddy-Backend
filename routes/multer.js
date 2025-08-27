var multer = require("multer");
const { v4: uuid } = require("uuid");
var storage = multer.diskStorage({
  destination: function (req, file, path) {
    path(null, "public/images");
  },
  filename: function (req, file, path) {
    var ext = file.originalname.substring(file.originalname.lastIndexOf("."));
    path(null, uuid() + ext);
  },
});
var upload = multer({ storage: storage });
module.exports = upload;
