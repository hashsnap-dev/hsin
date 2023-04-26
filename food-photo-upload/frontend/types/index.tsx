export type ListResponse<T> = {
  total: number;
  data: T[];
};

export type Credential = {
  username: string;
  password: string;
};

export type User = {
  _id: string;
  username: string;
  email: string;
  role: string;
  phone: string;
  name: string;
  deletable: boolean;
};

export type UserSearchOptions = {
  page?: number;
  limit?: number;
  query?: string;
};

export type UpdateMyProfileRequest = {
  username?: string;
  password?: string;
  email?: string;
  phone?: string;
  name?: string;
};

export type NewUserRequest = {
  username: string;
  password: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  deletable: boolean;
};

export type UpdateUserParams = {
  username?: string;
  password?: string;
  email?: string;
  role?: string;
  phone?: string;
  name?: string;
  deletable?: boolean;
};

export type UpdateUserRequest = {
  id: string;
} & UpdateUserParams;

export type DeleteResponse = {
  deletedCount: number;
};

export type Food = {
  name: string;
  company: string;
  report_no: string;
  type: string;
  thumbnails: string[];
  url: string;
  updated_at: string;
};

export type AddFoodUrlRequest = {
  report_no: string;
  url: string;
};

export type FoodSearchOptions = {
  category?: string;
  type?: string;
  thumb?: string;
  url?: string;
  page?: number;
  limit?: number;
  query?: string;
  sort?: string;
  order?: string;
};

export type AddFoodThumbnailRequest = {
  report_no: string;
  file: File;
};

export type DeleteFoodThumbnailRequest = {
  report_no: string;
  nid: string;
};

export type UsernameCountResponse = {
  total: number;
};
