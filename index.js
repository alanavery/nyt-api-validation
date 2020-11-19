// Dependencies
require('dotenv').config();
let express = require('express');
let axios = require('axios');
let ejsLayouts = require('express-ejs-layouts');

// App
let app = express();
let PORT = process.env.PORT || 3000;
let NYT_API_KEY = process.env.NYT_API_KEY;
// console.log(NYT_API_KEY);

// Database
let db = require('./models');

// Set up EJS engine
app.set('view engine', 'ejs');
app.use(ejsLayouts);

// Create a home route
app.get('/', (req, res) => {
  // res.send('Welcome to the backend.');
  axios.get(`https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=godfather&api-key=${NYT_API_KEY}`)
    .then(response => {
      // console.log(response);
      if (response.status === 200) {
        // console.log(response.data.results);
        // Use display_title, byline, headline, publication_date, link.url
        let length = response.data.results.length;
        for (let i = 0; i < length; i++) {
          let results = response.data.results[i];
          let resultsObject = {
            title: results.display_title,
            byline: results.byline,
            headline: results.headline,
            date: results.publication_date,
            url: results.link.url
          };
          // console.log(resultsObject);
          db.movie_review.findOrCreate({
            where: {
              title: resultsObject.title,
              byline: resultsObject.byline
            },
            defaults: {
              headline: resultsObject.headline,
              date: resultsObject.date,
              url: resultsObject.url
            }
          }).then(([movie, created]) => {
            // res.send(movie.get().title);
            console.log(created);
          });
        }
      }
    }).catch(error => {
      console.log(error);
    });
});

app.get('/getrocky', (req, res) => {
  axios.get(`https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=rocky&api-key=${NYT_API_KEY}`)
    .then(response => {
      if (response.status === 200) {
        let length = response.data.results.length;
        for (let i = 0; i < length; i++) {
          let results = response.data.results[i];
          let resultsObject = {
            title: results.display_title,
            byline: results.byline,
            headline: results.headline,
            date: results.publication_date,
            url: results.link.url
          };
          db.movie_review.findOrCreate({
            where: {
              title: resultsObject.title,
              byline: resultsObject.byline
            },
            defaults: {
              headline: resultsObject.headline,
              date: resultsObject.date,
              url: resultsObject.url
            }
          }).then(([movie, created]) => {
            console.log(created);
          });
        }
      }
    }).catch(error => {
      console.log(error);
    });
});

app.get('/rocky', (req, res) => {
  db.movie_review.findOne({
    where: {
      title: 'Rocky II'
    }
  }).then(review => {
    res.send(review);
  });
});

app.get('/godfather', (req, res) => {
  db.movie_review.findAll().then(results => {
    console.log(results);
  });
});

app.listen(PORT, () => {
  console.log(`The server is up and running on PORT ${PORT}`);
});