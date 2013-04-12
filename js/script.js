$(document).ready(function(){
	// Remove no-javascript class if js is enabled
	$("body.no-javascript").removeClass("no-javascript");

  // Elements
  var TABLE_ROW = '[data-role=table-row]';
  var ADD_BUTTON = "[data-role='add-button']";
  var DELETE_BUTTON = "[data-role='delete-button']";
  var EDIT_BUTTON = "[data-role='edit-button']";
  var TO_DO_LIST = "[data-role='to-do-list']";
  var ENTRY_COUNT = 0;


  // TRIGGERS

  // Add a row click
  $(ADD_BUTTON).click(function(event){
    var el = $(this).closest("tr");
    var inputDesc = el.find("input#description").val();
    var inputDeadline = el.find("input#deadline").val();
    var inputStatus = el.find("select#status").val();
    ENTRY_COUNT++;
    event.preventDefault();
    addRow(inputDesc, inputDeadline, inputStatus, ENTRY_COUNT);
    el.find("input").val("");
    el.find("select").val("Not started");
  });

  // Delete a row click
  $(TO_DO_LIST).on("click", DELETE_BUTTON, function(event){
    var el = $(this).closest("tr");
    event.preventDefault();
    deleteRow(el);
  });

  // Edit a row click
  $(TO_DO_LIST).on("click", EDIT_BUTTON, function(event){
    var el = $(this).closest("tr");
    event.preventDefault();
    editRow(el);
  });


  // FUNCTIONS

  // Add a row
	function addRow(inputDesc, inputDeadline, inputStatus, entryCount){
    $(TO_DO_LIST).append(tablerow);
    var tablerow = "<tr id='row" + ENTRY_COUNT + "'><td><input id='description' type='text' value='" + inputDesc + "' disabled/></td><td><input id='description' type='text' value='" + inputDeadline + "' disabled/></td><td>" + inputStatus + "</td><td><a data-role='edit-button' href='#'>Edit</a> | <a data-role='delete-button' href='#'>Delete</a></td></tr>";
  }

  // Delete a row
  function deleteRow(el) {
    el.remove();
  }

  // Edit a row
  function editRow(el) {
    $(this).find("input[disabled]").removeAttr("disabled");
  }

});