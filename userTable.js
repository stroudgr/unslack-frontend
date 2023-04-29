
var arr = [
	["David", "1", "57"],
	["Alana", "2", "51"],
	["Kevin", "3", "43"]
];

//function generate_table() {
	  // get the reference for the body
	  var body = document.getElementsByTagName("body")[0];
	 
	  // creates a <table> element and a <tbody> element
	  var tbl = document.createElement("table");
	  var tblBody = document.createElement("tbody");
	 
	  var row = document.createElement("tr");
	  var cell = document.createElement("td");
      var cellText = document.createTextNode("User");
      cell.appendChild(cellText);
      row.appendChild(cell);
      
      var cell = document.createElement("td");
      var cellText = document.createTextNode("Rank");
      cell.appendChild(cellText);
      row.appendChild(cell);
      
      var cell = document.createElement("td");
      var cellText = document.createTextNode("Score");
      cell.appendChild(cellText);
      row.appendChild(cell);
      
      tblBody.appendChild(row);
	  
	  // creating all cells
	  for (var i = 0; i < 3; i++) {
	    // creates a table row
	    var row = document.createElement("tr");
	 
	    for (var j = 0; j < 3; j++) {
	      // Create a <td> element and a text node, make the text
	      // node the contents of the <td>, and put the <td> at
	      // the end of the table row
	      var cell = document.createElement("td");
	      var cellText = document.createTextNode(arr[i][j]);
	      cell.appendChild(cellText);
	      row.appendChild(cell);
	    }
	 
	    // add the row to the end of the table body
	    tblBody.appendChild(row);
	  }
	 
	  // put the <tbody> in the <table>
	  tbl.appendChild(tblBody);
	  // appends <table> into <body>
	  body.appendChild(tbl);
	  // sets the border attribute of tbl to 2;
	  tbl.setAttribute("border", "2");
//	}