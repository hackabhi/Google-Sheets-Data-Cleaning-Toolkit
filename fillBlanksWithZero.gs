function fillBlanksWithZero() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var range = sheet.getActiveRange();
  var values = range.getValues();

  for (var i = 0; i < values.length; i++) {
    for (var j = 0; j < values[i].length; j++) {
      if (values[i][j] === "" || values[i][j] === null) {
        values[i][j] = 0;
      }
    }
  }

  range.setValues(values);
  SpreadsheetApp.getActiveSpreadsheet().toast("✅ All blank cells in selected range replaced with 0");
}