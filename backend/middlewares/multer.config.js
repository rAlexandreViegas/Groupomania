const multer = require("multer");

// Mime types for avatars
const MIME_TYPES_AVATAR = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

// Mime types for images
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
};

// Create a disk storage configuration
const createDiskStorage = (destination) => {
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
          : MIME_TYPES[file.mimetype];

      callback(null, name + "_" + Date.now() + "." + extension);
    },
  });
};

// Create a multer configuration
const createMulter = (storage, destination, maxSize, fileFilter) => {
  return multer({
    storage: storage,
    limits: {
      fileSize: maxSize,
    },
    fileFilter: fileFilter,
  }).single(destination);
};

// Configuration for storing avatar uploads
const avatarStorageConfig = createDiskStorage("avatars");

// Configuration for storing post image uploads
const postImageStorageConfig = createDiskStorage("posts");

// Multer for avatars
const avatarConfig = createMulter(
  avatarStorageConfig,
  "avatarUrl",
  10485760,
  (req, file, callback) => {
    !MIME_TYPES_AVATAR[file.mimetype]
      ? callback(new Error("Image format must be jpg, jpeg, or png!"))
      : callback(null, true);
  }
);

// Multer for images from a post
const postImageConfig = createMulter(
  postImageStorageConfig,
  "imageUrl",
  26214400,
  (req, file, callback) => {
    !MIME_TYPES[file.mimetype]
      ? callback(new Error("Image type must be jpg, jpeg, png, or gif!"))
      : callback(null, true);
  }
);

module.exports = {
  avatarConfig,
  postImageConfig,
};
