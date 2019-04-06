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
  getParking: function(id) {
    return $.ajax({
      url: "api/park/" + id,
      type: "GET"
    });
  },
  deleteParking: function(id) {
    return $.ajax({
      url: "api/park/" + id,
      type: "DELETE"
    });
  }
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
  // API.getPlate(user).then(function(response) {
  //   res.render("reports", { park: response });
  // });
});

// populateTable();


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
    date: $("#date").val().trim(),
    userId: convertedUserObj.id
  }

  console.log(parking);

  apiParking.saveParking(parking).then(function(response){
    $("#addParkingModal").modal("hide");
    populateTable(); 
    alert("Added Parking Information");
  });
});
function populateTable(){
  // var table = $("#populateTable");
  apiParking.getParking(convertedUserObj.id).then(function(response){
    $("#populateTable").empty();
    response.forEach(vehicle => {
      var tr =
        `<tr data-id="${vehicle.userId}" id="row-${vehicle.userId}"><th scope="row"><a href="example/${vehicle.userId}">${vehicle.plate}</a></th><td>${vehicle.state}</td><td>${vehicle.location}</td><td>${vehicle.amount}</td><td>${vehicle.date.split("T",1)}</td><td><a href="javascript:void(0)" class="btn btn-danger float-right delete" onclick="dropRow(${vehicle.userId})">ｘ</a></td></tr>`;

        $("#populateTable").append(tr);
      
  });
  
  // var chartDates = response.date;
  // var chartData =  response.amount;
  //1) combine the arrays:
  // var list = [];
  // for (var j = 0; j < date.length; j++) 
  //     list.push({'date': chartDates[j], 'amount': chartData[j]});
  //     console.log(list);

  // //2) sort:
  // list.sort(function(a, b) {
  //     return ((a.date < b.date) ? -1 : ((a.date == b.date) ? 0 : 1));
  //     //Sort could be modified to, for example, sort on the age 
  //     // if the name is the same.
  // });
  
  // //3) separate them back out:
  // for (var k = 0; k < list.length; k++) {
  //   chartDates[k] = list[k].date;
  //   chartData[k] = list[k].amount;
  // }
  // console.log(list);

  //organizing chart data
  var chartData =[];
  response.forEach(data => {
    amounts = data.amount
     

      chartData.push(amounts);
    
});
  var chartDates =[];
  response.forEach(data => {
    dates = data.date.split("T",1);
     

      chartDates.push(dates);
    
});
var chartLocs =[];
  response.forEach(data => {
    locations = data.location;
     

      chartLocs.push(locations);
    
});
var uniqueNames = [];
$.each(chartLocs, function(i, el){
    if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
});
 
  // console.log(chartDates);
  // console.log(chartData);
  //Chart madnesssssss
  var ctx2 = document.getElementById("myChart2").getContext("2d");
var chart = new Chart(ctx2, {
  // The type of chart we want to create
  type: "line",

  // The data for our dataset
  data: {
    labels: chartDates,
    datasets: [
      {
        label: "All Parking",
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)"
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)"
        ],
        data: chartData
      }
    ]
  },

  // Configuration options go here
  options: {}
});
var chart = new Chart(ctx, {
  // The type of chart we want to create
  type: "pie",

  // The data for our dataset
  data: {
    labels: uniqueNames,
    datasets: [
      {
        label: "Locations",
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)"
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)"
        ],
        data: chartData
      }
    ]
  },

  // Configuration options go here
  options: {}
});

  });
};

populateTable();
// code below is for logout to remove all the local storage
// localStorage.clear();

var dropRow = function(idToDelete) {
  console.log("hello");
  /*var idToDelete = $(this)
    .parent()
    .attr("data-id");*/

    apiParking.deleteParking(idToDelete).then(function() {
    //refreshExamples();
    $("#row-" + idToDelete).remove();
    alert("Item will be removed now");
  });
};

//logout
$("#signOut").click(function(){
  window.location.href = "/";
  localStorage.clear();
})

