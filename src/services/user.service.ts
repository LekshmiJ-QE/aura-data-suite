import { apiClient } from '@/lib/api-client';
import { User, UserCreate } from '@/types/user';

export const userService = {
  async getAll() {
    return apiClient.get<User[]>('/users/');
  },

  async getById(id: number) {
    return apiClient.get<User>(`/users/${id}`);
  },

  async create(user: UserCreate) {
    return apiClient.post<User>('/users/', user);
  },

  async update(id: number, user: UserCreate) {
    return apiClient.put<User>(`/users/${id}`, user);
  },

  async delete(id: number) {
    return apiClient.delete<User>(`/users/${id}`);
  },
};
