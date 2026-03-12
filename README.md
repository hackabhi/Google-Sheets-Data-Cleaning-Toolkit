![Google Sheets](https://img.shields.io/badge/Platform-Google%20Sheets-green)
![Apps Script](https://img.shields.io/badge/Built%20With-Google%20Apps%20Script-blue)
![Status](https://img.shields.io/badge/Status-Active-success)

---
# 1. Highlight Duplicate Values in Google Sheets
A Google Apps Script utility that scans a specified column in a Google Sheet and highlights duplicate values automatically.

The script normalizes text by trimming spaces, removing extra internal whitespace, and converting text to lowercase. This ensures duplicates are detected even when values differ in capitalization or spacing.

## Overview

This script helps spreadsheet users quickly detect duplicate values in a column.
It highlights all duplicate cells, including the first occurrence, making it easy to identify repeated entries in large datasets.

The script also handles common formatting issues such as:

* Extra spaces
* Different capitalization
* Inconsistent text formatting

## How It Works

1. The script reads all values from a specified column in the active sheet.
2. Each value is normalized by:

   * Removing leading and trailing spaces
   * Removing extra internal spaces
   * Converting text to lowercase
3. Values are grouped and checked for duplicates.
4. If duplicates are found, all corresponding cells are highlighted.
5. The total number of duplicate cells is logged in the Apps Script Logger.

## Use Cases

This script is useful when:

* Cleaning imported datasets
* Detecting duplicate IDs or reference numbers
* Identifying repeated entries with different capitalization
* Auditing large spreadsheets
* Validating column data before analysis

## Script

```javascript
function highlightDuplicates(columns) {
  var sheet = SpreadsheetApp.getActiveSheet();
  var lastRow = sheet.getLastRow();
  columns.forEach(function(columnLetter){
    var column = columnLetterToNumber(columnLetter);
    var range = sheet.getRange(2, column, lastRow - 1);
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
    Logger.log("Column " + columnLetter + " duplicate cells: " + duplicatesCount);
  });
}

function columnLetterToNumber(letter) {
  var column = 0;

  for (var i = 0; i < letter.length; i++) {
    column = column * 26 + (letter.charCodeAt(i) - 64);
  }
  return column;
}

function runDuplicateCheck() {
  highlightDuplicates(["A","F","H"]); 
}
```

## Output Example

Example column data:

A1  ABC
A2  abc
A3  ABC
A4  xyz
A5  XYZ

Highlighted cells:

A1
A2
A3
A4
A5

Because the script compares normalized values:

abc
abc
abc
xyz
xyz

## Usage

1. Open your Google Sheet.
2. Go to **Extensions → Apps Script**.
3. Paste the script into the editor.
4. Run the function:

```
highlightDuplicatesFast("A","F","H");
```

This will highlight duplicate values in Column A,F and H.

---
# 2. Replace Blank Cells with Zero in Google Sheets

This Google Apps Script replaces all blank cells within a selected range in the active sheet with the value **0**. The script scans the selected range, identifies empty cells, and fills them with zero, helping ensure datasets are complete and ready for calculations or analysis.

This utility is especially useful when preparing data for formulas, reports, or exports where blank cells may cause errors or inaccurate results.

## How It Works

The script reads all values from the currently selected range in the active sheet.

Each cell value is checked to determine whether it is empty or null.

If a blank cell is found, the script replaces the value with **0**.

After processing the entire range, the updated values are written back to the sheet.

A confirmation notification is displayed in the spreadsheet indicating that all blank cells were replaced.

## Use Case

This script is useful when:

* Preparing datasets for numerical calculations
* Preventing errors in formulas caused by blank cells
* Cleaning imported data that contains empty values
* Standardizing datasets before analysis
* Filling missing numeric values with zero

## Script

```javascript
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
```

## Output

The script replaces all blank cells within the selected range with **0**.

Example selected data:

```
10    20
      15
30
```

After running the script:

```
10    20
0     15
30    0
```

A notification message will appear in the sheet:

```
✅ All blank cells in selected range replaced with 0
```

---
# 3. Find Cells Containing Line Breaks in Google Sheets
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

## Script

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

---
# 4. Highlight Cells with Leading or Trailing Spaces in Google Sheets
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

## Script

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

---
⭐ If you find this script useful, consider starring the repository.
---
