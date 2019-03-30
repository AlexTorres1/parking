var verify = {
  passwordMatch: function(dbPassword, inputPassword) {
    console.log("holy shit it workd. id: " + JSON.stringify(dbPassword[0].id));
    if (dbPassword[0].password === inputPassword) {
      return true;
    } else {
      return false;
    }
  }
};
module.exports = verify;
