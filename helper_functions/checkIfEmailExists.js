const checkIfUserExists = (users, email) => {
  for(let key in users){
    if(users[key].email === email){
      return true
    }
  }
  return false;
}

const findUser = (users, email, password) => {
  for(let key in users){
    if(users[key].email === email && users[key].password === password){
      return key
    }
    return;
  }
}

module.exports = {
  checkIfUserExists,
  findUser
}
