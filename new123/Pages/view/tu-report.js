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
            var Question = {
                qid: answer.qid,
                title: answer.title,
                isShowPie: ko.observable(true),
                isShowBar: ko.observable(true),
                isShowLine: ko.observable(true),       
            };
            Questions.push(Question);
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
    var charts = buildRowTemplateFromAllAnswers(getAllAnwserFromObSolution(objectsolution));
    charts.shift();
    var rows = [];
    objectsolution.responses.forEach(function (response)
    {
        rows.push(responseObject(response, Questions));
    });
    var Sself= {
        index: objectsolution.index,
        Questions: ko.observableArray(Questions),
        responses: ko.observableArray(rows),
        Charts: ko.observableArray(charts)
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

function chartdata(column, type)
{
    var backgroundColor = [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(0, 255, 0, 0.2)',
        'rgba(255, 0, 0, 0.2)',
        'rgba(0, 0, 0, 0.2)',
        'rgba(128, 255, 0, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(0, 255, 0, 0.2)',
        'rgba(255, 0, 0, 0.2)',
        'rgba(0, 0, 0, 0.2)',
        'rgba(128, 255, 0, 0.2)'
    ];
    var borderColor = [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(0, 255, 0, 1)',
        'rgba(255, 0, 0, 1)',
        'rgba(0, 0, 0, 1)',
        'rgba(128, 255, 0, 1)',
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(0, 255, 0, 1)',
        'rgba(255, 0, 0, 1)',
        'rgba(0, 0, 0, 1)',
        'rgba(128, 255, 0, 1)'
    ];

    var forline = {
        type: type,

        data: {
            labels: get1column(column, JSON.parse(getSolutionjson() + "")).label,
            datasets: [{
                label: '# of Votes',
                data: get1column(column, JSON.parse(getSolutionjson() + "")).dataPoints,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
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
    };
        var forpie = {
            type: type,

            data: {
                labels: get1column(column, JSON.parse(getSolutionjson() + "")).label,
                datasets: [{
                    label: '# of Votes',
                    data: get1column(column, JSON.parse(getSolutionjson() + "")).dataPoints,
                    backgroundColor: backgroundColor,
                    borderColor: borderColor,
                    borderWidth: 1
                }]
            },
            options: {


            }
            
    };
        var forpolar = {
            type: type,

            data: {
                labels: get1column(column, JSON.parse(getSolutionjson() + "")).label,
                datasets: [{
                    label: '# of Votes',
                    data: get1column(column, JSON.parse(getSolutionjson() + "")).dataPoints,
                    backgroundColor: backgroundColor,
                    borderColor: borderColor,
                    borderWidth: 1
                }]
            },
            options: {


                responsive: true,
                legend: {
                    position: 'right',
                },
                title: {
                    display: true,
                    text: '# of votes'
                },
                scale: {
                    ticks: {
                        beginAtZero: true
                    },
                    reverse: false
                },
                animation: {
                    animateRotate: false,
                    animateScale: true
                }
            }

        };
        var forreturn;
        if ((type === 'line') || (type === 'bar')){
            forreturn = forline;
        };
        if ((type === 'pie') || (type === 'radar')) {
            forreturn = forpie;
        };
        if ((type === 'polarArea')) {
            forreturn = forpolar;
        };
        return forreturn;
    
}

function getAllChart()
{
    var Questions = buildRowTemplateFromAllAnswers(getAllAnwserFromObSolution(JSON.parse(getSolutionjson() + "")));
    Questions.forEach(function (question)
    {    
        if (Questions.indexOf(question) > 0)
        {
            var data = get1column(Questions.indexOf(question), JSON.parse(getSolutionjson() + ""));
            var ctx0 = document.getElementById("question" + (Questions.indexOf(question) - 1) + "data");
            var sum = data.dataPoints.reduce((a, b) => a + b, 0);
            ctx0.innerHTML = "<span><b>Question: </b>" + question.title + "</span > <br/>";
            ctx0.innerHTML += "<span><b>Anwser List: </b></span><br/>";
            data.label.forEach(function (l) {
                ctx0.innerHTML += "Value: \"" + l + " | ";
                ctx0.innerHTML += "Quality: " + data.dataPoints[data.label.indexOf(l)] + " | ";
                ctx0.innerHTML += "Percentage: " + (data.dataPoints[data.label.indexOf(l)] * 100 / sum).toFixed(2)+ "%\" ";
                ctx0.innerHTML += "</br>"
            });


            var ctx1 = document.getElementById("chart-pie" + question.qid.toString()).getContext('2d');
            var config1 = new chartdata(Questions.indexOf(question), "pie");         
            var chart1 = new Chart(ctx1, config1); 

            var ctx2 = document.getElementById("chart-bar" + question.qid.toString()).getContext('2d');
            var config2 = new chartdata(Questions.indexOf(question), "bar");
            var chart2 = new Chart(ctx2, config2); 

            var ctx3 = document.getElementById("chart-line" + question.qid.toString()).getContext('2d');
            var config3 = new chartdata(Questions.indexOf(question), "line");
            var chart3 = new Chart(ctx3, config3); 

            var ctx4 = document.getElementById("chart-radar" + question.qid.toString()).getContext('2d');
            var config4 = new chartdata(Questions.indexOf(question), "radar");
            var chart4 = new Chart(ctx4, config4); 

            var ctx5 = document.getElementById("chart-polarArea" + question.qid.toString()).getContext('2d');
            var config5 = new chartdata(Questions.indexOf(question), "polarArea");
            var chart5 = new Chart(ctx5, config5); 
        };
        
    });
}