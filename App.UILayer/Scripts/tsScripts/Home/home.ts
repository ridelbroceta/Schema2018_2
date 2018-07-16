module Home
{
   
    export class IndexAction {

        _name: string;
        constructor(name) {
            this._name = name;
        }

        static welcome(person: string) {
            return "<h2>Hello " + person + ", Lets learn TypeScript</h2>";

        }

        private clickSecondButton() {
            alert('segundo');
        }

        clickMeButton() {
            let user: string = "MithunVP";

            document.getElementById("divMsg").innerHTML = '<div class="my-divs"></br><button id="btn-ridel" class="btn btn-primary my-btns">caca</button></br>' + IndexAction.welcome(user) + '</div>';

            $('#btn-ridel').click(() => {
               
                this.clickSecondButton();

            });

            
            // document.getElementById("my-btns").onclick = () => { alert('segundo'); };
        }

    }
}

