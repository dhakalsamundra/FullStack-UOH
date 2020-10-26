import axios from 'axios';

const baseURL = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await axios.get(baseURL);
  return response.data;
};

const createNew = async (data) => {
  const object = { content: data, votes: 0 };
  const response = await axios.post(baseURL, object);
  return response.data;
};

const addVote = async (data) => {
  const id = data.id;
  const updatedData = {
    ...data,
    votes: data.votes + 1,
  };
  axios.put(baseURL.concat(`/${id}`), updatedData);
  return updatedData;
};

export default { getAll, createNew, addVote };
