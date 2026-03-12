# Google-Sheets-Data-Cleaning-Toolkit
A collection of Google Apps Script utilities for detecting hidden spreadsheet issues such as line breaks, extra spaces, formulas, and duplicate values.

## Platform

Google Apps Script (for Google Sheets)

## 1. Find Cells Containing Line Breaks in Google Sheets
This Google Apps Script scans the active sheet and identifies cells that contain line breaks (`\n`). It loops through all cells in the sheet and logs the A1 notation of any cell where a line break is detected.

## How It Works

* The script reads the entire data range from the active sheet.
* It checks each cell value.
* If a cell contains a newline character (`\n`), its cell reference (A1 notation) is recorded.
* All matching cell references are printed in the Apps Script Logger.

## Use Case

This script is useful when:

* Cleaning imported data with unexpected line breaks.
* Debugging formulas or text fields that contain multi-line values.
* Identifying formatting issues in large datasets.

## Function

```javascript
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
```

## Output

The script prints all cells containing line breaks in the Apps Script Logger.

Example:

```
A3, B7, D12
```

