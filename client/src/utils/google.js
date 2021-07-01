export const googleBooks = (query) => {
    return fetch (`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};