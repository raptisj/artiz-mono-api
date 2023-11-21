type UserObject = {
  username: string;
  email: string;
  liked_songs?: string[];
  following?: string[];
};

export type UserType = { user: UserObject };
