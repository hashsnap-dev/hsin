import {
  User,
  Credential,
  NewUserRequest,
  UpdateMyProfileRequest,
  ListResponse,
  DeleteResponse,
  Food,
  UpdateUserParams,
  FoodSearchOptions,
  UserSearchOptions,
  UsernameCountResponse,
} from '../types';
import apiClient from './apiClient';

export const login = (credential: Credential) => {
  return apiClient.put<User>(`/users/login`, credential);
};

export const logout = () => {
  return apiClient.put(`/users/logout`);
};

export const checkUsername = (username: string) => {
  return apiClient.get<UsernameCountResponse>(
    `/users/check_username?query=${username}`
  );
};

export const updateMyProfile = (
  updateMyProfileRequest: UpdateMyProfileRequest
) => {
  return apiClient.put<User>(`/users/self`, updateMyProfileRequest);
};

export const fetchSelf = () => {
  return apiClient.get<User>(`/users/self`);
};

export const fetchUsers = (userSearchOption: UserSearchOptions) => {
  return apiClient.get<ListResponse<User>>(
    `/users?page=${userSearchOption.page}&limit=${
      userSearchOption.limit
    }&query=${encodeURIComponent(userSearchOption.query || '')}`
  );
};

export const fetchUserDetail = (id: string) => {
  return apiClient.get<User>(`/users/${id}`);
};

export const createUser = (newUserRequest: NewUserRequest) => {
  return apiClient.post<User>(`/users`, newUserRequest);
};

export const updateUser = (id: string, updateUserParams: UpdateUserParams) => {
  return apiClient.put<User>(`/users/${id}`, updateUserParams);
};

export const deleteUser = (id: string) => {
  return apiClient.delete<DeleteResponse>(`/users/${id}`);
};

export const fetchFoods = (foodSearchOptions: FoodSearchOptions) => {
  return apiClient.get<ListResponse<Food>>(
    `/food-thumbnail?page=${foodSearchOptions.page}&limit=${
      foodSearchOptions.limit
    }&query=${encodeURIComponent(foodSearchOptions.query || '')}&type=${
      foodSearchOptions.type
    }&category=${foodSearchOptions.category}&thumb=${
      foodSearchOptions.thumb
    }&url=${foodSearchOptions.url}&sort=${foodSearchOptions.sort}&order=${
      foodSearchOptions.order
    }`
  );
};

export const addFoodThumbnail = (reportNo: string, file: File) => {
  const fd = new FormData();
  fd.append('thumnails', file, file.name);

  return apiClient.post(`/food-thumbnail/${reportNo}`, fd, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const deleteFoodThumbnail = (reportNo: string, nid: string) => {
  return apiClient.delete(`/food-thumbnail/${reportNo}/${nid}`);
};

export const addFoodUrl = (reportNo: string, url: string) => {
  return apiClient.put(`/food-url/${reportNo}`, { url });
};

export const deleteFoodUrl = (reportNo: string) => {
  return apiClient.delete(`/food-url/${reportNo}`);
};
