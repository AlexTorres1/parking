var db = require("../models");
var verify = require("../public/js/verification");
module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    var password = req.body.password;
    console.log("pass: " + password);
    // var date = moment(res.date).format("MMM Do YY");
    db.user.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
      console.log(dbExamples);
      // if(verify.passwordMatch(dbExamples, password) === true){
      //   console.log("you're password is correct")
      // };
      // console.log(JSON.stringify(dbExamples[0].date));
    });
  });

  app.get("/reports", function(req, res) {
    // SELECT * FROM parking WHERE plate = existingPlate

    db.parkingNew
      .findOne({
        where: {
          plate: "IH8PRKN"
        }
      })
      .then(function(parks) {
        res.render("reports", {
          msg: "Welcome!",
          parks: parks
        });
      });
  });

  // // Load example page and pass in an example by id
  // app.get("/example/:id", function(req, res) {
  //   db.parkingNew
  //     .findOne({ where: { id: req.params.id } })
  //     .then(function(dbExample) {
  //       res.render("example", {
  //         example: dbExample
  //       });
  //     });
  // });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
