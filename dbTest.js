let db = require('./models');

db.movie_review.findOrCreate({
  where: {
    title: 'Godfather'
  },
  defaults: {
    byline: 'Vincent Canby',
    headline: 'Godfather, Part II',
    date: Date.now(),
    url: 'http://nyt.com'
  }
}).then(([movie, created]) => {
  console.log(true);
  console.log(movie);
});