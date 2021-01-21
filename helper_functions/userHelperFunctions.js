const bcrypt = require('bcrypt');

const checkIfUserExists = (users, email) => {
  for (let id in users) {
    if (users[id].email === email) {
      return true
    }
  }
  return false;
}

const getUserByEmail = (email, userDatabase) => {
  for (let id in users) {
    if (users[id].email === email){
      return users[id]
    } 
    return;
  }
}

const findUser = (users, email, password) => {
  for (let id in users) {
    if (users[id].email === email){
      if(bcrypt.compareSync(password, users[id].password)) {
        return id
      }
    } 
    return;
  }
}


const returnUsersUrls = (urlDatabase, userID) => {
  let newObj = {};
  for (let id in urlDatabase) {
    if (id === userID) {
      newObj[id] = urlDatabase[id]
    }
  }

  return newObj
}

const generateRandomString = function(){
  return Math.random().toString(36).substr(6);
}

module.exports = {
  checkIfUserExists,
  findUser, 
  returnUsersUrls,
  generateRandomString
}
