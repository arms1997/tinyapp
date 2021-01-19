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
  res.redirect('/urls');
});

app.get('/urls/new', (req, res) => {
  res.render('urls_new');
});

app.get('/urls.json', (req, res) => {
  res.json(urlDatabase);
});

app.get('/urls', (req, res) => {
  const templateVars = { urls: urlDatabase };
  console.log(templateVars);
  res.render('urls_index', templateVars);
});

app.get('/urls/:shortURL', (req, res) => {
  if(!urlDatabase[req.params.shortURL]){
    res.end('shortURL does not exist');
  }

  const templateVars = {
    shortURL: req.params.shortURL, 
    longURL: urlDatabase[req.params.shortURL]
  };

  res.render('urls_show', templateVars);
});

app.get('/u/:shortURL', (req, res) => {
  const longURL = urlDatabase[req.params.shortURL];

  res.redirect(longURL);
})

app.post('/urls', (req, res) => {
  let randomString = generateRandomString();

  urlDatabase[randomString] = req.body.longURL;

  res.redirect(`/urls/${randomString}`);
});

app.post('/urls/:id', (req, res) => {
  urlDatabase[req.params.id] = req.body.longURL

  res.redirect('/')
})

app.post('/urls/:id/delete', (req, res) =>{
  delete urlDatabase[req.params.id]

  res.redirect('/')
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});