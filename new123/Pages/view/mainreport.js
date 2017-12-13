﻿$(function ()
{

    infuser.defaults.templateUrl = "../../Pages/view/templates";
    ko.bindingHandlers.visibleAndSelect = {
        update: function (element, valueAccessor)
        {
            ko.bindingHandlers.visible.update(element, valueAccessor);
            if (valueAccessor())
            {
                setTimeout(function ()
                {
                    $(element).find("input").focus().select();
                }, 0);
                //new tasks are not in DOM yet
            }
        }
    };




    ko.applyBindings(
        {
            isEditable: ko.observable(true),          
            items4: solution,          
            whichTemplateToUse5: function ()
            {
                return 'Report';
            }
        });

})