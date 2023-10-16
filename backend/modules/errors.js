function handleError(res, error) {
    console.error(error);
    return res.status(500).json({ error: error });
}

module.exports = handleError;
