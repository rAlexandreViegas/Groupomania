const multer = require("multer");

// Define constants for file sizes in bytes
const ONE_MEGABYTE = 1024 * 1024;
const TWO_MEGABYTES = 2 * ONE_MEGABYTE;
const TEN_MEGABYTES = 10 * ONE_MEGABYTE;

// Mime types for avatars
const MIME_TYPES_AVATAR = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

// Mime types for images
const MIME_TYPES_IMAGE = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
};

// Create a disk storage configuration
function createDiskStorage(destination) {
  return multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, `images/${destination}`);
    },

    filename: (req, file, callback) => {
      let name = file.originalname.normalize().replace(/.[^/.]+$/, "");
      name = name.split(" ").join("_").toLowerCase();

      const extension =
        destination === "avatars"
          ? MIME_TYPES_AVATAR[file.mimetype]
          : MIME_TYPES_IMAGE[file.mimetype];

      callback(null, name + "_" + Date.now() + "." + extension);
    },
  });
}

// Create a multer configuration
function createMulter(storage, maxSize, fileFilter) {
  return multer({
    storage: storage,
    limits: {
      fileSize: maxSize,
    },
    fileFilter: fileFilter,
  });
}

// Multer for avatars
const avatar = createMulter(
  createDiskStorage("avatars"),
  TWO_MEGABYTES,
  (req, file, callback) => {
    !MIME_TYPES_AVATAR[file.mimetype]
      ? callback(new Error("Image format must be jpg, jpeg, or png!"))
      : callback(null, true);
  }
).single("avatarUrl");

// Multer for images from a post
const postImage = createMulter(
  createDiskStorage("posts"),
  TEN_MEGABYTES,
  (req, file, callback) => {
    !MIME_TYPES_IMAGE[file.mimetype]
      ? callback(new Error("Image type must be jpg, jpeg, png, or gif!"))
      : callback(null, true);
  }
).single("imageUrl");

module.exports = {
  avatar,
  postImage,
};
