$(document).ready(function(){
	// Remove no-javascript class if js is enabled
	$("body.no-javascript").removeClass("no-javascript");

  // Elements
  var $addButton = "[data-role='add-button']";
  var $deleteButton = "[data-role='delete-button']";
  var $editButton = "[data-role='edit-button']";
  var $saveButton = "[data-role='save-button']";
  var $cancelButton = "[data-role='cancel-button']";
  var $buttons = ".button";
  var $toDoList = "[data-role='to-do-list']";
  var $entryCount = 0;
  var $inputDescription = "input.description";
  var $spanDescription = "span.description";
  var $inputDeadline = "input.deadline";
  var $spanDeadline = "span.deadline";
  var $selectStatus = "select.status";
  var $spanStatus = "span.status";


  // TRIGGERS

  // Add a row click
  $($toDoList).on("click", $addButton, function(event){
    var el = $(this).closest("tr");
    event.preventDefault();
    addRow(el);
    emptyCurrentRow(el);
  });

  // Delete a row click
  $($toDoList).on("click", $deleteButton, function(event){
    var el = $(this).closest("tr");
    event.preventDefault();
    deleteRow(el);
  });

  // Edit a row click
  $($toDoList).on("click", $editButton, function(event){
    var el = $(this).closest("tr");
    event.preventDefault();
    editRow(el);
  });

  // Save a row click
  $($toDoList).on("click", $saveButton, function(event){
    var el = $(this).closest("tr");
    event.preventDefault();
    var inputDesc = el.find($inputDescription).val();
    var inputDeadline = el.find($inputDeadline).val();
    var inputStatus = el.find($selectStatus).val();
    saveRow(el, inputDesc, inputDeadline, inputStatus);
  });

  // Cancel an update to a row click
  $($toDoList).on("click", $cancelButton, function(event){
    var el = $(this).closest("tr");
    event.preventDefault();
    var spanDesc = el.find($spanDescription).html();
    var spanDeadline = el.find($spanDeadline).html();
    var spanStatus = el.find($spanStatus).val();
    cancelUpdate(el, spanDesc, spanDeadline, spanStatus);
  });


  // FUNCTIONS

  // Add a row
	function addRow(el){
    var inputDesc = el.find($inputDescription).val();
    var inputDeadline = el.find($inputDeadline).val();
    var inputStatus = el.find($selectStatus).val();
    $entryCount++;
    var tablerow = "<tr id='row" + $entryCount + "'>\
    <td>\
      <span class='description'>" + inputDesc + "</span>\
      <input class='description hidden' type='text' value='" + inputDesc + "'/></td>\
    </td>\
    <td>\
      <span class='deadline'>" + inputDeadline + "</span>\
      <input class='deadline hidden' type='text' value='" + inputDeadline + "'/></td>\
    </td>\
    <td>\
      <span class='status'>" + inputStatus + "</span>\
      <select class='status hidden'>\
        <option value='Not started'>Not started</option>\
        <option value='In progress'>In progress</option>\
        <option value='Complete'>Complete</option>\
      </select>\
    <td>\
      <a class='button btn-small' data-role='edit-button' href='#'>Edit</a>\
      <a class='button btn-small' data-role='delete-button' href='#'>Delete</a>\
      <a class='button btn-small hidden' data-role='save-button' href='#'>Save</a>\
      <a class='button btn-small hidden' data-role='cancel-button' href='#'>Cancel</a>\
    </td>\
    </tr>";

    $($toDoList).append(tablerow);
    var $el = $('#row' + $entryCount);
    $el.find($selectStatus).val(inputStatus);
  }

  function emptyCurrentRow(el) {
    el.find("input").val("");
    el.find("select").val("Not started");
  }

  // Delete a row
  function deleteRow(el) {
    el.remove();
  }

  // Edit a row
  function editRow(el) {
    toggleRowStatus(el);
  }

  // Save a row
  function saveRow(el, inputDesc, inputDeadline, inputStatus) {
    el.find($spanDescription).html(inputDesc);
    el.find($spanDeadline).html(inputDeadline);
    el.find($spanStatus).html(inputStatus);
    toggleRowStatus(el);
  }

  // Cancel update
  function cancelUpdate(el, spanDesc, spanDeadline, spanStatus) {
    el.find($inputDescription).val(spanDesc);
    el.find($inputDeadline).val(spanDeadline);
    el.find($selectStatus).val(spanStatus);
    toggleRowStatus(el);
  }

  function toggleRowStatus(el) {
    el.find("input, span, select").toggleClass('hidden');
    el.find($buttons).toggleClass('hidden');
  }

});