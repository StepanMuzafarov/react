export type AuthData = {
  email: string;
  password: string;
};

export type UserData = {
  id: string;           
  email: string;
  username: string;     
  avatar: string;       
  isPro: boolean;         
  token: string;           
};

export type UserRegisterData = {
  email: string;
  password: string;
  name: string;
  avatar?: File;
};