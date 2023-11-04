const handleError = (res, error) => {
  console.error(error);
  res.status(500).json({ error: error });
};

module.exports = handleError;
