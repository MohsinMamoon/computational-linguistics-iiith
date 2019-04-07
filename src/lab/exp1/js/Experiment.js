/** Object to store response from ajax query */
var Sentences = {};

/** Function to retrieve sentences of a particular language from the database (as selected by user) */
function lang_sel(language) {
    $.ajax({
        url: 'http://0.0.0.0:5000/sentences/get',
        method: 'GET',
        data: {
            lang: language
        },
        success: function (response) {
            if (response.status) {
                console.log(response.sentence);
                Sentences = response.sentence;
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

/**Funtion to randomize word order */
function fy(a, b, c, d) {
    c = a.length;
    while (c) 
        b = Math.random() * c-- | 0, 
        d = a[c],
        a[c] = a[b],
        a[b] = d
}