import { errorHandler } from "../errorHandler.js";
import user from "../models/User.js";
import videoModel from "../models/video.js";

export const update = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await user.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(403, "You are not authorized to update"));
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await user.findByIdAndDelete(req.params.id);
      // req.cookies("access_token", "");
      res.status(200).json("User has been deleted.");
    } catch (err) {
      next(err);
    }
  } else {
    return next(errorHandler(403, "You can delete only your account!"));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const foundUser = await user.findById(req.params.id);
    const { password, ...others } = foundUser._doc;
    res.status(200).json(others);
  } catch (err) {
    next(err);
  }
};

export const subscribe = async (req, res, next) => {
  try {
    await user.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUsers: req.params.id },
    });
    await user.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    });
    res.status(200).json("Subscription successfull.");
  } catch (err) {
    next(err);
  }
};

export const unsubscribe = async (req, res, next) => {
  try {
    await user.findByIdAndUpdate(req.user.id, {
      $pull: { subscribedUsers: req.params.id },
    });
    await user.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: -1 },
    });
    res.status(200).json("Unsubscription successfull.");
  } catch (err) {
    next(err);
  }
};

export const like = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await videoModel.findByIdAndUpdate(videoId, {
      $addToSet: { likes: id },
      $pull: { dislikes: id },
    });
    res.status(200).json("The video has been liked.");
  } catch (err) {
    next(err);
  }
};

export const dislike = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await videoModel.findByIdAndUpdate(videoId, {
      $addToSet: { dislikes: id },
      $pull: { likes: id },
    });
    res.status(200).json("The video has been disliked.");
  } catch (err) {
    next(err);
  }
};
