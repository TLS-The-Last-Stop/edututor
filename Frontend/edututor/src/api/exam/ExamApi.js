import { publicApi } from '../axios.js';

export const fetchQuestions = (testPaperId) => publicApi.get(`/questions/${testPaperId}`);

export const submitAnswer = (userTest) => publicApi.post(`/submit`, userTest);
