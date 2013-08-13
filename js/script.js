$(document).ready(function(){
	// Remove no-javascript class if js is enabled
	$("body.no-javascript").removeClass("no-javascript");

  // Elements
  var addButton = "[data-role='add-button']";
  var deleteButton = "[data-role='delete-button']";
  var editButton = "[data-role='edit-button']";
  var saveButton = "[data-role='save-button']";
  var cancelButton = "[data-role='cancel-button']";
  var buttons = ".button";
  var toDoList = "[data-role='to-do-list']";
  var entryCount = 0;
  var inputDescription = "input.description";
  var divDescription = "div.description";
  var inputDeadline = "input.deadline";
  var divDeadline = "div.deadline";
  var selectStatus = "select.status";
  var divStatus = "div.status";


  // TRIGGERS

  // Add a row click
  $(toDoList).on("click", addButton, function(event){
    var el = $(this).closest("tr");
    event.preventDefault();
    if (!$(el).find(addButton).hasClass('disabled')) {
      addRow(el);
      emptyCurrentRow(el);
    }
  });

  // Delete a row click
  $(toDoList).on("click", deleteButton, function(event){
    var el = $(this).closest("tr");
    event.preventDefault();
    deleteRow(el);
  });

  // Edit a row click
  $(toDoList).on("click", editButton, function(event){
    var el = $(this).closest("tr");
    event.preventDefault();
    editRow(el);
  });

  // Save a row click
  $(toDoList).on("click", saveButton, function(event){
    var el = $(this).closest("tr");
    event.preventDefault();
    inputDesc = el.find(inputDescription).val();
    inputDead = el.find(inputDeadline).val();
    inputStat = el.find(selectStatus).val();
    saveRow(el, inputDesc, inputDead, inputStat);
  });

  // Cancel an update to a row click
  $(toDoList).on("click", cancelButton, function(event){
    var el = $(this).closest("tr");
    event.preventDefault();
    divDesc = el.find(divDescription).html();
    divDead = el.find(divDeadline).html();
    divStat = el.find(divStatus).html();
    cancelUpdate(el, divDesc, divDead, divStat);
  });

  //On input values changing
  $(toDoList).on("change", inputDescription + ',' + inputDeadline + ',' + selectStatus, function(event){
    inputDescriptionValue = $(inputDescription).val();
    inputDeadlineValue = $(inputDeadline).val();
    selectStatusValue = $(selectStatus).val();
    toggleAddButtonStatus(inputDescriptionValue, inputDeadlineValue, selectStatusValue);
  });


  // FUNCTIONS

  // Add a row
	function addRow(el){
    var inputDesc = el.find(inputDescription).val();
    var inputDead = el.find(inputDeadline).val();
    var inputStat = el.find(selectStatus).val();
    entryCount++;
    var tablerow = "<tr class='added-item' id='row" + entryCount + "'>\
    <td>\
      <div class='description'>" + inputDesc + "</div>\
      <input class='description hidden' type='text' value='" + inputDesc + "'/></td>\
    </td>\
    <td>\
      <div class='deadline'>" + inputDead + "</div>\
      <input class='deadline hidden' type='text' value='" + inputDead + "'/></td>\
    </td>\
    <td>\
      <div class='status'>" + inputStat + "</div>\
      <select class='status hidden'>\
        <option value='Not started'>Not started</option>\
        <option value='In progress'>In progress</option>\
        <option value='Complete'>Complete</option>\
      </select>\
    <td>\
      <a class='button btn-small' data-role='edit-button' href='#'><span class='glyphicon glyphicon-pencil'><span>Edit</span></span></a>\
      <a class='button btn-small' data-role='delete-button' href='#'><span class='glyphicon glyphicon-remove'><span>Delete</span></span></a>\
      <a class='button btn-small hidden' data-role='save-button' href='#'><span class='glyphicon glyphicon-ok'><span>Save</span></span></a>\
      <a class='button btn-small hidden' data-role='cancel-button' href='#'><span class='glyphicon glyphicon-refresh'><span>Cancel</span></span></a>\
    </td>\
    </tr>";

    $(toDoList).append(tablerow);
    var $el = $('#row' + entryCount);
    $el.find(selectStatus).val(inputStat);
  }

  function emptyCurrentRow(el) {
    el.find("input").val("");
    el.find("select").val("");
    el.find(addButton).addClass("disabled");
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
    el.find(divDescription).html(inputDesc || '');
    el.find(divDeadline).html(inputDeadline || '');
    el.find(divStatus).html(inputStatus || '');
    toggleRowStatus(el);
  }

  // Cancel update
  function cancelUpdate(el, divDesc, divDeadline, divStatus) {
    el.find(inputDescription).val(divDesc);
    el.find(inputDeadline).val(divDeadline);
    el.find(selectStatus).val(divStatus);
    toggleRowStatus(el);
  }

  //Toggle row buttons status
  function toggleRowStatus(el) {
    el.toggleClass('editable');
    el.find("input, div, select").toggleClass('hidden');
    el.find(buttons).toggleClass('hidden');
  }

  // Toggle the status of the add button on change of inputs
  function toggleAddButtonStatus(inputDescriptionValue, inputDeadlineValue, selectStatusValue) {
    if (inputDescriptionValue.length > 0 && inputDeadlineValue.length > 0 &&  selectStatusValue.length > 0) {
        $(addButton).removeClass('disabled');
    }
    else {
      if (!$(addButton).hasClass('disabled')) {
        $(addButton).addClass('disabled');
      }
    }
  }

});