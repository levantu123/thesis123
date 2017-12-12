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

function answerObject(answer) {
    return {
        text: ko.observable(answer.text)
    }
}
function responseObject(response) {
    var temp_answers = [];
    response.answers.forEach(function (answer) {
        temp_answers.push(answerObject(answer));
    });
    return {
        answers: ko.observableArray(temp_answers)
    }
}

function getAllAnwserFromObSolution(objectsolution)
{
    return Array.prototype.concat.apply([], objectsolution.responses.map(r => r.answers));
}
function buildRowTemplateFromAllAnswers(Answers)
{
    var Questions = [];
    Answers.forEach(function (answer)
    {
        if (!Questions.includes(answer.qid))
        {
            Questions.push(answer.qid);
        }
    });
    return Questions;
}
function SolutionKoObject(objectsolution) {
    var temp_responses = [];
    objectsolution.responses.forEach(function (response) {
        temp_responses.push(responseObject(response));
    });
    var Sself= {
        index: objectsolution.index,
        responses: ko.observableArray(temp_responses)
    };
    return Sself;
}