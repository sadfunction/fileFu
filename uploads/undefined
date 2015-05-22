 

#ColumnSieve Tool#

##Goal:##
Create a utility that allows for us to map improperly ordered data files to the correct, expected column layout, then generate a new document for our use. The utility must provide command line functionality, as well as a user interface, as this tool will be used in-line with existing and future automation procedures.

Support for a number of file types will be required, as data comes to us in a variety of formats. When executed by a data operator, the program will detect unknown header values and prompt the operator to store a new value. When run in-line, the program will attempt to map all columns to any existing values stored in the template file. If the program does not successfully map all columns when run in-line, all unknown columns will be relocated to a second sheet within the output file. When run in-line, a second file containing run-time return codes will be generated and placed in the directory specified for the output file. This file will aid the data operator in determining whether or not the data file was mapped successfully. 

##Details:##
 
Language:   Java       
Language Version    1.7    
Supported File Formats  .XLS / .XLSX / .CSV / .TXT [TABBED]    
External Libraries  poi-3.11-20141221.jar      
    poi-ooxml-3.11-20141221.jar    
    poi-ooxml-schemas-3.11-20141221.jar    
    xmlbeans-2.6.0.jar   

Current Status: TESTING 
At present, the column sieve has limited functionality. Supports only .XLS / .XLSX files and a limited number of options:

●   Can compare headers to determine if a column shift is necessary
●   Can shift columns in the wrong position to the correct index, as determined by a template file stored on the server.

Classes:
Main:
Main class. Description will be updated as args list is developed.

Dependencies: *
 
Java    none       
External Libraries  org.apache.poi.UnsupportedFileFormatException;   

*As of April 2, 2015; please note that dependencies may change as the utility is expanded upon.

FileCommands:
Class containing various methods for use with a data file.

Dependencies: *
 
Java    java.io.FileInputStream;       
    java.io.FileNotFoundException;     
    java.io.IOException;       
    java.util.*;       
External Libraries  org.apache.poi.hssf.usermodel.HSSFCell;    
    org.apache.poi.hssf.usermodel.HSSFRow;     
    org.apache.poi.hssf.usermodel.HSSFSheet;       
    org.apache.poi.hssf.usermodel.HSSFWorkbook;  

*As of April 2, 2015; please note that dependencies may change as the utility is expanded upon.

Functions:
String compareHeader(String input,String inputSheet,String template);
●   Public function which compares header values of the input file against a specified template file. Returns a return code dependent upon the status of the validation. This functionality is similar to that of the Global Printing column verification tool.

Methods:
mapColumnData(String input,String inputSheet,String template, String output);
●   Public method used to move columns in the input file to the correct index, as denoted in the template file. Generates an output file containing all data from the input file, in the correct column format.
Method Logic:
>> Create file input streams > store input / template header row as an Excel Row object > loop through the header row > if input value equals the template value, write the row data to the output file > if the input value does not equal the template value, loop through the input values until the values match > loop through input file row values of matching headers <<
Implementation:
The ColumnSieve tool’s implementation will include support for both automated and manual workflows. Information regarding support for these workflows can be found below:

Automated:
In tandem with the PlanetPress workflow software, the ColumnSieve tool can be used to run file comparisons and column shifts. This is accomplished by:
●   For Mapping: >> drop file to folder > compare headers* > if file headers match ; use input file > if file headers do not match ; move input file to secondary hot folder > second hot folder runs the column shift command > file output to predetermined location on the network <<
●   For Comparisons: >> drop file to folder > compare headers > if file headers match ; use file as is > if files do not match ; halt process** > send notification to whomever is involved with the procedure <<

* This serves as an authentication step to confirm that the input file actually needs to be mapped. If it does not, the input file will be used as is. This will conserve system resources, as well as time.
** In some cases, we are validating columns before importing; these jobs could potentially have their columns shifted. There will likely remain some cases where a file will need validated, but not shifted. This function will support these files.

Manual:
In the event an automated process does not yet exist for a new list, a data operator can still use the tool to validate the file via the command line, or a GUI.
●   >> operator is prompted to enter the file type > operator is prompted for the file action > prompt the user for any necessary arguments ; arguments include <inputFilePath>, <templateFilePath>, etcetera > after all information has been collected, the program will return a result string / code, informing the operator of the tool’s status <<
●   A GUI will be developed at a later date to simplify the process. See below for a quick UX markup:
 

Areas of Growth:
Add additional classes for supporting more file types
●   XLSFileCommands
●   XLSXFileCommands
●   CSVFileCommands
●   TXTFileCommands

Add more features than just compare / mapping
●   Header comparison function
○   Helps to determine if a file needs mapped. Can be used before running an actual mapping, as this function would only be comparing the header values. (similar functionality to the current Column Verification tool)
■   DONE!
●   Determine widest / tallest address blocks
○   Examining maximum field lengths / number of field present in address column to locate these records
●   Locate seeds
○   For mailing jobs; >> “input” list would be the list as is, “template” would be the seeds > would remove any record from “input” that exists in “template” > save file to “output” <<
●   When running column validation
○   If the number of fields are not equal (template : input):
■   INPUT file contains more fields than are present in the TEMPLATE file:
●   User could remove additional fields from the input file
○   Situations where a field of data is included, but not altogether necessary
●   User could create a template file specifically for the input file
○   Columns in the input file are unique to a specific job’s requirements, thus facilitating the need for a unique template
●   User can update the general template file to include the new input field(s)
○   Would likely be used infrequently, if at all
■   INPUT file contains fewer fields than are present in the TEMPLATE file:
●   The user should be warned that there is a possibility all necessary fields were not supplied with the list. A user can then…
○   Open and inspect the file
■   In some cases, a file will be provided missing a row of data because it contained no values, or a client does not capture that information (multiple address lines, email address, etcetera). While these files are still “good” and can be used.
○   Define a new template
■   Columns in the input file are unique to a specific job’s requirements, thus facilitating the need for a unique template
○   Populate missing fields [see below]
■   Should ONLY be used if a list has been reviewed.
●   Once a data operator has determined a file is still “good,” the tool can create the “missing” fields by inserting the missing, blank columns. This will result in an input file which “matches” the layout of the template file, but does not require any additional data work.
●   This will generate a new file (regardless of the function) with the new fields in place.
○   Once the number of fields are equal (template = input)
■   In some scenarios, the tool will encounter one or more unknown field definitions
●   If the user wants to add a definition to the existing template file
○   An instance of Excel will be opened containing the template file data
■   The head (row 1) of the file will contain the column index, for referential purposes.
○   Tool will prompt user with some instructions on how to add a value to the template.
○   Tool will display each unknown input value and ask the user to enter the index of the column they would like to add the new value to
○   Once all input values have been added, Excel will close and the tool will attempt validation again
●   If the user does not want to add a definition to the template file, the program will revert to the main, allowing for any additional command to be run.