const express = require('express');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

const { generateRandomString } = require('./helper_functions/randomStringGenerator')
const { checkIfUserExists, findUser } = require('./helper_functions/checkIfEmailExists');


app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

const users = {}

app.get('/', (req, res) => {
  res.redirect('/urls');
});

app.get('/urls/new', (req, res) => {
  const templateVars = {
    user: users[req.cookies['user_id']]
  }

  res.render('urls_new', templateVars);
});

app.get('/urls.json', (req, res) => {
  res.json(urlDatabase);
});

app.get('/urls', (req, res) => {
  const templateVars = {
    urls: urlDatabase,
    user: users[req.cookies['user_id']]
  };

  res.render('urls_index', templateVars);
});

app.get('/urls/:shortURL', (req, res) => {
  if (!urlDatabase[req.params.shortURL]) {
    res.end('shortURL does not exist');
  }

  const templateVars = {
    shortURL: req.params.shortURL,
    longURL: urlDatabase[req.params.shortURL],
    user: users[req.cookies['user_id']]
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

app.post('/urls/:id/delete', (req, res) => {
  delete urlDatabase[req.params.id]

  res.redirect('/')
})

app.get('/login', (req, res) => {
  const templateVars = {
    user: users[req.cookies['user_id']]
  }

  res.render('urls_login', templateVars);
})

app.post('/login', (req, res) => {
  const { email, password } = req.body

  const userKey = findUser(users, email, password)

  if (userKey) {
    res.cookie('user_id', userKey)
    res.redirect('/')
  } else {
    res.status(403).redirect('/login')
  }
})

app.post('/logout', (req, res) => {
  res.clearCookie('user_id');

  res.redirect('/')
})

app.get('/register', (req, res) => {
  const templateVars = {
    user: users[req.cookies['user_id']]
  }

  res.render('urls_register', templateVars);
})

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    console.log('please make sure to provide all required information')
    res.status(400).redirect('/register');
    return;
  }

  if (checkIfUserExists(users, email)) {
    console.log('user with the given email already exists in the db')
    res.status(400).redirect('/register');
    return;
  }

  const id = generateRandomString();

  const newUser = {
    id,
    name,
    email,
    password
  }

  users[id] = newUser;

  res.cookie('user_id', id)

  res.redirect('/')
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});