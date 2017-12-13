
function element(e) {
    return {
        newTask: new Task(e.type),
        allowNewTask: ko.observable(true),
        isEnabled: ko.observable(false),     
        selectedTask: ko.observable(),

        clearTask: function (data, event) {
            if (data === self.selectedTask()) {
                selectedTask(null);
            }

            if (data.name() === "") {
                menu_btns_list.remove(data);
            }
        },
        beforemove: function(data, event) {
            console.log("afterAdd invoked but this is still the loading template");
        },

        isTaskSelected: function (task) {
            return task === selectedTask();
        },

    }
}


function obsrequiredcontent(requiredcontent)
{
    return {
        used: ko.observable(requiredcontent.used),
        min: ko.observable(requiredcontent.min),
        max: ko.observable(requiredcontent.max),
        must: ko.observableArray(requiredcontent.must),
        mustnot: ko.observableArray(requiredcontent.mustnot)
    }
}



function btns() {
    return {
        menu_btns_list: [
            new element({ type: 'nbmultiple' }),
            new element({ type: 'nbdropdown' }),
            new element({ type: 'nbtextbox' }),
            new element({ type: 'nbparagraph' }),
            new element({ type: 'nbmultiple' })
        ],

    };
}
function ObjectKoMenu() {
    return {
        menu_btns_list: new btns().menu_btns_list
    }
}

