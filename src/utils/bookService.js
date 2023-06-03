import { client } from "./api";

export const getBooks = async (title) => {
  const defaultTitle = "Adventure in the forest";
  return client
    .request(`/search.json?title=${title || defaultTitle}`)
    .then((response) => response.docs || response.data.docs || [])
    .then((data) => data);
};

export const getBookById = async (id) => {
  if (!id) {
    return null;
  }

  return client
    .request(`/works/${id}.json`)
    .then((response) => response.data)
    .catch((error) => error.data);
};
