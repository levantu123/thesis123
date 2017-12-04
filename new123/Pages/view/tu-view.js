

function updateSurveyData() {
    var str;
    $.ajax({
        url: "/Surveys/updateSurvey",
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "text",
        processData: true,
        data: JSON.stringify({ id: surveryid, json: ko.toJSON(survey1) }),
        success: function (data) {
            str = data;
        },
        failure: function (data) {
            alert("Fail " + data);
        }

    });
    return str;
}

function ObjectKoQuestion(question) {
    return {
        btype: question.btype,
        qtype: ko.observable(question.qtype),
        title: ko.observable(question.title),
        useshortdescription: ko.observable(question.useshortdescription),
        shortdescription: ko.observable(question.shortdescription),
        isrequired: ko.observable(question.isrequired),
        nextpagedetect: ko.observable(question.nextpagedetect),
        isscored: ko.observable(question.isscored),
        choices: ko.observableArray(obsChoices(question.choices)),
        scoretable: ko.observableArray(obsscoretable(question.scoretable)),
        requiredcontent: ko.observable(obsrequiredcontent(question.requiredcontent)),
        inedit: ko.observable(false),
        addchoice: function () {
            this.choices.push(ko.observable({ choice_value: ko.observable('new option') }));
        }     
    }
}

function ObjectKoPage(page)
{
    var pshortdescription = page.shortdescription;
    var ptitle = page.page_title;
    var temp_questions = [];
    var doafter = page.doafter;
    page.questions.forEach(function (question) {
        temp_questions.push(ObjectKoQuestion(question));
    })
    var pself = {};
    pself.page_title = ko.observable(ptitle);
    pself.questions = ko.observableArray(temp_questions);
    pself.shortdescription = ko.observable(pshortdescription);
    pself.doafter = ko.observable(doafter);
    pself.removeQuestion = function () {
        pself.questions.remove(this);
    }
    return pself;
}


//var surveyjsonst = getSurveyDatajson()+ "";
//var surveyjson = JSON.parse(getSurveyDatajson() + "");


function ObjectKoSurveyData(sjson) {
    var sid = sjson.index;
    var sname = sjson.sname;
    var sshortdescription = sjson.shortdescription;
    var spages = [];
    sjson.pages.forEach(function (page) {
        spages.push(ObjectKoPage(page));
    });
    var tself = {};
    tself.index = ko.observable(sid);
    tself.sname = ko.observable( sname );
    tself.shortdescription = ko.observable(sshortdescription);
    tself.pages = ko.observableArray(spages);
    tself.removePage = function () {
        tself.pages.remove(this);
    };
    tself.addPage = function () {
        tself.pages.push(ObjectKoPage({ questions:[]}));
    };
    return tself;
}
survey1 = ObjectKoSurveyData(JSON.parse(getSurveyDatajson() + ""));

function getCurrentJsonSurveyDataString() {
    return ko.toJSON(survey1);
}