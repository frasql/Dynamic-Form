import {UI, Form, Input, Select} from './models.js';
import {getData} from './fetcher.js'


Object.defineProperty(String.prototype, 'capitalize', {
    value: function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    },
    enumerable: false
  });

const formDOM = document.querySelector("#show-form");

document.addEventListener("DOMContentLoaded", async ()=> {
    getData("http://localhost:4001/api/serve_json").then( resp => {

        let data = resp["data"];
        let form_attributes = data["form"]["attributes"];
        let form_components = data["form"]["fields"]["components"];
    
    
        let form = new Form(form_attributes);
        // test with input
        
        let components = []; 

        form_components.forEach(component =>{
            if (component.node_name === "input"){
                let field = new Input(component.name, component.id, component.value, component.placeholder, component.class_html);
                components.push(field);
            } 
            else if (component.node_name === "select"){
                let field = new Select(component.name, component.id, component.values, component.class_html);
                components.push(field);

            }
        })
        
        let ui = UI.buildForm(form, components);
        
        formDOM.appendChild(ui);
    })
})
