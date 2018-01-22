

function SubmitResponseToDatabase() {
    var str;
    var con = confirm("Confirm the submition?");
    if (con)
    {
        $.ajax({
            url: "/Surveys/submitResponse",
            type: 'POST',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "text",
            processData: true,
            data: JSON.stringify({ id: surveryid, json: ko.toJSON(getCurrentSolutionObject(getCurrentJsFormObject())) }),
            success: function (data)
            {
                str = data;
            },
            failure: function (data)
            {
                alert("Fail " + data);
            }

        });
    }
    
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
    var row = [];
    var column = [];
    console.log(question);
    question.row.forEach(function (r)
    {
        row.push({
            svalue: ko.observable(r.svalue)
        });
    });
    question.column.forEach(function (c)
    {
        column.push({
            svalue: ko.observable(c.svalue)
        });
    });
    var selectedmatrixrow = [];
    question.row.forEach(function (r)
    {
        var c = [];
        question.column.forEach(function (co)
        {
            c.push({
                svalue: co.svalue,
                selectedOptions: ko.observableArray([temp_options[0]])
            });
        });
        selectedmatrixrow.push({
            svalue: r.svalue,
            selectedmatrixcolumn: c
        });
    });
    var fself = {
        qid: question.qid,
        btype: question.btype,
        qtype: ko.observable(question.qtype),
        title: ko.observable(question.title),
        choices: obsChoices(question.choices),
        isrequired: question.isrequired,
        row: ko.observableArray(row),
        column: ko.observableArray(column),
        requiredcontent: question.requiredcontent,
        options: temp_options,
        answer: ko.observable(''),
        nextpagedetect: question.nextpagedetect,
        isvalid: function ()
        {
            var valid = true;
            var text = fself.answer();
            var re = new RegExp(fself.regular());
            if (!re.test(text))
            {          
                valid = false;
            }
            if (text === '' && fself.isrequired)
            {
                valid = false;
            }

            return valid;
        },
        required: function ()
        {
            var req = (fself.isrequired && (fself.regular().length > 3));
            return req;
        },
        selectedOptions: ko.observableArray([temp_options[0]]),
        selectedMatrixrow: selectedmatrixrow,
        regular: function ()
        {
            // ^(?=.*Android)(?=.*Mobile)(?!.*hihi)(?!.*haha).*
            var regex = "^";
            fself.requiredcontent.must.forEach(function (w)
            {
                if (w.svalue.length !== 0)
                {
                    regex = regex + "(?=.*" + w.svalue + ")";
                }              
            });
            fself.requiredcontent.mustnot.forEach(function (w)
            {
                if (w.svalue.length !== 0)
                {
                    regex = regex + "(?!.*" + w.svalue + ")";
                }
            });
            regex = regex + ".*";

            if (fself.requiredcontent.inputtype === 'tel')
            {
                regex = '[\+]\d{2}[\(]\d{2}[\)]\d{4}[\-]\d{4}';
            }
            if (fself.requiredcontent.inputtype === 'color')
            {
                regex = '^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$';
            }
            if (fself.requiredcontent.inputtype === 'email')
            {
                regex = '^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$';
            }
            if (fself.requiredcontent.inputtype === 'url')
            {
                regex = '/^(ftp|http|https):\/\/[^ "]+$ /';
            }
            if (fself.requiredcontent.inputtype === 'tel')
            {
                regex = '[\+]\d{2}[\(]\d{2}[\)]\d{4}[\-]\d{4}';
            }
            if (fself.requiredcontent.inputtype === 'tel')
            {
                regex = '[\+]\d{2}[\(]\d{2}[\)]\d{4}[\-]\d{4}';
            }
            if (fself.requiredcontent.inputtype === 'tel')
            {
                regex = '[\+]\d{2}[\(]\d{2}[\)]\d{4}[\-]\d{4}';
            }
            if (fself.requiredcontent.inputtype === 'tel')
            {
                regex = '[\+]\d{2}[\(]\d{2}[\)]\d{4}[\-]\d{4}';
            }
            return regex;
        },
        getscore: function()
        {
            var choices = fself.choices;
            var sc = -1;
            choices.forEach(function (c)
            {
                if (fself.answer() === c().choice_value())
                {
                    sc = c().score();
                }
            });          
            return sc;
        },
        getnextpage: function ()
        {
            var choices = fself.choices;
            var sc = -1;
            choices.forEach(function (c)
            {
                if (fself.btype === "bdropdown" || fself.btype === "bcheckbox")
                {
                    if (fself.selectedOptions()[0] === c.choice_value())
                    {
                        sc = c.nextpage();
                    }
                }
                else
                {
                    if (fself.answer() === c.choice_value())
                    {
                        sc = c.nextpage();
                    }
                }
                
            });
            if (!fself.nextpagedetect)
            {
                sc = -1;
            }
            return sc;
        }
    };
    return fself;
}
function ObjectKoPageForm(page) {
    var temp_questions = [];
    page.questions.forEach(function (question) {
        temp_questions.push(new ObjectKoQuestionForm(question));
    });
    var pself = {
        questions: ko.observableArray(temp_questions),
        getnextpage: function ()
        {
            var sc = -1;
            pself.questions().forEach(function (q)
            {
                if (q.getnextpage() !== -1)
                {
                    sc = q.getnextpage();
                }
                
            });
            return sc;
        },
        isvalid: function ()
        {
            var valid = true;
            pself.questions().forEach(function (q)
            {
                valid = (valid && q.isvalid());
            });
            return valid;
        }
    };
    return pself;
}

function ObjectKoSurveyDataForm(sjson) {
    var sid = sjson.index;
    var sname = sjson.sname;
    var spages = [];
    sjson.pages.forEach(function (page)
    {    
         spages.push(new ObjectKoPageForm(page));      
    });
    
    var sself=  {
        index: ko.observable(sid),
        sname: ko.observable(sname),
        pages: ko.observableArray(spages),
        pagesshown: ko.observableArray([]),
        nextpageadd: function (i)
        {
            var exits = false;
            var lastindex = 0;
            sself.pagesshown().forEach(function (p)
            {             
                if (p === i)
                {
                    exits = true;
                    lastindex = sself.pagesshown.indexOf(p);
                }
            });
            if (exits)
            {
                var k = sself.pagesshown().length;
                for (j = lastindex; j < k; j++)
                {
                    sself.pagesshown().pop();
                }
            }
            sself.pagesshown.push(i);
        },
        getlength: function ()
        {
            return sself.pages().length;
        },
        getbackpage: function (i)
        {
            var pi = -1;
            var exits = false;
            var lastindex = 0;
            sself.pagesshown().forEach(function (p)
            {
                if (p === i)
                {
                    exits = true;
                    lastindex = sself.pagesshown.indexOf(p);
                }
            });          
            if (exits)
            {
                pi = sself.pagesshown()[lastindex - 1];
            } else
            {
                pi = sself.pagesshown()[sself.pagesshown().length -1];
            }
       
            return pi;
        }
    };
    return sself;
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
            if (question.btype === 'bcheckbox')
            {
                question.selectedOptions.forEach(function (t)
                {
                    text = text+ '['+t+'], '
                });
                text = text.slice(0, -2);
            }
            if (question.btype === 'bmatrix1')
            {
                text = question.answer;
            }
            if (question.btype === 'bmatrix2')
            {
                text = '';
                
                question.selectedMatrixrow.forEach(function (r)
                {
                    r.selectedmatrixcolumn.forEach(function (c)
                    {
                        text = text + '[' + r.svalue + ', ' + c.svalue + '] = [' + c.selectedOptions[0] + '], ';
                    });
                });
                
                text = text.slice(0, -2);
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
