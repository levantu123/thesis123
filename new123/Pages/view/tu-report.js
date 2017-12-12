solution = SolutionKoObject(JSON.parse(getSolutionjson() + ""));

surveyobject = JSON.parse(getSurveyDatajson() + "");
function getQuestionsList(data) {
    var list = [];
    data.pages.forEach(function (page) {
        page.questions.forEach(function (question) {
            list.push({ qtitle: ko.observable(question.title) });
        });
        
    });
    return list;
}


function responseObject(response, Questions)
{

    var temp_answers = [];
    temp_answers.push({ qid: -1, answer: response.Timestamp });
    Questions.forEach(function (question)
    {
        if (question.qid > -1)
        {
            temp_answers.push({ qid: question.qid, answer: "" });
        }
        
    });
    response.answers.forEach(function (answer)
    {
        temp_answers.forEach(function (question)
        {
            if (question.qid === answer.qid)
            {
                question.answer = answer.text;
                
            }
        });
    });
    return {
        answers: temp_answers
    }
}

function getAllAnwserFromObSolution(objectsolution)
{
    return Array.prototype.concat.apply([], objectsolution.responses.map(r => r.answers));
}
function buildRowTemplateFromAllAnswers(Answers)
{
    var Questions = [];
    var QIds = [-1];
    var QTitles = ["Timestamp"];
    Questions.push({ qid: -1, title: "Timestamp" });
    Answers.forEach(function (answer)
    {
        if (!QIds.includes(answer.qid))
        {
            QIds.push(answer.qid);
            QTitles.push(answer.title);
            Questions.push({ qid: answer.qid, title: answer.title });
        }
        else
        {
            QTitles[QIds.indexOf(answer.qid)] = answer.title;
            Questions[QIds.indexOf(answer.qid)].title = answer.title;
        }
    });
    return Questions;
}
function SolutionKoObject(objectsolution)
{
    var Questions = buildRowTemplateFromAllAnswers(getAllAnwserFromObSolution(objectsolution));
    var rows = [];
    objectsolution.responses.forEach(function (response)
    {
        rows.push(responseObject(response, Questions));
    });
    var Sself= {
        index: objectsolution.index,
        Questions: ko.observableArray(Questions),
        responses: ko.observableArray(rows)
    };
    return Sself;
}
function get1column(column, objectsolution)
{
    var Questions = buildRowTemplateFromAllAnswers(getAllAnwserFromObSolution(objectsolution));
    var rows = [];
    objectsolution.responses.forEach(function (response)
    {
        rows.push(responseObject(response, Questions));
    });
    var columndata = [];
    rows.forEach(function (row)
    {
        columndata.push(row.answers[column].answer);
    })
    var count = {};
    columndata.forEach(function (i) { count[i] = (count[i] || 0) + 1; })
    var data = Object.keys(count).map(function (key) { return count[key]; });
    var label = Object.keys(count).map(function (key) { return key; });
    var Cself = {
        Question: Questions[column],
        dataPoints: data,
        label: label
    }
    return Cself;
}

function chartdata(column)
{
    return {
        type: "pie",  

        data: {
            labels: get1column(column, JSON.parse(getSolutionjson() + "")).label,
            datasets: [{
                label: '# of Votes',
                data: get1column(column, JSON.parse(getSolutionjson() + "")).dataPoints,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }],
                xAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            responsive: true
        }
       // data: [
        //    {
                // Change type to "bar", "area", "spline", "pie",etc.
        //        type: "pie",
             //   dataPoints: get1column(column, JSON.parse(getSolutionjson() + "")).dataPoints
         //   }
      //  ]
    }
}

function getAllChart()
{
    var charts = [];
    var Questions = buildRowTemplateFromAllAnswers(getAllAnwserFromObSolution(JSON.parse(getSolutionjson() + "")));
    Questions.forEach(function (question)
    {
        var ctx = document.getElementById("chart" + question.qid.toString()).getContext('2d');
        if (Questions.indexOf(question) > -1){
            var chart = new Chart(ctx, chartdata(Questions.indexOf(question)));
            charts.push(chart);
        };
        
    });
    //charts.shift();
    return charts;
}