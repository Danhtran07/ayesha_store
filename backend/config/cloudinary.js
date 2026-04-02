const cloudinary = require("cloudinary").v2

cloudinary.config({
  cloud_name: "Root",
  api_key: "333845792351844",
  api_secret: "pfqO_68RMlr-M9q1cASJHfjKKVQ"
})

module.exports = cloudinary