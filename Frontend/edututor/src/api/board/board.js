import { publicApi } from '../axios.js';

export const getBoardsByCategory = async (categoryId, includeChildren = false, searchQuery) => {
  const params = {
    includeChildren
  };

  if (searchQuery && searchQuery.trim()) {
    params.searchQuery = searchQuery.trim();
  }

  const response = await publicApi.get(`/cmmn/${categoryId}`, { params });
  return response.data;
};

export const createInquiry = async (title, content) => {
  const response = await publicApi.post('/cmmn/inquiry/create', { title, content });
  return response.data;
};

export const deleteInquiry = async (boardId) => {
  const response = await publicApi.delete(`/cmmn/inquiry/delete/${boardId}`);
  return response.data;
};