import { Offer } from '../models/offer.js';

export const getAllOffers = async (req, res) => {
  try {
    const offers = await Offer.findAll({
      attributes: { exclude: ['authorId'] }, // скрываем служебное поле
      order: [['publishDate', 'DESC']]
    });
    res.status(200).json(offers);
  } catch (error) {
    console.error('Ошибка получения предложений:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
};