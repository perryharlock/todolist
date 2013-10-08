  var entryCount = 0;
  var highestCount = 0;

  var toDoListApp = {

    vars: {
      entryCount: 0,
      highestCount: 0,
      addButton: "[data-role='add-button']",
      deleteButton: "[data-role='delete-button']",
      editButton: "[data-role='edit-button']",
      saveButton: "[data-role='save-button']",
      cancelButton: "[data-role='cancel-button']",
      buttons: ".button",
      toDoList: $('[data-role="to-do-list"]'),
      inputDescription: "input.description",
      divDescription: "div.description",
      inputDeadline: "input.deadline",
      divDeadline: "div.deadline",
      selectStatus: "select.status",
      divStatus: "div.status"
    },

    // Add a row
    addRow: function (el){
      var curInputDescription = el.find(toDoListApp.vars.inputDescription).val();
      var curInputDeadline = el.find(toDoListApp.vars.inputDeadline).val();
      var curInputStatus = el.find(toDoListApp.vars.selectStatus).val();
      highestCount++;
      var tablerow = toDoListApp.buildRowEntry(highestCount, curInputDescription, curInputDeadline, curInputStatus);
      toDoListApp.vars.toDoList.append(tablerow);
      var $el = $('#row' + highestCount);
      $el.find(toDoListApp.vars.selectStatus).val(curInputStatus);
      toDoListApp.addToStorage(highestCount, curInputDescription, curInputDeadline, curInputStatus);
    },

    // Build row entry
    buildRowEntry: function (entryCount, curInputDescription, curInputDeadline, curInputStatus){
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
    },

    // Empty input row
    emptyCurrentRow: function (el) {
      el.find("input").val("");
      el.find("select").val("");
      el.find(toDoListApp.vars.addButton).addClass("disabled");
    },

    // Delete a row
    deleteRow: function (el) {
      el.removeClass('added-item');
      el.addClass('removed-item');
      window.setTimeout(function(){
        el.remove();
      }, 600);
    },

    // Edit a row
    editRow: function (el) {
      toDoListApp.toggleRowStatus(el);
    },

    // Save a row
    saveRow: function (el, inputDesc, inputDeadline, inputStatus) {
      el.find(toDoListApp.vars.divDescription).html(inputDesc);
      el.find(toDoListApp.vars.divDeadline).html(inputDeadline);
      el.find(toDoListApp.vars.divStatus).html(inputStatus);
      toDoListApp.toggleRowStatus(el);
    },

    // Cancel update
    cancelUpdate: function (el, divDesc, divDeadline, divStatus) {
      el.find(toDoListApp.vars.inputDescription).val(divDesc);
      el.find(toDoListApp.vars.inputDeadline).val(divDeadline);
      el.find(toDoListApp.vars.selectStatus).val(divStatus);
      toDoListApp.toggleRowStatus(el);
    },

    //Toggle row buttons status
    toggleRowStatus: function (el) {
      el.toggleClass('editable');
      el.find("input, div, select").toggleClass('hidden');
      el.find(toDoListApp.vars.buttons).toggleClass('hidden');
    },

    // Toggle the status of the add button on change of inputs
    toggleAddButtonStatus: function (inputDescriptionValue, inputDeadlineValue, selectStatusValue) {
      if (inputDescriptionValue.length > 0 && inputDeadlineValue.length > 0 &&  selectStatusValue.length > 0) {
          $(toDoListApp.vars.addButton).removeClass('disabled');
      }
      else {
        if (!$(toDoListApp.vars.addButton).hasClass('disabled')) {
          $(toDoListApp.vars.addButton).addClass('disabled');
        }
      }
    },

    // Add entry to local storage
    addToStorage: function (rowNum, curInputDescription, curInputDeadline, curInputStatus) {
      var newRow = {};
      newRow.number = rowNum;
      newRow.description = curInputDescription;
      newRow.deadline = curInputDeadline;
      newRow.status = curInputStatus;
      localStorage.setItem('row' + rowNum, JSON.stringify(newRow));
    },

    // Edit local storage item
    editStorageItem: function (rowNum, curInputDescription, curInputDeadline, curInputStatus) {
      localStorage.removeItem(rowNum);
      var justRowNumber = rowNum.substr(3);
      toDoListApp.addToStorage(justRowNumber, curInputDescription, curInputDeadline, curInputStatus);
    },

    // Remove entry from local storage
    removeFromStorage: function (rowNum) {
      localStorage.removeItem(rowNum);
    },

    // Populate list from local storage on page load
    populateList: function () {
      for(var key in localStorage) {
        var storage = JSON.parse(localStorage.getItem(key));
        var curInputDescription = storage.description;
        var curInputDeadline = storage.deadline;
        var curInputStatus = storage.status;
        var entryCount = storage.number;
        var tablerow = toDoListApp.buildRowEntry(entryCount, curInputDescription, curInputDeadline, curInputStatus);
        toDoListApp.vars.toDoList.append(tablerow);
        var $el = $('#row' + entryCount);
        $el.find(toDoListApp.vars.selectStatus).val(curInputStatus);
        if (entryCount > highestCount) {
          highestCount = entryCount;
        }
      }
    }
  };

$().ready(function(){
  // Remove no-javascript class if js is enabled
  $("body.no-javascript").removeClass("no-javascript");

  $('.deadline').datepicker();

  toDoListApp.populateList();
});

// TRIGGERS

  // Add a row click
  toDoListApp.vars.toDoList.on("click", toDoListApp.vars.addButton, function(event){
    var el = $(this).closest("tr");
    event.preventDefault();
    if (!$(el).find(toDoListApp.vars.addButton).hasClass('disabled')) {
      toDoListApp.addRow(el);
      toDoListApp.emptyCurrentRow(el);
    }
  });

  // Delete a row click
  toDoListApp.vars.toDoList.on("click", toDoListApp.vars.deleteButton, function(event){
    var el = $(this).closest("tr");
    event.preventDefault();
    toDoListApp.removeFromStorage(el.attr('id'));
    toDoListApp.deleteRow(el);
  });

  // Edit a row click
  toDoListApp.vars.toDoList.on("click", toDoListApp.vars.editButton, function(event){
    var el = $(this).closest("tr");
    event.preventDefault();
    toDoListApp.editRow(el);
  });

  // Save a row click
  toDoListApp.vars.toDoList.on("click", toDoListApp.vars.saveButton, function(event){
    var el = $(this).closest("tr");
    event.preventDefault();
    curInputDescription = el.find(toDoListApp.vars.inputDescription).val();
    curInputDeadline = el.find(toDoListApp.vars.inputDeadline).val();
    curInputStat = el.find(toDoListApp.vars.selectStatus).val();
    toDoListApp.saveRow(el, curInputDescription, curInputDeadline, curInputStat);
    toDoListApp.editStorageItem(el.attr('id'),curInputDescription, curInputDeadline, curInputStat);
  });

  // Cancel an update to a row click
  toDoListApp.vars.toDoList.on("click", toDoListApp.vars.cancelButton, function(event){
    var el = $(this).closest("tr");
    event.preventDefault();
    curDivDescription = el.find(toDoListApp.vars.divDescription).html();
    curDivDeadline = el.find(toDoListApp.vars.divDeadline).html();
    curDivStatus = el.find(toDoListApp.vars.divStatus).html();
    toDoListApp.cancelUpdate(el, curDivDescription, curDivDeadline, curDivStatus);
  });

  //On input values changing
  toDoListApp.vars.toDoList.on("change", toDoListApp.vars.inputDescription + ',' + toDoListApp.vars.inputDeadline + ',' + toDoListApp.vars.selectStatus, function(event){
    curInputDescription = $(toDoListApp.vars.inputDescription).val();
    curInputDeadline = $(toDoListApp.vars.inputDeadline).val();
    curSelectStatus = $(toDoListApp.vars.selectStatus).val();
    toDoListApp.toggleAddButtonStatus(curInputDescription, curInputDeadline, curSelectStatus);
  });

