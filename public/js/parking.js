//addUser activates modal
$("#addUser").click(function() {
  $("#addNewCar").modal("show");
});

// API for user
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/user",
      data: JSON.stringify(example)
    });
  },
  getExamples: function(user) {
    return $.ajax({
      url: "api/user/" + user.existingEmail + "/" + user.existingPassword,
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

//API for newCar
var addVehicle = {
  savePlate: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/api/car",
      data: JSON.stringify(example)
    });
  },
}

//register is id for register new user (inside modal)
$("#register").click(function() {
  var newUser = {
    email: $("#newEmail")
      .val()
      .trim(),
    password: $("#newPassword")
      .val()
      .trim()
  };
  console.log(newUser.email);
  console.log(newUser.password);

  API.saveExample(newUser).then(function(response) {
    alert("User added. Please Log in");
  });
  $("#modal").modal("hide");
});

//login stuff
$("#logingIn").click(function(event) {
  event.preventDefault();
  var user = {
    existingEmail: $("#existingEmail")
      .val()
      .trim(),
    existingPassword: $("#existingPassword")
      .val()
      .trim()
  };

  API.getExamples(user).then(function(response) {
    if (response) {
      window.location.href = "reports";
    } else {
      alert("Wrong user name and/or password");
    }
    //  console.log("theee responseee" + response);
  });
});


//add a new license plate
$("#registerVehicle").click(function(){
  var addingVehicle = {
    plate:  $("#newPlate").val().trim(),
    state:  $("#state").val().trim()
  }

  addVehicle.savePlate(addingVehicle).then(function(response){
    console.log(response);
  })
})