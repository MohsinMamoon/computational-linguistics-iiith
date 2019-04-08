/* *Objects to store data globally */
var Questions = {};

/** Function to retrieve sentences of a particular language from the database and add data to the webpage(as selected by user) */
function lang_sel(language) {
    $.ajax({
        url: 'http://0.0.0.0:5000/questions/get',
        method: 'GET',
        data: {
            lang: language
        },
        success: function (response) {
            console.log(response);
            if (response.status) {
                Questions = response.questions;
                //Write code to update html
            } else {
                alert("An error has occured");
            }
        },
        error: function (response) {
            console.log(response);
            alert("An error occured");
        }
    });
    $('.language_selector')[0].style.display = 'none';
    $('.experiment_content')[0].style.display = 'grid';
}
