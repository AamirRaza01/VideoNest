import commentModel from "../models/comments.js"
import videoModel from "../models/video.js";
import { errorHandler } from "../errorHandler.js";


export const addComment = async (req, res, next) => {
    const newComment = new commentModel({ ...req.body, userId: req.user.id });
    try {
      const savedComment = await newComment.save();
      res.status(200).send(savedComment);
    } catch (err) {
      next(err);
    }
};

export const deleteComment = async (req, res, next) => {
    try {
    //   const comment = await commentModel.findById(res.params.id);
      const comment = await commentModel.findById(req.params.id);
    //   const video = await videoModel.findById(res.params.id);
      const video = await videoModel.findById(req.params.id);
      if (req.user.id === comment.userId || req.user.id === video.userId) {
        await commentModel.findByIdAndDelete(req.params.id);
        res.status(200).json("The comment has been deleted.");
      } else {
        return next(errorHandler(403, "You can delete ony your comment!"));
      }
    } catch (err) {
      next(err);
    }
  };

  export const getComments = async (req, res, next) => {
    try {
      const comments = await commentModel.find({ videoId: req.params.videoId });
      res.status(200).json(comments);
    } catch (err) {
      next(err);
    }
  };