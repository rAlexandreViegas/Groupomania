const fs = require("fs");

function deleteImage(imageUrl) {
  if (imageUrl) {
    if (imageUrl !== "/images/avatars/default.jpg") {
      const filename = imageUrl.split("/images/")[1];
      fs.unlinkSync(`images/${filename}`);
    }
  }
}

module.exports = deleteImage;
