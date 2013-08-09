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
  var $divDescription = "div.description";
  var $inputDeadline = "input.deadline";
  var $divDeadline = "div.deadline";
  var $selectStatus = "select.status";
  var $divStatus = "div.status";


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
    var divDesc = el.find($divDescription).html();
    var divDeadline = el.find($divDeadline).html();
    var divStatus = el.find($divStatus).html();
    cancelUpdate(el, divDesc, divDeadline, divStatus);
  });


  // FUNCTIONS

  // Add a row
	function addRow(el){
    var inputDesc = el.find($inputDescription).val();
    var inputDeadline = el.find($inputDeadline).val();
    var inputStatus = el.find($selectStatus).val();
    $entryCount++;
    var tablerow = "<tr class='added-item' id='row" + $entryCount + "'>\
    <td>\
      <div class='description'>" + inputDesc + "</div>\
      <input class='description hidden' type='text' value='" + inputDesc + "'/></td>\
    </td>\
    <td>\
      <div class='deadline'>" + inputDeadline + "</div>\
      <input class='deadline hidden' type='text' value='" + inputDeadline + "'/></td>\
    </td>\
    <td>\
      <div class='status'>" + inputStatus + "</div>\
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
    el.removeClass('added-item');
    el.addClass('removed-item');
    window.setTimeout(function(){
      el.remove();
    }, 600);
  }

  // Edit a row
  function editRow(el) {
    toggleRowStatus(el);
  }

  // Save a row
  function saveRow(el, inputDesc, inputDeadline, inputStatus) {
    el.find($divDescription).html(inputDesc);
    el.find($divDeadline).html(inputDeadline);
    el.find($divStatus).html(inputStatus);
    toggleRowStatus(el);
  }

  // Cancel update
  function cancelUpdate(el, divDesc, divDeadline, divStatus) {
    el.find($inputDescription).val(divDesc);
    el.find($inputDeadline).val(divDeadline);
    el.find($selectStatus).val(divStatus);
    toggleRowStatus(el);
  }

  function toggleRowStatus(el) {
    el.toggleClass('editable');
    el.find("input, div, select").toggleClass('hidden');
    el.find($buttons).toggleClass('hidden');
  }

});