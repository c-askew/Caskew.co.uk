//** Javascript **
var model = {
    List: ["Alpha", "Beta", "Gamma"],
    //Creates an array and existing entries within for team names
    addToModel: function (thisItem) {
        //Collects a variable when the function is called
        if (thisItem !== null) {
            //Checks that the collected has a value
            model.List.push(thisItem);
            //Pushes the item to the array
        }
    },
    removeFromModel: function (itemId) {
        //Collects the variable itemID
        model.List.splice(itemId, 1);
        //Goes to the item ID in the array and removes one cell from that point aka. it's entry
    }
};

var control = {
    addToList: function () {
        var data = view.readForm();
        //Calls the readForm method from the view, and assigns it's output to the variable data
        model.addToModel(data);
        //Calls the addToModel method from the model, and sends the data variable through with it
        view.displayitemsinlist(model.List);
        //Calls the displayItemsinList method from the view, and sends the array from the model to it - so that it can display the updated information
    },
    deletefromList: function (e) {
        var itemId = e.target.id;
        //Gets the Element ID from the event and applies it to the variable itemID
        model.removeFromModel(itemId);
        //Calls the removeFromModel method from the model, and sends the event's element ID to it
        view.displayitemsinlist(model.List);
        //Calls the displayItemsInList method from the view, and sends the array from the model to it - so that it can display the updated information
    }
};

var view = {
    readForm: function () {
        var thisitem = document.getElementById("itemname").value;
        //Reads the value from the itemname element in the document, and assigns it to the thisitem variable for use in the following If statement
        if (view.ValidateString(thisitem) === true) {
            //Uses the ValidateString method in the view as a boolean criteria for this If statement
            return thisitem;
            //If the output of ValidateString returns true, return the value gathered from the document
        } else {
            return null;
            //Otherwise return nothing
        }
    },
    ValidateString: function (data) {
        var re = /^[a-zA-Z]+$/;
        // This method returns true if it finds a match, otherwise it returns false
        return re.test(data);
    },
    displayitemsinlist: function (data) {
        var table = document.getElementById("itemlist");
        //Binds the itemList element from the document to the table variable for easier use.
        table.innerHTML = "";
        //Overwrites the itemList elemtnt's inner value to nothing.
        for (var i = 0; i < data.length; i++) {
            //Iterates a for loop for a number of times equal to the length of the data that was collected when this method was called.
            var row = table.insertRow(i);
            //Inserts a row at the bottom of the table
            var cell1 = row.insertCell(0);
            //Inserts a td within the selected row and binds it to a variable
            var cell2 = row.insertCell(1);
            //Inserts a second td within the selected row and binds it to a variable
            cell1.innerHTML = data[i];
            //Changes the contents of the first td to whatever value in the array is
            var id = i;
            //Creates a simple variable to be given as an ID value in the following line of code
            cell2.innerHTML = "<p id='" + id + "' " + " >DELETE</p>";
            //Assigns the ID to paragraph which will be used as a delete button
            document.getElementById(id).onclick = control.deletefromList;
            //Gives the paragraph element created in the second TD the onClick value to call the delete function from the controller.
        }
    }
};



//** JQuery **
$(document).ready(
  function () {
    var LIST = ["Red","Blue","Green"];
    //Creates an empty array
    (fillTable = function() {
      //Creates a function which will be called whenever we want to populate the table in the view.
      //This function is self invoking, so it will run once immediately to populate the table without
      //an initial button press. 
      $("table#jQuerylist").empty();
      //Clears any values that are currently in the table
      $.each(LIST, function(index, value) {
        //Runs a For Each loop which runs the the array and outputs the values into a table in the document
        $("table#jQuerylist").append(
          '<tr><td>' + value + '</td><td><a class="jqDel" alt="delete" href="#">DELETE</a></td></tr>'
          //Also creates the jqDel class so that it can be used to delete the row.
        );
      });
    })();

    $(document).on("click", ".jqDel", function () {
      //Initiates an event delegation for the dynamically generated element which is given the class name of .jqDel
      $(this).parent().parent().remove();
      //Takes the focus of this function and targets the element two levels above (therefore targeting the row)
      //and removing it.
    });
    $('#BtnAddJQuery').on("click", function () {
      //Adds an on click event to the BtnAddJQuery ID in the document
      if (!$('#jQueryitem').val().match(/^[a-zA-Z]+$/) || $('#jQueryitem').val() === "") {
        alert('Non valid Data');
        //If statement checks that the jQueryItem value is invalid, checking if there are any characters that are
        //not in the RegEx or if the value is empty. If this is true, releases an alert to the user.
      }
      else {
        LIST.push($('#jQueryitem').val());
        //If the value is valid, push the value into the LIST array
        fillTable();
      }
    });
  });



//** Knockout.js **
var viewModel = function (items) {
  self = this;
  self.items = ko.observableArray(items);
  //Creates an observable array called items

  self.itemToAdd = ko.observable("");
  //Makes an observable data-bind with the input in the document

  self.deleteItem = function (item) {
    self.items.remove(item);
    return self.items;
    //Removes the specified item and returns the newly adjusted array
  };

  self.addItem = function () {
    if (self.itemToAdd() !== "") {
      self.items.push(self.itemToAdd());
      //If the data bind is not empty, add it to the items array
      self.itemToAdd("");
      // Clears the text box, because it's bound to the "itemToAdd" observable
    }
  }.bind(this);
  // Ensure that "this" is always this view model
};

ko.applyBindings(new viewModel(["Penguins", "Seals", "Polar Bears"]));
//Used to apply initialise the data-binds that are found in the HTML so that they can fulfil their function
//This line of code MUST occur after any data-bound HTML has been parsed.


var vueTable = new Vue({
    el: '#vueTable',
    //el is used to set which element this vue instance will work with
    data: {
        newTeam: '',
        //This is a databinding for the input box
        teams: ['Beards', 'Moustaches', 'Goatees']
        //This is the data array for the team names
    },

    methods: {
        addTeam() {
            this.teams.push(this.newTeam);
            //Pushes the data of newTeam to the teams array
            newTeam: '';
            //Resets newTeam
        },
        deleteTeam(index) {
            this.teams.splice(index, 1);
            //Receives the index from the click event in the document and uses it to
        }
    }
});

window.onload = function () {
    document.getElementById("BtnAddList").onclick = control.addToList;
    view.displayitemsinlist(model.List);
};
