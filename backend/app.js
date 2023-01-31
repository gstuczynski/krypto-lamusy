const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const app = express();
const port = 3000;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const getData = async (params) => {
    const {data} = await axios.get('https://www.google.com/search',{params: {q: params}});
    
    const $ = cheerio.load(data);
    const links = $('h3').closest('a');
    const arr = [];

    links.each((idx, link) => {
      const url = $(link).attr('href');
      const content = $(link).find('h3').text();
      obj = {
        href: url,
        title: content,
      }
      arr.push(obj);
    })

    return arr;
};


app.get("/search", async (req, res) => {
  const data = await getData(req.query.search);
  await res.status(200).send(data);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
