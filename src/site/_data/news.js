require('dotenv').config();

const axios = require('axios');
const countries = require('./countries.json');

async function getNews(country) {
  try {
    const response = await axios.get(
      `http://newsapi.org/v2/top-headlines?country=${country}&category=business&apiKey=${process.env.NEWS_API_KEY}&pageSize=10`
    );
    const articles = response.data.articles.map((article) => {
      const newArticle = { ...article };
      if (!article.urlToImage)
        newArticle.urlToImage = 'https://res.cloudinary.com/cserviusprod/image/upload/v1539867653/samples/sheep.jpg';
      else newArticle.urlToImage = newArticle.urlToImage.replace(/^http:\/\//i, 'https://');
      return newArticle;
    });
    return { country, articles };
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);

    return { country, articles: [] };
  }
}

module.exports = async function () {
  if (process.env.ELEVENTY_ENV === 'development') {
    const mockData = require('./mock.json');
    return countries.map((country) => mockData[country]);
  }
  const newsPromises = countries.map(getNews);
  return Promise.all(newsPromises).then((newsObjects) => [].concat.apply([], newsObjects));
};
