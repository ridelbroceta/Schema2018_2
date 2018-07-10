/// <reference path="../typings/jquery/jquery.d.ts" />

/*
https://toddmotto.com/attaching-event-handlers-to-dynamically-created-javascript-elements/

https://toddmotto.com/attaching-event-handlers-to-dynamically-created-javascript-elements/
*/


class HomeController {

    _name: string;
    constructor(name) {
        this._name = name;
    }

    welcome(person: string) {
        return "<h2>Hello " + person + ", Lets learn TypeScript</h2>";

    }

    clickSecondButton() {
        alert('segundo');
    }

    clickMeButton() {
        let user: string = "MithunVP";
        document.getElementById("divMsg").innerHTML = '<div class="my-divs"></br><button id="btn-ridel" class="btn btn-primary my-btns" onClick="React.clickSecondButton()">caca</button></br>' + this.welcome(user) + '</div>';
       // document.getElementById("my-btns").onclick = () => { alert('segundo'); };
    }

}

interface Window {
    React: HomeController;
}

/*function Welcome(person: string) {
    return "<h2>Hello " + person + ", Lets learn TypeScript</h2>";
}

function ClickMeButton() {
    let user: string = "MithunVP";
    document.getElementById("divMsg").innerHTML = Welcome(user);
}*/


window.onload = () => {
    //window.homeController = new HomeController('ridel');  bad idea
    //var homeController = new HomeController('ridel'); 
    //document.addEventListener("click", (event: MouseEvent) => {
    //    let target: Element = (event.currentTarget as Element);
    //    let idAttr: string = target.id;


    //    if ($(this).attr('id') == 'btn-ridel') alert('segundo');
    //});

    var homeController = new HomeController('ridel');

    window.React = homeController;

    $('#btnMessage').click(() => {
        
        homeController.clickMeButton();
        alert('primero');
    });

};