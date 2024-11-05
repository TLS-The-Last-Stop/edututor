import axios from 'axios';

export const getSchool = async (searchKeyword) => {
  const response = await axios.get(`https://open.neis.go.kr/hub/schoolInfo?Type=json&SCHUL_NM=${searchKeyword}&key=${import.meta.env.VITE_SCHOOL_KEY}`);
  return response.data;
};
