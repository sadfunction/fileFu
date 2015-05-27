$(document).ready(function() {
    populateTable(); // populateTable function
});

//detects file input change and displays file selection
$(document).on('change', '.btn-file :file', function() {
    var input = $(this),
        numFiles = input.get(0).files ? input.get(0).files.length : 1,
        label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
    input.trigger('fileselect', [numFiles, label]);
});

$(document).ready(function() {
    $('.btn-file :file').on('fileselect', function(event, numFiles, label) {

        var input = $(this).parents('.input-group').find(':text'),
            log = numFiles > 1 ? numFiles + ' files selected' : label;

        if (input.length) {
            input.val(log);
        } else {
            if (log) alert(log);
        }

    });
});

// Add a function show files with in the table
function populateTable() {
    // Empty content string
    var tableContent = ''; // it a variable
    // jQuery AJAX call for JSON
    $.getJSON('api/download', function(data) { // get files as data
        for (var item in data) { // one by one get and add fortable
            tableContent += '<tr>';
            tableContent += '<td>' + data[item] + '</td>'; // this file name column
            tableContent += '<td><a href=\"' + '/api/' + data[item] + '\">' + "Download" + '</a></td>'; // this was the link column
        }
        // this all added into the tableContent variable
        $('#download table tbody').html(tableContent); // add into the table
    });
};

$("form").submit(function(e) {
        e.preventDefault();
        var path = $(".fileUpload")[0].files;
        console.log(path);
        if (path.length < 1) {
            displayMessage("Please select a file.", 'danger');
        } else {

            $.ajax({
                    url: '/api/upload',
                    type: 'POST',
                    data: new FormData(this),
                    processData: false,
                    contentType: false
                })
                //returns a placeholder for div-id #success
                //re-draws the table with new file
                .success(function(serverResponse) {
                    displayMessage('Your file has been successfully uploaded.', 'success');
                    populateTable();
                })
                //returns a placeholder for div-id #failure
                .fail(function(error) {
                    displayMessage('An error occurred while uploading your file.', 'danger');
                });
        }
    });

function displayMessage(message, level) {
    $('#message')
        .html('<div class="row remove fade in" role="alert"><div class="col-md-6 alert alert-'+level+'">' + message + '</div></div>')
        .fadeOut(3000);
}