$(document).ready(function(){
	// Remove no-javascript class if js is enabled
	$("body.no-javascript").removeClass("no-javascript");

  $('.deadline').datepicker();

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
  var highestCount = 0;

  populateList();

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
    removeFromStorage(el.attr('id'));
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
    curInputDescription = el.find(inputDescription).val();
    curInputDeadline = el.find(inputDeadline).val();
    curInputStat = el.find(selectStatus).val();
    saveRow(el, curInputDescription, curInputDeadline, curInputStat);
    editStorageItem(el.attr('id'),curInputDescription, curInputDeadline, curInputStat);
  });

  // Cancel an update to a row click
  $(toDoList).on("click", cancelButton, function(event){
    var el = $(this).closest("tr");
    event.preventDefault();
    curDivDescription = el.find(divDescription).html();
    curDivDeadline = el.find(divDeadline).html();
    curDivStatus = el.find(divStatus).html();
    cancelUpdate(el, curDivDescription, curDivDeadline, curDivStatus);
  });

  //On input values changing
  $(toDoList).on("change", inputDescription + ',' + inputDeadline + ',' + selectStatus, function(event){
    curInputDescription = $(inputDescription).val();
    curInputDeadline = $(inputDeadline).val();
    curSelectStatus = $(selectStatus).val();
    toggleAddButtonStatus(curInputDescription, curInputDeadline, curSelectStatus);
  });


  // FUNCTIONS

  // Add a row
	function addRow(el){
    var curInputDescription = el.find(inputDescription).val();
    var curInputDeadline = el.find(inputDeadline).val();
    var curInputStatus = el.find(selectStatus).val();
    highestCount++;
    var tablerow = buildRowEntry(highestCount, curInputDescription, curInputDeadline, curInputStatus);
    $(toDoList).append(tablerow);
    var $el = $('#row' + highestCount);
    $el.find(selectStatus).val(curInputStatus);
    addToStorage(highestCount, curInputDescription, curInputDeadline, curInputStatus);
  }

  // Build row entry
  function buildRowEntry(entryCount, curInputDescription, curInputDeadline, curInputStatus) {
   return "<tr class='added-item' id='row" + entryCount + "'>\
    <td>\
      <div class='description'>" + curInputDescription + "</div>\
      <input class='description hidden' type='text' value='" + curInputDescription + "'/></td>\
    </td>\
    <td>\
      <div class='deadline'>" + curInputDeadline + "</div>\
      <input class='deadline hidden' data-date-format='dd-mm-yyyy' type='text' value='" + curInputDeadline + "'/></td>\
    </td>\
    <td>\
      <div class='status'>" + curInputStatus + "</div>\
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
  }

  // Empty input row
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
    el.find(divDescription).html(inputDesc);
    el.find(divDeadline).html(inputDeadline);
    el.find(divStatus).html(inputStatus);
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

  // Add entry to local storage
  function addToStorage(rowNum, curInputDescription, curInputDeadline, curInputStatus) {
    var newRow = {};
    newRow.number = rowNum;
    newRow.description = curInputDescription;
    newRow.deadline = curInputDeadline;
    newRow.status = curInputStatus;
    localStorage.setItem('row' + rowNum, JSON.stringify(newRow));
  }

  // Edit local storage item
  function editStorageItem(rowNum, curInputDescription, curInputDeadline, curInputStatus) {
    localStorage.removeItem(rowNum);
    var justRowNumber = rowNum.substr(3);
    addToStorage(justRowNumber, curInputDescription, curInputDeadline, curInputStatus);
  }

  // Remove entry from local storage
  function removeFromStorage(rowNum) {
    localStorage.removeItem(rowNum);
  }

  // Populate list from local storage on page load
  function populateList() {
    for(var key in localStorage) {
      var storage = JSON.parse(localStorage.getItem(key));
      var curInputDescription = storage.description;
      var curInputDeadline = storage.deadline;
      var curInputStatus = storage.status;
      var entryCount = storage.number;
      var tablerow = buildRowEntry(entryCount, curInputDescription, curInputDeadline, curInputStatus);
      $(toDoList).append(tablerow);
      var $el = $('#row' + entryCount);
      $el.find(selectStatus).val(curInputStatus);
      if (entryCount > highestCount) {
        highestCount = entryCount;
      }
    }
  }

});