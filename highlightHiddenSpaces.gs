function highlightHiddenSpaces() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var range = sheet.getDataRange();
  var values = range.getValues();
  var backgrounds = range.getBackgrounds();

  for (var r = 0; r < values.length; r++) {
    for (var c = 0; c < values[r].length; c++) {
      if (typeof values[r][c] === "string" && values[r][c].trim() !== values[r][c]) {
        backgrounds[r][c] = "#fff3cd"; // yellow highlight
      }
    }
  }

  range.setBackgrounds(backgrounds);
}