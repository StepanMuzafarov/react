import bcrypt from 'bcrypt';
import ApiError from '../error/ApiError.js';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';

const formatUserResponse = (user, token = null) => {
  const response = {
    id: String(user.id),
    email: user.email,
    username: user.username,
    avatar: user.avatar || '',
    isPro: user.userType === 'pro'
  };
  
  if (token) {
    response.token = token;
  }
  
  return response;
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.badRequest('Пользователь не найден'));
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return next(ApiError.badRequest('Неверный пароль'));
    }

    const token = jwt.sign(
      { 
        id: user.id,
        email: user.email,
        username: user.username,
        userType: user.userType,
        avatar: user.avatar
      }, 
      process.env.JWT_SECRET, 
      { expiresIn: '24h' }
    );

    res.json(formatUserResponse(user, token));
  } catch (error) {
    console.error('Login error:', error);
    next(ApiError.internal('Ошибка авторизации'));
  }
};

export const registration = async (req, res, next) => {
  try {
    const { email, password, userType, username } = req.body;

    if (!email || !password) {
      return next(ApiError.badRequest('Некорректный email или password'));
    }

    if (password.length < 6 || password.length > 12) {
      return next(ApiError.badRequest('Пароль должен быть от 6 до 12 символов'));
    }

    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(ApiError.badRequest('Пользователь с таким email уже существует'));
    }

    const avatarImage = req.file ? `/static/${req.file.filename}` : '';
    const hashPassword = await bcrypt.hash(password, 5);

    const user = await User.create({
      email,
      userType,
      username,
      avatar: avatarImage,
      password: hashPassword
    });

    const token = jwt.sign(
      { 
        id: user.id,
        email: user.email,
        username: user.username,
        userType: user.userType,
        avatar: user.avatar
      }, 
      process.env.JWT_SECRET, 
      { expiresIn: '24h' }
    );

    res.json(formatUserResponse(user, token));
  } catch (error) {
    console.error('Registration error:', error);
    next(ApiError.internal('Ошибка регистрации'));
  }
};

export const checkAuth = async (req, res, next) => {
  try {
    const user = req.user;
    
    if (!user) {
      return next(ApiError.unauthorized('Пользователь не найден'));
    }

    const token = jwt.sign(
      { 
        id: user.id,
        email: user.email,
        username: user.username,
        userType: user.userType,
        avatar: user.avatar
      }, 
      process.env.JWT_SECRET, 
      { expiresIn: '24h' }
    );

    res.json(formatUserResponse(user, token));
  } catch (error) {
    console.error('checkAuth error:', error);
    return res.status(401).json({ error: 'Неавторизован' });
  }
};

export const logout = (req, res) => {
  res.json({ message: 'Logged out' });
};