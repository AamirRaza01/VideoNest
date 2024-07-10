import { errorHandler } from "../errorHandler.js";
import user from "../models/User.js";
import videoModel from "../models/video.js"

export const createVideo = async (req, res, next) => {
  const newVideo = new videoModel({ userId: req.user.id, ...req.body });
  try {
    const savedVideo = await newVideo.save();
    res.status(200).json(savedVideo);
  } catch (err) {
    next(err);
  }
};

export const updateVideo = async (req, res, next) => {            // here views, likes and dislikes are also updating
    try {
      const video = await videoModel.findById(req.params.id);
      if (!video) return next(errorHandler(404, "Video not found!"));
      if (req.user.id === video.userId) {
        const updatedVideo = await videoModel.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedVideo);
      } else {
        return next(errorHandler(403, "You can update only your video!"));
      }
    } catch (err) {
      next(err);
    }
  };

  export const deleteVideo = async (req, res, next) => {
    try {
      const video = await videoModel.findById(req.params.id);
      if (!video) return next(errorHandler(404, "Video not found!"));
      if (req.user.id === video.userId) {
        await videoModel.findByIdAndDelete(req.params.id);
        res.status(200).json("The video has been deleted.");
      } else {
        return next(errorHandler(403, "You can delete only your video!"));
      }
    } catch (err) {
      next(err);
    }
  };


export const getVideo = async (req, res, next) => {
  try {
    const video = await videoModel.findById(req.params.id);
    res.status(200).json(video);
  } catch (err) {
    next(err);
  }
};

export const addView = async (req, res, next) => {
    try {
      await videoModel.findByIdAndUpdate(req.params.id, {
        $inc: { views: 1 },
      });
      res.status(200).json("The view has been increased.");
    } catch (err) {
      next(err);
    }
  };

  export const randomVideos = async (req, res, next) => {
    try {
      const videos = await videoModel.aggregate([{ $sample: { size: 40 } }]);   // what is aggregate
      res.status(200).json(videos);
    } catch (err) {
      next(err);
    }
  };

  export const trendingVideos = async (req, res, next) => {
    try {
      const videos = await videoModel.find().sort({ views: -1 }).limit(40);  // How sort method is working with views -1. It gives videos with most views first
      res.status(200).json(videos);
    } catch (err) {
      next(err);
    }
  };

  export const subVideos = async (req, res, next) => {
    try {
      const foundUser = await user.findById(req.user.id);
      const subscribedChannels = foundUser.subscribedUsers;
  
      const list = await Promise.all(
        subscribedChannels.map(async (channelId) => {
          return await videoModel.find({ userId: channelId });
        })
      );

      res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
    } catch (err) {
      next(err);
    }
  };

  export const getByTag = async (req, res, next) => {
    const tags = req.query.tags.split(",");     // split creating problem
    try {
      const videos = await videoModel.find({ tags: { $in: tags } }).limit(20);
      res.status(200).json(videos);
    } catch (err) {
      next(err);
    }
  };

  export const search = async (req, res, next) => {
    const query = req.query.search;
    try {
      const videos = await videoModel.find({
        title: { $regex: query, $options: "i" },
      }).limit(40);
      res.status(200).json(videos);
    } catch (err) {
      next(err);
    }
  };

