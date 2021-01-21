const express = require('express');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');

const { checkIfUserExists, findUser, returnUsersUrls, generateRandomString } = require('./helper_functions/userHelperFunctions');


app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
}))

const urlDatabase = {
  b6UTxQ: { longURL: "https://www.tsn.ca", userID: "aJ48lW" },
  i3BoGr: { longURL: "https://www.google.ca", userID: "aJ48lW" }
};

const users = {}

app.get('/', (req, res) => {
  res.redirect('/urls');
});

app.get('/urls.json', (req, res) => {
  res.json(urlDatabase);
});

app.get('/urls.users.json', (req, res) => {
  res.json(users)
})

//create new url page
app.get('/urls/new', (req, res) => {
  if (!users[req.session['user_id']]) {
    res.redirect('/login?reroute=true');
    return;
  }

  const templateVars = {
    user: users[req.session['user_id']]
  }

  res.render('urls_new', templateVars);
});

//main page
app.get('/urls', (req, res) => {
  if (!users[req.session['user_id']]) {
    res.redirect('/login?reroute=true');
    return
  }

  let denied = req.query.denied ? true : false

  let usersUrls = returnUsersUrls(urlDatabase, req.session['user_id'])

  const templateVars = {
    urls: usersUrls,
    user: users[req.session['user_id']],
    denied
  };

  res.render('urls_index', templateVars);
});


//get a specific shortURL
app.get('/urls/:shortURL', (req, res) => {
  if (!urlDatabase[req.params.shortURL]) {
    res.redirect('/');
    return
  }

  if (urlDatabase[req.params.shortURL].userID !== req.session['user_id']) {
    res.status(403).redirect('/?denied=true');
    return
  }

  const templateVars = {
    shortURL: req.params.shortURL,
    longURL: urlDatabase[req.params.shortURL].longURL,
    user: users[req.session['user_id']]
  };

  res.render('urls_show', templateVars);
});

//GO TO LONGURL
app.get('/u/:shortURL', (req, res) => {
  const longURL = urlDatabase[req.params.shortURL].longURL;

  res.redirect(longURL);
})


//creates a new shortURL
app.post('/urls', (req, res) => {
  let randomString = generateRandomString();

  urlDatabase[randomString] = {
    longURL: req.body.longURL,
    userID: req.session['user_id']
  }

  res.redirect(`/urls/${randomString}`);
});


//UPDATE LONGURL
app.post('/urls/:id', (req, res) => {

  if (urlDatabase[req.params.id].userID !== req.session['user_id']) {
    res.status(403).redirect('/');
    return
  }

  urlDatabase[req.params.id].longURL = req.body.longURL

  res.redirect('/')
})

//DELETE A SHORTURL
app.post('/urls/:id/delete', (req, res) => {
  if (urlDatabase[req.params.id].userID !== req.session['user_id']) {
    res.status(403).redirect('/');
    return
  }

  delete urlDatabase[req.params.id]

  res.redirect('/')
})


//LOGIN && LOGOUT METHODS
app.get('/login', (req, res) => {
  let reroute;
  let failed;

  if (req.query.reroute) {
    reroute = JSON.parse(req.query.reroute)
  }

  if (req.query.failed) {
    failed = JSON.parse(req.query.failed)
  }

  const templateVars = {
    user: users[req.session['user_id']],
    reroute,
    failed
  }

  res.render('urls_login', templateVars);
})

app.post('/login', (req, res) => {
  const { email, password } = req.body

  const userKey = findUser(users, email, password)

  if (userKey) {
    req.session['user_id'] = userKey;
    res.redirect('/')
  } else {
    res.status(403).redirect('/login?failed=true')
  }
})

app.post('/logout', (req, res) => {
  req.session['user_id'] = null;

  res.redirect('/')
})



//REGISTER METHODS
app.get('/register', (req, res) => {
  const templateVars = {
    user: users[req.session['user_id']]
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
    password: bcrypt.hashSync(password, 10)
  }

  users[id] = newUser;

  req.session['user_id'] = id;

  res.redirect('/')
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});