/* *Objects to store data globally */
var Sentences = {},
    stack = [],
    var_count = 0,
    var_found = [];

/** Function to retrieve sentences of a particular language from the database and add data to the webpage(as selected by user) */
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
                fy(Sentences.Words);
                for (var j of Sentences.Words) {
                    var button = $('<button type="button" class="btn btn-primary btn-lg active ' + j + '"></button>').text(j);
                    $('#word_buttons').prepend(button[0]);
                    $('.' + j).on('click', {
                        word: j
                    }, add_sent);
                }
                for (var i in Sentences.Variations) var_count++;
                update_count();

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

/* *Funtion to randomize word order */
function fy(a, b, c, d) {
    c = a.length;
    while (c)
        b = Math.random() * c-- | 0,
        d = a[c],
        a[c] = a[b],
        a[b] = d
}

/* *Functions to activate and disable buttons */
function activate(elem) {
    try {
        elem.classList.remove('disabled');
        elem.classList.add('active');
    } catch (err) {
        elem.removeClass('disabled');
        elem.addClass('active');
    }
}

function disable(elem) {
    try {
        elem.classList.remove('active');
        elem.classList.add('disabled');
    } catch (err) {
        elem.removeClass('active');
        elem.addClass('disabled');
    }
}

/* *Functions to update the sentence and counter*/
function update_sentence() {
    var sent = stack.join(' ').toLowerCase();
    if (sent.length > 0)
        $('#sentence').text(sent.replace(sent[0], sent[0].toUpperCase()));
    else
        $('#sentence').text(sent);
}

function update_count() {
    $('#var_count').find('dt').text(var_count);
    if (var_count <= 1) $('#var_count').find('mark').text('Sentence left');
    else $('#var_count').find('mark').text('Sentences left');
}
/* *Function to add word (pressed) to the sentence  */
function add_sent(event) {
    var W = String(event.data.word);
    if ($(this).hasClass('active')) {
        stack.push(W);
        update_sentence();
        disable(this);
        if (stack.length > 0) {
            activate($('#undo_btn'));
        }
    }
}

/* *Function to undo word add */
function undo() {
    var last = stack[stack.length - 1];
    stack.pop();
    update_sentence();
    var elements = $('.' + last);
    for (var i in elements) {
        if (!isNaN(i) && elements[i].classList.contains('disabled')) {
            activate(elements[i]);
            break;
        }
    }
    if (stack.length == 0)
        disable($('#undo_btn'));
}

/* *Function to reset */
function reset_all() {
    reset();
    var_count = 0;
    for (var i in Sentences.Variations) var_count++;
    update_count();
    var_found = [];
}

function reset() {
    while (stack.length) undo();
}

/* *Function to check Sentence */
function check_sent() {
    var_count--;
    reset();
    update_count();
    if (var_count == 0) {
        alert('Congratulations! You have completed the experiment!');
        if (confirm("Another try?")) location.reload();
        // else show_all_sent();
    }
}