module.exports.generateRandomString = function(){
  return Math.random().toString(36).substr(6);
}