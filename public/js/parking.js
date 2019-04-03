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
  getVehicle: function(userId) {
    return $.ajax({
      url: "api/car/" + userId,
      type: "GET"
    });
  },
}

//API for parking
var apiParking = {
  saveParking: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/api/park",
      data: JSON.stringify(example)
    });
  },
  getParking: function(plate) {
    return $.ajax({
      url: "api/park/" + plate,
      type: "GET"
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
      localStorage.setItem('userObj', JSON.stringify(response));
      window.location.href = "reports";
    } else {
      alert("Wrong user name and/or password");
    }
    //  console.log("theee responseee" + response);
  });
});

//convert to string
var convertedUserObj = JSON.parse(localStorage.getItem('userObj'));
console.log(convertedUserObj.id);

//add a new license plate
$("#registerVehicle").click(function(){
  var addingVehicle = {
    plate:  $("#addPlate").val().trim(),
    state:  $("#addState").val().trim(),
    userId: convertedUserObj.id
  }
  console.log(addingVehicle);

  addVehicle.savePlate(addingVehicle).then(function(response){
    console.log(response);
  $("#addVehicleModal").modal("hide");
  alert("Added vehicle");
  });
});

$("#addParking").click(function(){
  var plateDropdown = $("#plateOptions");
  addVehicle.getVehicle(convertedUserObj.id).then(function(response) {
    response.forEach(vehicle => {
      var plateElement = $('<a class="dropdown-item">');
      plateElement.text(vehicle.plate);
      plateDropdown.append(plateElement);
    });
  });
})

$('.dropdown-menu').on( 'click', 'a', function() {
  var text = $(this).html();
  var htmlText = text + ' <span class="caret"></span>';
  $(this).closest('.dropdown').find('.dropdown-toggle').html(htmlText);
});

$("#registerParking").click(function () {
  var parking = {
    plate: $("#dropdownPlate")[0].innerText.trim(),
    state: $("#state").val().trim(),
    location: $("#location").val().trim(),
    amount: $("#amount").val().trim(),
    date: $("#date").val().trim()
  }

  apiParking.saveParking(parking).then(function(response){
    console.log(response);
    $("#addParkingModal").modal("hide");
    alert("Added Parking Information");
  });
});