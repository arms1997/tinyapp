const express = require('express');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');

const { generateRandomString } = require('./randomStringGenerator')

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

app.get('/', (req, res) => {
  res.redirect('/urls')
});

app.get('/urls/new', (req, res) => {
  res.render('urls_new')
})

app.get('/urls.json', (req, res) => {
  res.json(urlDatabase)
})

app.get('/urls', (req, res) => {
  const templateVars = { urls: urlDatabase }
  console.log(templateVars)
  res.render('urls_index', templateVars)
})

app.get('/urls/:shortURL', (req, res) => {
  const templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL] }

  res.render('urls_show', templateVars)
})

app.post('/url', (req, res) => {
  console.log(req.body)
  res.send('ok')
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
