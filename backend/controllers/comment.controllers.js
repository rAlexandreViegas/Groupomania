const { PrismaClient } = require("@prisma/client");

const handleError = require("../modules/errors");

const prisma = new PrismaClient();

// Create a comment
const createComment = async (req, res, next) => {
    try {
        const newComment = await prisma.comments.create({
            data: {
                message: req.body.message,
                user_id: Number(req.body.user_id),
                post_id: Number(req.body.post_id),
            },
        });

        res.status(201).json({ newComment, message: "Comment created!" });
    } catch (error) {
        handleError(res, error);
    }
};

// Delete a comment
const deleteComment = async (req, res, next) => {
    try {
        await prisma.comments.delete({
            where: { id: Number(req.params.id) },
        });

        res.status(204).json();
    } catch (error) {
        handleError(res, error);
    }
};

module.exports = {
    createComment,
    deleteComment,
};
