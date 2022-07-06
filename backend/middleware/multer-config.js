const multer = require("multer");

// Mime type for images from a post
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
};

// Disk storage for images from a post
const storagePostImage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images/posts");
  },
  filename: (req, file, callback) => {
    let name = file.originalname.normalize().replace(/.[^/.]+$/, "");
    name = name.split(" ").join("_").toLowerCase();
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + "_" + Date.now() + "." + extension);
  },
});

// Multer for images from a post
exports.postImage = multer({
  storage: storagePostImage,
  limits: {
    fileSize: 104857600,
  },
  fileFilter: (req, file, callback) => {
    if (!MIME_TYPES[file.mimetype]) {
      callback(
        new Error("Le type d'image doit être un jpg, jpeg, png ou gif !")
      );
    } else {
      callback(null, true);
    }
  },
}).single("imageUrl");

// Mime type for avatar
const MIME_TYPES_AVATAR = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

// Disk storage for avatar
const storageAvatar = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images/avatars");
  },
  filename: (req, file, callback) => {
    let name = file.originalname.normalize().replace(/.[^/.]+$/, "");
    name = name.split(" ").join("_").toLowerCase();
    const extension = MIME_TYPES_AVATAR[file.mimetype];
    callback(null, name + "_" + Date.now() + "." + extension);
  },
});

// Multer for avatar
exports.avatar = multer({
  storage: storageAvatar,
  limits: {
    fileSize: 1048576,
  },
  fileFilter: (req, file, callback) => {
    if (!MIME_TYPES_AVATAR[file.mimetype]) {
      callback(new Error("Le format d'image doit être un jpg, jpeg, ou png !"));
    } else {
      callback(null, true);
    }
  },
}).single("avatarUrl");
