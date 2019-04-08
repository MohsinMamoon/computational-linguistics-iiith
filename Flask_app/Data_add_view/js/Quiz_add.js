$("#add_ques").submit(function (e) {
    e.preventDefault();
});
$("#del_ques").submit(function (e) {
    e.preventDefault();
});

function sub() {
    var ques = $('#Question').val();
    var opts = [$('#Option1').val(), $('#Option2').val(), $('#Option3').val(), $('#Option4').val()];
    var lang = $('#Language').val();
    var ans = $('#Answer').val();
    if (Question != "" && Option1 != "" && Option2 != "" && Option3 != "" && Option4 != "" && Language != "" &&
        Answer != "") {
        $.ajax({
            url: 'http://0.0.0.0:5000/questions/add',
            method: 'POST',
            data: {
                Question: ques,
                Option1: opts[0],
                Option2: opts[1],
                Option3: opts[2],
                Option4: opts[3],
                Answer: ans,
                Language: lang
            },
            success: function (response) {
                console.log(response);
                res();
            },
            error: function (response) {
                console.log(response);
                alert("An error occured");
            }
        });
    }
}

function del() {
    var id = $("#ID").val();
    if(!isNaN(id)) {
        $.ajax({
            url: 'https://0.0.0.0:5000/questions/delete',
            method: 'GET',
            data: {
                id: id
            },
            success: function (response) {
                console.log(response);
                res();
            },
            error: function(response) {
                console.log(response);
                alert("An error occured");
            }
        });
    }
}

function res() {
    $('#add_ques').trigger('reset');
    $('#del_ques').trigger('reset');
}
