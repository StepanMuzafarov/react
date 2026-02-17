import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import errorMiddleware from './middleware/ErrorHandlingMiddleware.js';
import sequelize from './config/database.js';

import { User } from './models/user.js';
import { Offer } from './models/offer.js';
import { Review } from './models/review.js';

import router from './routes/index.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/static', express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
  res.json({ message: 'Сервер rental-service работает!' });
});

app.use('/', router);

app.use((req, res) => {
  res.status(404).json({ error: 'Маршрут не найден' });
});

app.use(errorMiddleware)

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Подключение к БД установлено успешно!');
    
    await sequelize.sync();
    console.log('✅ Таблицы синхронизированы с базой данных');
    
    app.listen(PORT, () => {
      console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Ошибка при запуске сервера:', error.message);
    process.exit(1);
  }
};

start();