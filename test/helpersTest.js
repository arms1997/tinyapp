const { checkIfUserExists, findUser, returnUsersUrls } = require('../helper_functions/userHelperFunctions');
const { assert } = require('chai');

const testUsers = {
  "userRandomID": {
    id: "userRandomID",
    email: "user@example.com",
    password: "purple-monkey-dinosaur"
  },
  "user2RandomID": {
    id: "user2RandomID",
    email: "user2@example.com",
    password: "dishwasher-funk"
  }
};

describe('#checkIfUserExists', () => {
  it('should return true if the user exists', () => {
    assert.isTrue(checkIfUserExists(testUsers, 'user@example.com'))
  })

  it('should return false if the user doesnt exist', () => {
    assert.isFalse(checkIfUserExists(testUsers, 'random@example.com'))    
  })

  it('should return false if the user email is undefined', () => {
    assert.isFalse(checkIfUserExists(testUsers, undefined)) 
  })
})