const bcrypt = require('bcrypt');

const checkIfUserExists = (users, email) => {
  for (let key in users) {
    if (users[key].email === email) {
      return true
    }
  }
  return false;
}

const findUser = (users, email, password) => {
  for (let key in users) {
    if (users[key].email === email){
      if(bcrypt.compareSync(password, users[key].password)) {
        return key
      }
    } 
    return;
  }
}


const returnUsersUrls = (urlDatabase, userID) => {
  let newObj = {};
  for (let key in urlDatabase) {
    if (urlDatabase[key].userID === userID) {
      newObj[key] = urlDatabase[key]
    }
  }

  return newObj
}

module.exports = {
  checkIfUserExists,
  findUser, 
  returnUsersUrls
}
