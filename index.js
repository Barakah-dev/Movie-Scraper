const express = require("express");
const cheerio = require("cheerio");
const app = express();
const port = process.env.PORT || 4000;
const url = "https://www.imdb.com/chart/toptv/?ref_=nv_tvv_250";

async function fetchStreaming() {
  try {
    const response = await fetch(url);
    const data = await response.text();

    const $ = cheerio.load(data);
    const streaming = $("#__next > main > div > div.ipc-page-content-container.ipc-page-content-container--center > section > div > div.sc-4abec5b3-9.ePKXOI > div > div.ipc-title.ipc-title--base.ipc-title--section-title.ipc-title--on-textPrimary.ipc-title--p-none.chart-layout-specific-title > hgroup > h1").text();
  
    console.log(streaming);
  } catch (error) {
    console.error(error);
  }
}
fetchStreaming();

movies_data = [];

async function getMovies() {
  try {
    const response = await fetch(url);
    const data = await response.text();
    const $ = cheerio.load(data);

    const movies = $(".ipc-metadata-list-summary-item");
      
    movies.each(function () {
      title = $(this).find(".ipc-title--base").text();
      rating = $(this).find(".ipc-rating-star").text();

      movies_data.push({title, rating})
    })
    console.log(movies_data);
    console.log(movies_data.length);
  } catch (error) {
    console.log(error);
  }
}
getMovies();

app.get('/movies_data', (req, res) => {
  res.send(movies_data);
});
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
})
