/* eslint-disable no-unused-vars */
// var moment = require("moment");
// var verify = require("./verification");

// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// var $inputPassword = $("#inputPassword");
var $plate = $("#plate");
var $state = $("#state");
var $location = $("#location");
var $amount = $("#amount");
var $date = $("#date");
// $date = moment($date).format("MMMM Do YYYY, h:mm:ss a");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
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

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var tr =
        `<tr data-id="${example.id}" id="row-${example.id}"><th scope="row"><a href="example/${example.id}">${example.plate}</a></th><td>${example.state}</td><td>${example.location}</td><td>${example.amount}</td><td>${example.date}</td><td><a href="javascript:void(0)" class="btn btn-danger float-right delete" onclick="dropRow(${example.id})">ｘ</a></td></tr>`;
        return tr;
      // var $a = $("<a>")
      //   .text(example.text)
      //   .attr("href", "/example/" + example.id);
      // var $li = $("<li>")
      //   .attr({
      //     class: "list-group-item",
      //     "data-id": example.id
      //   })
      //   .append($a);
      // var $button = $("<button>")
      //   .addClass("btn btn-danger float-right delete")
      //   .text("ｘ");
      // $li.append($button);
      // return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var example = {
    // text: $exampleText.val().trim(),
    // description: $exampleDescription.val().trim()
    plate: $plate.val().trim(),
    state: $state.val(),
    location: $location.val().trim(),
    amount: $amount.val().trim(),
    date: $date.val().trim()
  };

  // if (!(example.text && example.description)) {
  //   alert("You must enter an example text and description!");
  //   return;
  // }

  API.saveExample(example).then(function(response) {
    refreshExamples();
    // document.location.reload();
  });

  $exampleText.val("");
  $exampleDescription.val("");
  $plate.val("");
  $state.val("");
  $location.val("");
  $amount.val("");
  $date.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var dropRow = function(idToDelete) {
  console.log("hello");
  /*var idToDelete = $(this)
    .parent()
    .attr("data-id");*/

  API.deleteExample(idToDelete).then(function() {
    //refreshExamples();
    $("#row-" + idToDelete).remove();
    alert("Item will be removed now");
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
//$exampleList.on("click", ".delete", handleDeleteBtnClick);
