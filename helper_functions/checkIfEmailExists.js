module.exports.checkIfUserExists = (users, email) => {
  for(let key in users){
    if(users[key].email === email){
      return true
    }
  }
  return false;
}