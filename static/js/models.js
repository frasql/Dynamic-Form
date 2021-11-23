export class Field {
    constructor(name, id, values=null, placeholder=null, class_html=null, style=null) {
        this._name = name
        this._id = id,
        this._values = values,
        this._placeholder = placeholder
        this._class_html = class_html
        this._style = style
    }
}


export class Input extends Field {
    constructor(name, id, value=null, placeholder="", class_html="input", style=null) {
        super(name, id, placeholder, style)
        this._value = value
        this._class_html = class_html
    }

    create(){
        let div_field = document.createElement("div");
        div_field.classList.add("field");
        // label input
        let label = document.createElement("label");
        label.innerHTML = this._name.capitalize();

        // control 
        let div_control = document.createElement("div")
        div_control.classList.add("control")
        // input
        let input = document.createElement("input");
        input.classList.add(this._class_html);
        // check placeholder
        if (this._placeholder) input.placeholder = this._placeholder;
        input.id = this._id;
        input.name = this._name;

        // inject value if exists
        if(this._value !== null){
            input.innerHTML = this._value;
            input.value = this._value;  
        } else{
            input.innerHTML = "";
            input.value = "";  
        }

        // loop through style attributes
        // append label and input to field
        div_control.appendChild(input);
      
        div_field.appendChild(label);
        div_field.appendChild(div_control);
        return div_field;
    }

    static addMeta(){
        let div_meta_card = document.createElement("div");
        div_meta_card.classList.add("card");

        let card_header = document.createElement("header");
        card_header.classList.add("card-header");

        let card_header_title = document.createElement("p");
        card_header_title.classList.add("card-header-title");
        card_header_title.innerHTML = "Metadata";

        card_header.appendChild(card_header_title);

        div_meta_card.appendChild(card_header);


        let div_card_content = document.createElement("div");
        div_card_content.classList.add("card-content");

        let html = `
            <div class='field'>
              <label class="subtitle" for="value">value</label>
              <div class='control'>
                <input class='input' id="meta-value"/>
              </div>
            </div>        
            <div class='field'>
              <label class="subtitle" for="id">id</label>
              <div class='control'>
                <input class='input' id="meta-id"/>
              </div>
            </div>
            <div class='field'>
              <label class="subtitle" for="placeholder">placeholder</label>
              <div class='control'>
                <input class='input' id="meta-placeholder"/>
              </div>
            </div>        
            <div class='field'>
              <label class="subtitle" for="type">type</label>
              <div class='control'>
                <input class='input' id="meta-type"/>
              </div>
            </div>
            <div class='field'>
              <label class="subtitle" for="class_html">class_html</label>
              <div class='control'>
                <input class='input' id="meta-class-html"/>
              </div>
            </div>
        ` 
        div_card_content.innerHTML = html;
        div_meta_card.appendChild(div_card_content);
        return div_meta_card;
    }

}

export class Select extends Field {
    constructor(name, id, values=null, class_html="select", style=null) {
        super(name, id, values, style) 
        this._class_html = class_html

    }

    create(){
        // field
        let div_field = document.createElement("div");
        div_field.classList.add("field");

        let select = document.createElement("select")
        select.classList.add("select");
        select.style.width = "100%";
        select.id = this._id;
        select.name = this._name;

        // label select
        let label = document.createElement("label");
        label.innerHTML = this._name.capitalize();

        // control
        let div_control = document.createElement("div");
        div_control.classList.add("control");


        if (this._values !== null){
            let fragment = new DocumentFragment();
            this._values.forEach(val =>{
                let option = document.createElement("option");
                option.id = val;
                option.value = val;
                option.innerHTML = val;
                fragment.appendChild(option);
            })
            // append options
            select.appendChild(fragment);

        }
        // append select
        div_control.appendChild(select);
        // append label
        div_field.appendChild(label);
        // append control
        div_field.appendChild(div_control);
        return div_field;
    }
}

export class Form {
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
export class UI {

    static buildForm(form, components) {

        let form_element = form.create();
        let components_el = [];

        components.forEach(component => {
            components_el.push(component.create());
        })

        components_el.forEach(component => {
            form_element.appendChild(component)
        })

        return form_element;
    }
}
