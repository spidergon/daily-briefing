require('dotenv').config()

const axios = require("axios")
const countries = require('./countries.json')

async function getNews (country) {
  try {
    const response = await axios.get(`http://newsapi.org/v2/top-headlines?country=${country}&category=business&apiKey=${process.env.NEWS_API_KEY}&pageSize=10`);
    return {
      country,
      articles: response.data.articles
    }
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

    return {country, articles: []}
  }
}

module.exports = async () => {
  const newsPromises = countries.map(getNews)
  return Promise.all(newsPromises).then(newsObjects => [].concat.apply([], newsObjects))
}