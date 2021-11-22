class Field {
    constructor(name, id, values=null, placeholder=null, class_html=null, style=null) {
        this._name = name
        this._id = id,
        this._values = values,
        this._placeholder = placeholder
        this._class_html = class_html
        this._style = style
    }
}


Object.defineProperty(String.prototype, 'capitalize', {
    value: function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    },
    enumerable: false
  });


class Input extends Field {
    constructor(name, id, values=null, placeholder=null, class_html="input", style=null) {
        super(id, values, placeholder, style)
        this._name = name
        this._class_html = class_html
    }

    create(){
        // field input
        let div_field = document.createElement("div");
        div_field.classList.add("field");
        // label input
        let label = document.createElement("label");
        label.innerHTML = this._name.capitalize();
        // input
        let input = document.createElement("input");
        input.classList.add("input")
        // loop through style attributes
        // append label and input to field
        div_field.appendChild(label);
        div_field.appendChild(input);
        return div_field;
    }

    stringify (x) {
        console.log(Object.prototype.toString.call(x));
    }
}

class Select extends Field {
    constructor(name, id, values=null, placeholder=null, class_html="select", style=null) {
        super(name, id, values, placeholder, class_html, style) 
    }
}

class Form {
    constructor(name, id, method="POST", action="#", form_class="form", style=null) {
        this._name = name
        this._id = id
        this._method = method
        this._action = action
        this._form_class = form_class
        this._style = style
    }

    create() {
        // create form
        let form = document.createElement("form");
        // add clas
        form.classList.add(this._form_class);
        //method
        form.method = this._method
        // action
        form.action = this._action
        // style
        return form;
    }
}


// UI 
class UI {

    static buildUI(form, components) {

        let form_element = form.create();
        let components_el = [components[0].create()];

        components_el.forEach(component => {
            form_element.appendChild(component)
        })

        return form_element;
    }
}


async function getData(url) {
    let h = new Headers();
    h.append("content-Type", "application/json");

    let options = {
        "method": "GET",
        "mode": "cors",
        "headers": h
    }

    let req = new Request(url, options);

    try {
        let response = await fetch(req);
        return response.json();
    }catch(e) {
        console.log(e)
    }
}



const formDOM = document.querySelector("#show-form");

document.addEventListener("DOMContentLoaded", async ()=> {
    getData("./form_schema.json").then( resp => {

        let data = resp["data"];
        let form_attributes = data["form"]["attributes"];
        let form_components = data["form"]["fields"]["components"];

        console.log(form_components[0])
    
    
        let form = new Form(form_attributes);
        // test with input
        let input = new Input(form_components[0].name);
        let ui = UI.buildUI(form, [input]);
        
        formDOM.appendChild(ui);

    })
})
