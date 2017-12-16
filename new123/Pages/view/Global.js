function newMultiple() {
    return {
        qid: survey1.nextqid,
        btype: 'bmultiple',
        qtype: ko.observable('qmultiple'),
        title: ko.observable('New Multiple'),
        useshortdescription: ko.observable(false),
        shortdescription: ko.observable(""),
        isrequired: ko.observable(false),
        nextpagedetect: ko.observable(false),
        isscored: ko.observable(false),
        choices: ko.observableArray(obsChoices([
            {
                choice_value: 'Option 1',
                nextpage: -1,
                score: 0
            }])),
        addchoice: function ()
        {
            this.choices.push(ko.observable({ choice_value: ko.observable('new option'), nextpage: ko.observable(-1), score : ko.observable(0) }));
        },
        requiredcontent: ko.observable({
            used: ko.observable(false),
            min: ko.observable(0),
            max: ko.observable(0),
            must: ko.observableArray([]),
            mustnot: ko.observableArray([])
        }),
        inedit: ko.observable(false)
    }
}


function obsrequiredcontent(requiredcontent)
{
    var re = requiredcontent.must;
    var ren = requiredcontent.mustnot;
    var mustnws = [];
    var mustws = [];
    re.forEach(function (mw)
    {
        mustws.push({ svalue: ko.observable(mw.svalue) });
    });
    console.log(ko.toJSON(mustws));
    ren.forEach(function (mnw)
    {
        mustnws.push({ value: ko.observable(mnw.svalue) });
    });
    

    var rself = {
        used: ko.observable(requiredcontent.used),
        isnumber: ko.observable(requiredcontent.isnumber),
        min: ko.observable(requiredcontent.min),
        max: ko.observable(requiredcontent.max),
        nmin: ko.observable(requiredcontent.nmin),
        nmax: ko.observable(requiredcontent.nmax),
        must: ko.observableArray(mustws),
        mustnot: ko.observableArray(mustnws),
        addbanned: function ()
        {
            rself.mustnot.push({ svalue: ko.observable("some think")});
        },
        addmust: function ()
        {
            rself.must.push({ svalue: ko.observable("some think")});
        },
        removebanned: function ()
        {
            rself.mustnot.remove(this);
        },
        removemust: function ()
        {
            console.log("neeed");
            rself.must.remove(this);
        }
    };
    return rself;
}
function newDropdown() {
    var pself = {
        qid: survey1.nextqid,
        btype: 'bdropdown',
        qtype: ko.observable('qdropdown'),
        title: ko.observable('New Dropdown'),
        useshortdescription: ko.observable(false),
        shortdescription: ko.observable(""),
        isrequired: ko.observable(false),
        nextpagedetect: ko.observable(false),
        isscored: ko.observable(false),
        choices: ko.observableArray(obsChoices([
            {
                choice_value: 'Option 1',
                nextpage: -1,
                score: 0
            }])),
        addchoice: function ()
        {
            this.choices.push(ko.observable({ choice_value: ko.observable('new option'), nextpage: ko.observable(-1), score: ko.observable(0) }));
        },
        requiredcontent: ko.observable({
            used: ko.observable(false),
            min: ko.observable(0),
            max: ko.observable(0),
            must: ko.observableArray([]),
            mustnot: ko.observableArray([])
        }),
        inedit: ko.observable(false),
        showoption: ko.pureComputed(function ()
        {
            return (pself.isscored() || pself.nextpagedetect());
        })
    };
    return pself;
}

function newTextbox() {
    var pself = {
        qid: survey1.nextqid,
        btype: 'btextbox',
        qtype: ko.observable('qtextbox'),
        title: ko.observable('New Textbox'),
        useshortdescription: ko.observable(false),
        shortdescription: ko.observable(""),
        isrequired: ko.observable(false),
        nextpagedetect: ko.observable(false),
        isscored: ko.observable(false),
        choices: ko.observableArray(obsChoices([])),
        addchoice: function ()
        {
            this.choices.push(ko.observable({ choice_value: ko.observable('new option'), nextpage: ko.observable(-1), score: ko.observable(0) }));
        },
        requiredcontent: ko.observable({
            used: ko.observable(false),
            min: ko.observable(0),
            max: ko.observable(100),
            must: ko.observableArray([]),
            mustnot: ko.observableArray([])
        }),
        inedit: ko.observable(false),
        showoption: ko.pureComputed(function ()
        {
            return (pself.isscored() || pself.nextpagedetect());
        })
    };
    return pself;
}
function newPharagraph() {
    var pself = {
        qid: survey1.nextqid,
        btype: 'bparagraph',
        qtype: ko.observable('qparagraph'),
        title: ko.observable('New Paragraph'),
        useshortdescription: ko.observable(false),
        shortdescription: ko.observable(""),
        isrequired: ko.observable(false),
        nextpagedetect: ko.observable(false),
        isscored: ko.observable(false),
        choices: ko.observableArray(obsChoices([])),
        addchoice: function ()
        {
            this.choices.push(ko.observable({ choice_value: ko.observable('new option'), nextpage: ko.observable(-1), score: ko.observable(0) }));
        },
        requiredcontent: ko.observable({
            used: ko.observable(false),
            min: ko.observable(0),
            max: ko.observable(10000),
            must: ko.observableArray([]),
            mustnot: ko.observableArray([])
        }),
        inedit: ko.observable(false),
        showoption: ko.pureComputed(function ()
        {
            return (pself.isscored() || pself.nextpagedetect());
        })
    };
    return pself;
}
//--------------------------------------------------------------------------------------------------
function newnMultiple() {
    var pself = {
        isdefault: true,
        btype: 'bmultiple',
        qtype: ko.observable('qmultiple'),
        title: ko.observable('New Multiple'),
        useshortdescription: ko.observable(false),
        shortdescription: ko.observable(""),
        isrequired: ko.observable(false),
        nextpagedetect: ko.observable(false),
        isscored: ko.observable(false),
        choices: ko.observableArray(obsChoices([
            {
                choice_value: 'Option 1',
                nextpage: -1,
                score: 0
            }])),
        addchoice: function ()
        {
            this.choices.push(ko.observable({ choice_value: ko.observable('new option'), nextpage: ko.observable(-1), score: ko.observable(0) }));
        },
        requiredcontent: ko.observable({
            used: ko.observable(false),
            min: ko.observable(0),
            max: ko.observable(0),
            must: ko.observableArray([]),
            mustnot: ko.observableArray([])
        }),
        inedit: ko.observable(false),
        showoption: ko.pureComputed(function ()
        {
            return (pself.isscored() || pself.nextpagedetect());
        })
    };
    return pself;
}

function newnDropdown() {
    var pself = {
        isdefault: true,
        btype: 'bdropdown',
        qtype: ko.observable('qdropdown'),
        title: ko.observable('New Dropdown'),
        useshortdescription: ko.observable(false),
        shortdescription: ko.observable(""),
        isrequired: ko.observable(false),
        nextpagedetect: ko.observable(false),
        isscored: ko.observable(false),
        choices: ko.observableArray(obsChoices([
            {
                choice_value: 'Option 1',
                nextpage: -1,
                score: 0
            }])),
        addchoice: function ()
        {
            this.choices.push(ko.observable({ choice_value: ko.observable('new option'), nextpage: ko.observable(-1), score: ko.observable(0) }));
        },
        requiredcontent: ko.observable({
            used: ko.observable(false),
            min: ko.observable(0),
            max: ko.observable(0),
            must: ko.observableArray([]),
            mustnot: ko.observableArray([])
        }),
        inedit: ko.observable(false),
        showoption: ko.pureComputed(function ()
        {
            return (pself.isscored() || pself.nextpagedetect());
        })
    };
    return pself;
}

function newnTextbox() {
    var pself = {
        isdefault: true,
        btype: 'btextbox',
        qtype: ko.observable('qtextbox'),
        title: ko.observable('New Textbox'),
        useshortdescription: ko.observable(false),
        shortdescription: ko.observable(""),
        isrequired: ko.observable(false),
        nextpagedetect: ko.observable(false),
        isscored: ko.observable(false),
        choices: ko.observableArray(obsChoices([])),
        addchoice: function ()
        {
            this.choices.push(ko.observable({ choice_value: ko.observable('new option'), nextpage: ko.observable(-1), score: ko.observable(0) }));
        },
        requiredcontent: ko.observable({
            used: ko.observable(false),
            min: ko.observable(0),
            max: ko.observable(100),
            must: ko.observableArray([]),
            mustnot: ko.observableArray([])
        }),
        inedit: ko.observable(false),
        showoption: ko.pureComputed(function ()
        {
            return (pself.isscored() || pself.nextpagedetect());
        })
    };
    return pself;
}
function newnPharagraph() {
    var pself = {
        isdefault: true,
        btype: 'bparagraph',
        qtype: ko.observable('qparagraph'),
        title: ko.observable('New Paragraph'),
        useshortdescription: ko.observable(false),
        shortdescription: ko.observable(""),
        isrequired: ko.observable(false),
        nextpagedetect: ko.observable(false),
        isscored: ko.observable(false),
        choices: ko.observableArray(obsChoices([])),
        addchoice: function ()
        {
            this.choices.push(ko.observable({ choice_value: ko.observable('new option'), nextpage: ko.observable(-1), score: ko.observable(0) }));
        },
        requiredcontent: ko.observable({
            used: ko.observable(false),
            min: ko.observable(0),
            max: ko.observable(1000),
            must: ko.observableArray([]),
            mustnot: ko.observableArray([])
        }),
        inedit: ko.observable(false),
        showoption: ko.pureComputed(function ()
        {
            return (pself.isscored() || pself.nextpagedetect());
        })
    };
    return pself;
}
//------------------------------------------------------------------------------------------------

function Task(type) {
    if (type === 'bmultiple') return new newMultiple();
    if (type === 'bdropdown') return new newDropdown();
    if (type === 'btextbox') return new newTextbox();
    if (type === 'bparagraph') return new newPharagraph();


    if (type === 'nbmultiple') return new newnMultiple();
    if (type === 'nbdropdown') return new newnDropdown();
    if (type === 'nbtextbox') return new newnTextbox();
    if (type === 'nbparagraph') return new newnPharagraph();
}

function getSurveyDatajson() {
    var str;
    $.ajax({
        url: "/Surveys/jdit",
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "text",
        processData: true,
        data: JSON.stringify({ id: surveryid }),
        success: function (data) {
            str = data;
        },
        failure: function (data) {
            alert("Fail " + data);
        }

    });
    return str;
}

function getSolutionjson() {
    var str;
    $.ajax({
        url: "/Surveys/jsolution",
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "text",
        processData: true,
        data: JSON.stringify({ id: surveryid }),
        success: function (data) {
            str = data;
        },
        failure: function (data) {
            alert("Fail " + data);
        }

    });
    return str;
}

function obsChoices(choices)
{
    var temp_choices = [];
    choices.forEach(function (choice)
    {
        var temp_choice = {
            choice_value: ko.observable(choice.choice_value),
            nextpage: ko.observable(choice.nextpage),
            score: ko.observable(choice.score)
        };
        temp_choices.push(ko.observable(temp_choice));
    });
    return temp_choices;
}
