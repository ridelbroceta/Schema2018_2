
/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/bootstrap/index.d.ts" />
/// <reference path="../../typings/jquery.validation/jquery.validation.d.ts" />

/// <reference path="home.ts" />
/// <reference path="../my-toastr-tools.ts" />


/*
https://toddmotto.com/attaching-event-handlers-to-dynamically-created-javascript-elements/

https://toddmotto.com/attaching-event-handlers-to-dynamically-created-javascript-elements/

https://www.codeproject.com/Tips/1168575/Ajax-methods-in-TypeScript

http://www.dotnetcurry.com/aspnet-mvc/939/typescript-knockoutjs-aspnet-mvc saving data in hidden fields
*/




window.onload = () => {

    var homeController = new Home.IndexAction('ridel');

    $('#btnMessage').click(() => {
        
        homeController.clickMeButton();
        alert('primero');
    });

    $('#btnWindow').click(() => {
        Tools.WindowModal.show('my-modal-container', 'my-test-modal', 'Home/_MyViewPartial', 'My Modal Window', 700, 800, null, null, true);
    });

    $('#btnSubmit').click(() => {

        if (!$('#myForm').valid()) {
            //toastr.info("Info Message", "Title");
            Tools.Toastr.show("Mal", Tools.ToastrTypeEnum.Error, "Error", 500);
        } else {
            alert('OK');
        }
    });

};