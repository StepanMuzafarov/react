export type Review = {
  id: string;
  date: string;
  user: {
    name: string;
    avatarUrl: string;
  };
  comment: string;
  rating: number;
};