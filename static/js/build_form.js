import { createComponent } from "./fetcher.js";
import {Input} from './models.js';

const new_field_name = document.querySelector("#field-name");
const new_field_type = document.querySelector("#field-node-name");
const btn_add_field = document.querySelector("#add-new-field");
const btn_add_meta = document.querySelector('#add-meta');
const div_field_meta = document.querySelector('#field-meta');


// if button meta was clicked fetch post with metadata, else only with node_name and name
let add_meta_was_clicked = false;

function download(content, fileName, contentType) {
    var file = new Blob([content], {type: contentType});

    browser.downloads.download({
    url: URL.createObjectURL(file),
    filename: fileName,
    saveAs: false,
    })
}


const addFields = (url, new_field_type, new_field_name) => {
    createComponent(url, new_field_type, new_field_name)
    .then(resp =>{console.log(resp)})
    .catch(err =>{console.log(err)})
}


btn_add_field.addEventListener("click", ()=>{

    if (!add_meta_was_clicked){
        try {
            console.log(new_field_type.value, new_field_name.value);
    
            let data = addFields("http://localhost:4001/api/create_component", new_field_type.value, new_field_name.value);
            console.log(data)
        } catch(e){
            throw new Error(e);
        }
    } else {
        const meta_value = document.querySelector("#meta-value");
        const meta_id = document.querySelector("#meta-id");
        const meta_placeholder = document.querySelector("#meta-placeholder");
        const meta_type = document.querySelector("#meta-type");
        const meta_class_html = document.querySelector("#meta-class-html");
        
    }
})

btn_add_meta.addEventListener("click", (e)=>{
    alert(e.target.nodeName);
    let card_meta = Input.addMeta();
    div_field_meta.classList.remove("is-hidden");
    div_field_meta.appendChild(card_meta);
    add_meta_was_clicked = true;
})