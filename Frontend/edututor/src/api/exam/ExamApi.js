import axios from 'axios';

export const fetchQuestions = (testPaperId) => axios.get(`/api/questions/${testPaperId}`);

export const submitAnswer = (userTest) => axios.post(`/api/submit`, userTest);
