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

function SolutionKoObject(objectsolution) {
    var temp_responses = [];
    objectsolution.responses.forEach(function (response) {
        temp_responses.push(responseObject(response));
    });
    return {
        index: objectsolution.index,
        questions: getQuestionsList(JSON.parse(getSurveyDatajson() + "")),
        responses: ko.observableArray(temp_responses)
    };
}