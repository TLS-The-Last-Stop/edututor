import axios from 'axios';

export const getSchool = async (name) => {
  const response = await axios.get(`https://open.neis.go.kr/hub/schoolInfo?Type=json&SCHUL_NM=${name}&key=${import.meta.env.VITE_SCHOOL_KEY}`);
  return response.data;
};
