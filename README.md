## Platform

Google Apps Script (for Google Sheets)

# 1. Find Cells Containing Line Breaks in Google Sheets
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

# 2. Highlight Cells with Leading or Trailing Spaces in Google Sheets
This Google Apps Script scans the active sheet to identify cells that contain "hidden" whitespace—specifically spaces at the very beginning or the very end of the text. Instead of just logging them, it visually highlights these cells by changing their background color to a light yellow.

## How It Works

* Data Retrieval: The script captures both the cell values and the existing background colors of the entire used range.
* Comparison Logic: It uses the .trim() method, which removes whitespace from both ends of a string. If the "trimmed" version of the text is different from the "original" version, it means hidden spaces exist.
* Visual Marking: For every cell where a discrepancy is found, it updates the background color to #fff3cd (light yellow) in the local backgrounds array.
* Batch Update: Once the loop finishes, it applies all the color changes back to the sheet in one single action, making the script efficient for large datasets.

## Use Case
This script is essential when:

* Data Validation: Cleaning data where trailing spaces might cause VLOOKUP or MATCH formulas to fail.
* Data Entry Errors: Identifying records where users accidentally hit the spacebar at the end of a word.
* Database Preparation: Ensuring text strings are "clean" before importing them into other systems or software.

## Function

```javascript
function highlightHiddenSpaces() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var range = sheet.getDataRange();
  var values = range.getValues();
  var backgrounds = range.getBackgrounds();

  for (var r = 0; r < values.length; r++) {
    for (var c = 0; c < values[r].length; c++) {
      // Check if the cell is a string and if trimming it changes the content
      if (typeof values[r][c] === "string" && values[r][c].trim() !== values[r][c]) {
        backgrounds[r][c] = "#fff3cd"; // Apply yellow highlight
      }
    }
  }

  // Update the sheet with the new background colors
  range.setBackgrounds(backgrounds);
}
```

## Output
The script does not print to the Logger; instead, it modifies the spreadsheet directly.

* **Successful match:** Cell background turns Light Yellow.
* **No match:** Cell background remains unchanged.
