/// <reference path="../typings/jquery/jquery.d.ts" />
/*
https://toddmotto.com/attaching-event-handlers-to-dynamically-created-javascript-elements/

https://toddmotto.com/attaching-event-handlers-to-dynamically-created-javascript-elements/
*/
var HomeController = (function () {
    function HomeController(name) {
        this._name = name;
    }
    HomeController.prototype.welcome = function (person) {
        return "<h2>Hello " + person + ", Lets learn TypeScript</h2>";
    };
    HomeController.prototype.clickSecondButton = function () {
        alert('segundo');
    };
    HomeController.prototype.clickMeButton = function () {
        var user = "MithunVP";
        document.getElementById("divMsg").innerHTML = '<div class="my-divs"></br><button id="btn-ridel" class="btn btn-primary my-btns" onClick="React.clickSecondButton()">caca</button></br>' + this.welcome(user) + '</div>';
        // document.getElementById("my-btns").onclick = () => { alert('segundo'); };
    };
    return HomeController;
}());
/*function Welcome(person: string) {
    return "<h2>Hello " + person + ", Lets learn TypeScript</h2>";
}

function ClickMeButton() {
    let user: string = "MithunVP";
    document.getElementById("divMsg").innerHTML = Welcome(user);
}*/
window.onload = function () {
    //window.homeController = new HomeController('ridel');  bad idea
    //var homeController = new HomeController('ridel'); 
    //document.addEventListener("click", (event: MouseEvent) => {
    //    let target: Element = (event.currentTarget as Element);
    //    let idAttr: string = target.id;
    //    if ($(this).attr('id') == 'btn-ridel') alert('segundo');
    //});
    var homeController = new HomeController('ridel');
    window.React = homeController;
    $('#btnMessage').click(function () {
        homeController.clickMeButton();
        alert('primero');
    });
};
//# sourceMappingURL=app.js.map