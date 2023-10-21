const fs = require("fs");

const deleteImage = (imageUrl) => {
    if (imageUrl) {
        const filename = imageUrl.split("/images/")[1];
        fs.unlinkSync(`images/${filename}`);
    }
};

module.exports = deleteImage;
