module.exports.generateRandomString = function(){
  return Math.random().toString(36).slice(2, 6);
}