var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.parkingNew.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.parkingNew.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.parkingNew
      .destroy({ where: { id: req.params.id } })
      .then(function(dbExample) {
        res.json(dbExample);
      });
  });

  // --------- CODE below is for getting, creating and deleting USER

  // Get user by email
  app.get("/api/user/:email/:password", function(req, res) {
    var enteredPassword = req.params.password;
    // console.log(enteredPassword);
    db.user
      .findOne({
        limit: 1,
        where: { email: req.params.email }
      })
      .then(function(userData) {
        // res.redirect("../public/reports");
        if (enteredPassword === userData.password) {
          console.log("email: " + userData.email);
          // localStorage.setItem("email", userData.email);
          console.log("you did it");
          res.json(userData);
        } else {
          console.log("Wrong user name or password!");
          return false;
        }
      });
  });

  // Create a new user
  app.post("/api/user", function(req, res) {
    db.user.create(req.body).then(function(userData) {
      res.json(userData);
    });
  });

  // Delete user by id
  app.delete("/api/user/:id", function(req, res) {
    db.user.destroy({ where: { id: req.params.id } }).then(function(userData) {
      res.json(userData);
    });
  });

  // ------------ CODE below is to Add, Delete, Update or Get CAR

  // Get car by userId
  app.get("/api/car/:userId", function(req, res) {
    db.newCar
      .findAll({
        where: { userId: req.params.userId }
      })
      .then(function(carData) {
        res.json(carData);
      });
  });

  // Create a new car
  app.post("/api/car", function(req, res) {
    db.newCar.create(req.body).then(function(carData) {
      res.json(carData);
    });
  });

  // Delete car by plate number
  app.delete("/api/car/:plate", function(req, res) {
    db.newCar
      .destroy({ where: { plate: req.params.plate } })
      .then(function(carData) {
        res.json(carData);
      });
  });

  // Update car information
  app.put("/api/car/:plate", function(req, res) {
    db.newCar
      .update(req.body, { where: { plate: req.params.plate } })
      .then(function(carData) {
        res.json(carData);
      });
  });

  // --------- CODE below is to Add and Delete parking information

  // Get parking by car plate
  app.get("/api/park/:userId", function(req, res) {
    db.parkingNew
      .findAll({ where: { userId: req.params.userId } })
      .then(function(parkData) {
        res.json(parkData);
      });
  });

  // Create a new parking
  app.post("/api/park", function(req, res) {
    db.parkingNew.create(req.body).then(function(parkData) {
      res.json(parkData);
    });
  });

  // Delete parking by id
  app.delete("/api/park/:id", function(req, res) {
    db.parkingNew
      .destroy({ where: { id: req.params.id } })
      .then(function(parkData) {
        console.log("you are here idiot");
        res.json(parkData);
      });
  });
};
