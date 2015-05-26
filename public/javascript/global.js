// document ready call itself
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
  $(document).ready( function() {
    $('.btn-file :file').on('fileselect', function(event, numFiles, label) {

    var input = $(this).parents('.input-group').find(':text'),
        log = numFiles > 1 ? numFiles + ' files selected' : label;

    if( input.length ) {
        input.val(log);
    } else {
        if( log ) alert(log);
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
            tableContent += '<td><a href=' + "/api/" + data[item] + '>' + "Download" + '</a></td>'; // this was the link column
        }
        // this all added into the tableContent variable
        $('#download table tbody').html(tableContent); // add into the table
    });
};

$("form")
    .submit(function(e) {
        $.ajax( {
            url: '/api/upload',
            type: 'POST',
            data: new FormData( this ),
            processData: false,
            contentType: false
        } )
        //returns a placeholder for div-id #success
        //re-draws the table with new file
        .done(function(serverResponse) {
            $('#success').html('<div class="row remove fade in" id="success" role="alert"><div class="col-md-6 alert alert-success">Your file has been successfully uploaded.</div></div>');
            populateTable();
        })
        //returns a placeholder for div-id #failure
        .fail(function(error) {
            $('#error').html('<div class="row remove fade in" role="alert"><div class="col-md-6 alert alert-danger">An error occurred while uploading your file.</div></div>');
        });
    e.preventDefault();
});

//function to remove the alert from the page
window.setTimeout(function() {
  $(".remove").fadeTo(500, 0).slideUp(500, function(){
      $(this).remove();
  });
}, 6000);