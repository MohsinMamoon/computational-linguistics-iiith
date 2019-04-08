$("#add_ques").submit(function (e) {
    e.preventDefault();

    var words = [], vars = [], var_type = [];
    
    for(var i=0; i<word_count; i++) {
        words.push($('#word'+String(i)).val());
    }

    for(var j=0; j<var_count; j++) {
        vars.push($('#var'+String(j)).val());
        var_type.push($('#var_type'+String(j)).val());
    }

    var lang = $('#Language').val();
    
    if (!words.includes("") && !vars.includes("") && lang != "") {
        $.ajax({
            url: 'http://0.0.0.0:5000/sentences/add',
            method: 'POST',
            data: {
                Words: JSON.stringify(words),
                Vars: JSON.stringify(vars),
                Var_type: JSON.stringify(var_type),
                Lang: lang
            },
            success: function (response) {
                console.log(response);
                $('#add_ques').trigger('reset');
            },
            error: function (response) {
                console.log(response);
                alert("An error occured");
            }
        });
    }
});

var word_count = 0, var_count = 0;

while(word_count == 0 || isNaN(word_count))
    word_count = parseInt(prompt('Enter the number of words:'));
while(var_count == 0 || isNaN(var_count)) 
    var_count = parseInt(prompt('Enter the number of variations of the sentence: '));

for(var i=0; i<word_count; i++) {
    var spn = $('<span class="col-sm-4"></span>');
    var tbox = $('<input type="text" class="form-control" name="word'+String(i)+'" id="word'+String(i)+'" placeholder="Enter word '+String(i)+'" required>');
    spn.append(tbox);
    $('.words')[0].append(spn[0]);
}

var types = ['Declarative', 'Interrogative', 'Exclamatory', 'Imperative'];
for(var i=0; i<var_count; i++) {
    var spn = $('<div></div>');
    var tbox = $('<input type="text" class="form-control" name="var'+String(i)+'" id="var'+String(i)+'" placeholder="Enter variation '+String(i)+'" required>');
    var sel = $('<select id="var_type'+String(i)+'"> </select>');
    for(var k=0; k<4; k++) {
        var opt = $('<option value="'+types[k]+'"></option>').text(types[k]);
        sel.append(opt);
    }
    spn.append(tbox,sel);
    $('.variations')[0].append(spn[0], $('<br />')[0]);
}