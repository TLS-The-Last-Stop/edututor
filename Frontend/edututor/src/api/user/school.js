import { publicApi } from '../axios.js';

export const getSchool = async (searchKeyword) => {
  const response = await publicApi.get(`https://open.neis.go.kr/hub/schoolInfo?Type=json&SCHUL_NM=${searchKeyword}&key=${import.meta.env.VITE_SCHOOL_KEY}`);
  return response.data;
};
