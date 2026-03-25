import { Offer } from '../models/offer.js';
import { User } from '../models/user.js';
import ApiError from '../error/ApiError.js';
import { adaptOfferToClient, adaptFullOfferToClient } from '../adapters/offerAdapter.js';

export const getAllOffers = async (req, res, next) => { 
  try {
    const offers = await Offer.findAll({
      attributes: { exclude: ['authorId'] },
      order: [['publishDate', 'DESC']]
    });
    
    const adaptedOffers = offers.map(offer => adaptOfferToClient(offer));
    
    res.status(200).json(adaptedOffers); 
  } catch (error) {
    console.error('Ошибка получения предложений:', error);
    next(ApiError.internal('Не удалось получить предложения'));
  }
};

export async function createOffer(req, res, next) {
 try {
   const {
     title, description, publishDate, city,
     isPremium, isFavorite, rating, type, rooms, guests, price,
     features, commentsCount, latitude, longitude, userId
   } = req.body;


   if (!req.files?.previewImage || req.files.previewImage.length === 0) {
     return next(ApiError.badRequest('Превью изображение обязательно для загрузки'));
   }

   if (!req.files?.photos || req.files.photos.length !== 6) {
      return next(ApiError.badRequest('Необходимо загрузить ровно 6 фотографий жилья'));
    }

   const previewImagePath = `/static/${req.files.previewImage[0].filename}`;

   let processedPhotos = [];
   if (req.files?.photos) {
     processedPhotos = req.files.photos.map(file => `/static/${file.filename}`);
   }


   let parsedFeatures = [];
   if (features) {
     try {
       parsedFeatures = typeof features === 'string' ? JSON.parse(features) : features;
     } catch {
       parsedFeatures = features.split(',');
     }
   }


   const offer = await Offer.create({
     title,
     description,
     publishDate,
     city,
     previewImage: previewImagePath,
     photos: processedPhotos,
     isPremium,
     isFavorite,
     rating,
     type,
     rooms,
     guests,
     price,
     features: parsedFeatures,
     commentsCount,
     latitude,
     longitude,
     authorId: userId
   });


   return res.status(201).json(offer);
 } catch (error) {
   next(ApiError.internal('Не удалось добавить предложение: ' + error.message));
 }
}

export const getFullOffer = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const offer = await Offer.findByPk(id, {
      include: {
        model: User,
        as: 'author',
        attributes: ['id', 'email', 'username', 'avatar', 'userType']
      }
    });
    
    if (!offer) {
      return next(ApiError.notFound('Offer not found'));
    }
    
    
    const adaptedOffer = adaptFullOfferToClient(offer, offer.author);
    
    return res.status(200).json(adaptedOffer);
  } catch (error) {
    console.error('Ошибка получения полного предложения:', error);
    next(ApiError.internal('Не удалось получить предложение'));
  }
};

export const getFavoriteOffers = async (req, res, next) => {
    try {
        const offers = await Offer.findAll({
            where: { isFavorite: true },
            attributes: { exclude: ['authorId'] },
            order: [['publishDate', 'DESC']]
        });
        const adaptedOffers = offers.map(offer => adaptOfferToClient(offer));
        res.status(200).json(adaptedOffers);
    } catch (error) {
        console.error('Ошибка получения избранных предложений:', error);
        next(ApiError.internal('Не удалось получить избранные предложения'));
    }
};

export const toggleFavorite = async (req, res, next) => {
  try {
    const {offerId, status} = req.params;

    const offer = await Offer.findByPk(offerId);
    if (!offer){
      return next(ApiError.notFound('Предложение не найдено'));
    }

    offer.isFavorite = status === '1';
    await offer.save();

    res.json(offer);
  } catch (error) {
    next(ApiError.internal('Ошибка при обновлении статуса избранного'));
  }
}