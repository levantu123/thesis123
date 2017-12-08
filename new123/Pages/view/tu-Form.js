

function SubmitResponseToDatabase() {
    var str;
    $.ajax({
        url: "/Surveys/submitResponse",
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "text",
        processData: true,
        data: JSON.stringify({ id: surveryid, json: ko.toJSON(getCurrentSolutionObject(getCurrentJsFormObject())) }),
        success: function (data) {
            str = data;
        },
        failure: function (data) {
            alert("Fail " + data);
        }

    });
    return str;
}

//var jsonsolution = getSolutionjson()+"";
//var objectsolution = JSON.parse(getSolutionjson() + "");



//-----------------------------------------------------------------------------------//


function ObjectKoQuestionForm(question) {
    var temp_options = [];
    question.choices.forEach(function (choice) {
        temp_options.push(choice.choice_value);
    });
    return {
        qid: question.qid,
        btype: question.btype,
        qtype: ko.observable(question.qtype),
        title: ko.observable(question.title),
        choices: obsChoices(question.choices),
        options: temp_options,
        answer: ko.observable(''),
        selectedOptions: ko.observableArray([temp_options[0]])
    }
}
function ObjectKoPageForm(page) {
    var temp_questions = [];
    page.questions.forEach(function (question) {
        temp_questions.push(new ObjectKoQuestionForm(question));
    });
    return {
        questions: ko.observableArray(temp_questions)
    };
}

function ObjectKoSurveyDataForm(sjson) {
    var sid = sjson.index;
    var sname = sjson.sname;
    var spages = [];
    sjson.pages.forEach(function (page) {
        spages.push(new ObjectKoPageForm(page));
    });
    return {
        index: ko.observable(sid),
        sname: ko.observable(sname),
        pages: ko.observableArray(spages)
    };
}

form = ObjectKoSurveyDataForm(JSON.parse(getSurveyDatajson() + ""));

function getCurrentJsFormObject() {
    return ko.toJS(form);
}

function getCurrentSolutionObject(data) {
    var answers = [];
    var text = '';
    data.pages.forEach(function (page)
    {
        page.questions.forEach(function (question)
        {
            if (question.btype === 'bdropdown')
            {
                text = question.selectedOptions[0];
            }
            if (question.btype === 'bmultiple')
            {
                text = question.answer;
            }
            if (question.btype === 'btextbox')
            {
                text = question.answer;
            }
            if (question.btype === 'bparagraph')
            {
                text = question.answer;
            }
            answers.push(
                {
                    qid: question.qid,
                    title: question.title,
                    text: text
                });
        });
    });

    
    return {
        Timestamp: new Date().toLocaleString(),
        answers: answers
    };
}
