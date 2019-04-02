//addUser activates modal
$("#addUser").click(function() {
  $("#addNewCar").modal("show");
});

// The API object contains methods for each kind of request we'll make
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
  getPlate: function(user) {
    return $.ajax({
      url: "api/user/" + user.existingEmail,
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
  // API.getPlate(user).then(function(response) {
  //   res.render("reports", { park: response });
  // });
});
