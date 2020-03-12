const axios = require("axios")
require('dotenv').config()

module.exports = async () => {
  try {
    const response = await axios.get(`http://newsapi.org/v2/top-headlines?country=fr&category=business&apiKey=${process.env.NEWS_API_KEY}&pageSize=5`);
    return response.data
  } catch (error) {
    console.error(error);
  }
}