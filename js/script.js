$(document).ready(function(){
	// Remove no-javascript class if js is enabled
	$("body.no-javascript").removeClass("no-javascript");

  // Elements
  var row_template = '[data-role=row-template]';
  var add_button = "[data-role='add-button']";
  var delete_button = "[data-role='delete-button']";
  var edit_button = "[data-role='edit-button']";
  var to_do_list = "[data-role='to-do-list']";
  var entry_count = 0;


  // TRIGGERS

  // Add a row click
  $(add_button).click(function(event){
    var el = $(this).closest("tr");
    event.preventDefault();
    addRow(el);
    el.find("input").val("");
    el.find("select").val("Not started");
  });

  // Delete a row click
  $(to_do_list).on("click", delete_button, function(event){
    var el = $(this).closest("tr");
    event.preventDefault();
    deleteRow(el);
  });

  // Edit a row click
  $(to_do_list).on("click", edit_button, function(event){
    var el = $(this).closest("tr");
    event.preventDefault();
    editRow(el);
  });


  // FUNCTIONS

  // Add a row
	function addRow(el){
    var inputDesc = el.find("input#description").val();
    var inputDeadline = el.find("input#deadline").val();
    var inputStatus = el.find("select#status").val();
    entry_count++;
    //var tablerow = "<tr id='row" + entry_count + "'><td><input id='description' type='text' value='" + inputDesc + "' disabled/></td><td><input id='description' type='text' value='" + inputDeadline + "' disabled/></td><td>" + inputStatus + "</td><td><a data-role='edit-button' href='#'>Edit</a> | <a data-role='delete-button' href='#'>Delete</a></td></tr>";
    var tablerow = $(to_do_list).find(row_template).html().replace(/^\s+|\s+$/, '');
    $(to_do_list).append(tablerow);
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