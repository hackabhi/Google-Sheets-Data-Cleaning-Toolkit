function highlightDuplicates(columnLetter) {

  var sheet = SpreadsheetApp.getActiveSheet();
  var lastRow = sheet.getLastRow();
  var column = columnLetterToNumber(columnLetter);

  var range = sheet.getRange(2, column, lastRow - 1); // skip header
  var values = range.getValues();
  var backgrounds = range.getBackgrounds();

  var map = {};
  var duplicatesCount = 0;

  for (var i = 0; i < values.length; i++) {

    var val = values[i][0];

    if (val !== "") {

      var normalized = val
        .toString()
        .trim()
        .replace(/\s+/g, " ")
        .toLowerCase();

      if (!map[normalized]) {
        map[normalized] = [];
      }

      map[normalized].push(i);
    }
  }

  for (var key in map) {

    if (map[key].length > 1) {

      duplicatesCount += map[key].length;

      map[key].forEach(function(row) {
        backgrounds[row][0] = "#f8d7da";
      });

    }
  }

  range.setBackgrounds(backgrounds);

  Logger.log("Duplicate cells found: " + duplicatesCount);
}


function columnLetterToNumber(letter) {

  var column = 0;

  for (var i = 0; i < letter.length; i++) {
    column = column * 26 + (letter.charCodeAt(i) - 64);
  }

  return column;
}


function runDuplicateCheck() {
  highlightDuplicates("A"); // change column here
}