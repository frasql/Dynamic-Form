from pydantic import BaseModel
from typing import Optional, List, Dict, Union


class FormAttributes(BaseModel):
    name: str
    id: str
    method: str = "POST"
    action: str = "#"
    class_form: str = "form"
    style: Optional[Dict[str, str]]


class InputComponent(BaseModel):
    node_name: str
    name: str
    id: Optional[Union[int, str]]  
    value: Optional[str]
    placeholder: Optional[str]
    type: Optional[str] = "text"
    class_html: Optional[str] = "input"
    style: Optional[Dict[str, str]]

class SelectComponent(BaseModel):
    node_name: str
    name: str
    id: Optional[Union[int, str]]  
    values: Optional[List[str]]
    type: Optional[str]
    class_html: Optional[str] = "input"
    style: Optional[Dict[str, str]]

class FormFields(BaseModel):
    components: Union[InputComponent, SelectComponent]

class FormButton(BaseModel):
    name: str
    id: Optional[Union[int, str]]  
    class_html: Optional[str] = "button"  
    type: Optional[str] = "submit"
    text: Optional[str] = "Submit"
    style: Optional[Dict[str, str]]  



class Form(BaseModel):
    attributes: FormAttributes
    fields: Union[FormFields, FormButton] 

    
