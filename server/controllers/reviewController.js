import { adaptReviewToClient } from "../adapters/reviewAdapter.js";
import ApiError from "../error/ApiError.js";
import { Review } from '../models/review.js';
import {User} from '../models/user.js';


export const addReview = async (req, res, next) => {
  try {
    const { comment, rating } = req.body;
    const offerId = req.params.offerId;
    const userId = req.user?.id;

    if (!comment || !rating || !offerId) {
      return next(ApiError.badRequest('Не хватает данных для комментария'));
    }

    const review = await Review.create({
      text: comment,
      rating: parseInt(rating, 10),
      authorId: userId,
      offerId: parseInt(offerId, 10)
    });

    res.status(201).json(review);
  } catch (error) {
    console.error('Review creation error:', error);
    next(ApiError.internal(`Ошибка при добавлении комментария: ${error.message}`));
  }
};

export const getReviewsByOfferId = async (req, res, next) =>{
    try {
        const reviews = await Review.findAll({
            where: {offerId: req.params.offerId},
            include: {model: User, as: 'author'},
            order: [['publishDate', 'DESC']]
        });

        const adaptedReviews = reviews.map(adaptReviewToClient);
        res.json(adaptedReviews); 
    } catch (error){
        console.error(error);
        next(ApiError.internal('Ошибка при получении комментариев'));
    }
};