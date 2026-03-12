function findLineBreakCells() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var cellsWithBreaks = [];
  for (var r = 0; r < data.length; r++) {
    for (var c = 0; c < data[r].length; c++) {
      if (typeof data[r][c] === 'string' && data[r][c].indexOf('\n') !== -1) {
        cellsWithBreaks.push(sheet.getRange(r+1, c+1).getA1Notation());
      }
    }
  }
  Logger.log(cellsWithBreaks.join(', '));
}
