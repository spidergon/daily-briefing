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
    console.error(error);
  }
}

module.exports = async () => {
  const newsPromises = countries.map(getNews)
  return Promise.all(newsPromises).then(newsObjects => {
    return [].concat.apply([], newsObjects)
  })
}