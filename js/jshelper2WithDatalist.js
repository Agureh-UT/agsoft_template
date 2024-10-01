const table_body = document.getElementById("table_body");
const add_button = document.getElementById("add_button");
const client_id_element_main = document.getElementById('hidden_client_id');
// const cells = document.querySelectorAll("select.client_id");
// const cells = document.getElementsByClassName("client_id");
const counter = document.querySelectorAll(".budgetline_id").length;
document.getElementById("counter").value = counter;
const urlFetchClients = `${JS_SITE_ROOT}templatehelper/clientsgetOptionsForForm`;
const urlFetchCostAndBudgetlines = `${JS_SITE_ROOT}templatehelper/loadBgtlinesByClient`;
// Get textContents for inputs with datalist options 
const inputsWithDatalist = document.querySelectorAll("input[list]");
// for (var i = 0; i < inputsWithDatalist.length; i++) {
//   var input = inputsWithDatalist[i];
//   // input.disabled;
//   console.log("inputWithDatalist", input);
//   var idAttributeForDatalist = input.list;
//   console.log("idAttributeForDatalist", idAttributeForDatalist);
//   //   get datalist div and options
//   // let respectiveDatalistDivOPtions = document.querySelectorAll(`datalist#${idAttributeForDatalist} option`);
//   var respectiveDatalistDivOPtions = idAttributeForDatalist.children;
//   for (var i = 0; i < respectiveDatalistDivOPtions.length; i++) {
//     var respectiveDatalistDivOPtion = respectiveDatalistDivOPtions[i];
//     console.log("respectiveDatalistDivOPtion", respectiveDatalistDivOPtion);
//     if (input.nextElementSibling.value === respectiveDatalistDivOPtion.dataset.value) {
//       input.value = respectiveDatalistDivOPtion.textContent;
//       //if we find a match, break our for loop
//       break;

//     }
//   }

// }

// document.addEventListener("change", (event) => {
// 	if(event.target && event.target.classList.contains("client_id")){
// 		// target element
//     let element = event.target;
//     // changeHandler(event.target);
//     changeHandler(element);
// 	}
// });
function showList(input){
  // var input = element;
  console.log("inputWithDatalist",input);
  var idAttributeForDatalist = input.list;
  input.value="";
  // var idAttributeForDatalist = input.getAttribute("list");
  // console.log("idAttributeForDatalist",idAttributeForDatalist);
  //   get datalist div and options
  // var respectiveDatalist = document.querySelector(`datalist#${idAttributeForDatalist}`);
  idAttributeForDatalist.style.display = "block";
  idAttributeForDatalist.style.display = "none";
  // idAttributeForDatalist.setAttribute('style', "display:block;");
  // idAttributeForDatalist.setAttribute('style', "display:none;");
  
  // input.removeEventListener("click", showList,false);
  
}

function handleChange(input){
  // var input = element;
  console.log("inputWithDatalist",input);
  // var idAttributeForDatalist = input.list;
  var idAttributeForDatalist = input.getAttribute("list");
  // console.log("idAttributeForDatalist",idAttributeForDatalist);
  //   get datalist div and options
  let respectiveDatalistDivOPtions = document.querySelectorAll(`datalist#${idAttributeForDatalist} option`);
  // var respectiveDatalistDivOPtions = idAttributeForDatalist.children;
  for (var i = 0; i < respectiveDatalistDivOPtions.length; i++) {
    var respectiveDatalistDivOPtion = respectiveDatalistDivOPtions[i];
    console.log("respectiveDatalistDivOPtion",respectiveDatalistDivOPtion);
    if (respectiveDatalistDivOPtion.textContent === input.value) {
      // input.nextElementSibling.value = respectiveDatalistDivOPtion.getAttribute("data-value");
      input.nextElementSibling.value = respectiveDatalistDivOPtion.dataset.value;
      //if we find a match, break our for loop
      break;

    }
  }

  // input.removeEventListener("change", handleChange,false);
  
}
for (var i = 0; i < inputsWithDatalist.length; i++) {
  var input = inputsWithDatalist[i];
  // input.disabled;
  // input.addEventListener("click",showList);
  // input.addEventListener("change",handleChange);

  document.addEventListener("click", (event) => {
	if(event.target && event.target==input){
    let element = event.target;
    showList(element);
    
	}
  });

  document.addEventListener("change", (event) => {
    if(event.target && event.target==input){
      let element = event.target;
      handleChange(element);
      // element.blur();
    }
    });
  // input.blur();
  // input.parentElement.focus();
  input.blur();
}
// Get value for hiddeninputs from datalist options 
// let inputsWithDatalist = document.querySelectorAll("input[list]");
// for (var i = 0; i < inputsWithDatalist.length; i++) {
//   var input = inputsWithDatalist[i];
//   // input.disabled;
//   // console.log("inputWithDatalist",input);
//   // var idAttributeForDatalist = input.list;
//   var idAttributeForDatalist = input.getAttribute("list");
//   // console.log("idAttributeForDatalist",idAttributeForDatalist);
//   //   get datalist div and options
//   let respectiveDatalistDivOPtions = document.querySelectorAll(`datalist#${idAttributeForDatalist} option`);
//   // var respectiveDatalistDivOPtions = idAttributeForDatalist.children;
//   for (var i = 0; i < respectiveDatalistDivOPtions.length; i++) {
//     var respectiveDatalistDivOPtion = respectiveDatalistDivOPtions[i];
//     console.log("respectiveDatalistDivOPtion",respectiveDatalistDivOPtion);
//     if (respectiveDatalistDivOPtion.textContent === input.value) {
//       // input.nextElementSibling.value = respectiveDatalistDivOPtion.getAttribute("data-value");
//       input.nextElementSibling.value = respectiveDatalistDivOPtion.dataset.value;
//       //if we find a match, break our for loop
//       // break;

//     }
//   }

// }
//_CN(Create Node Function)
function _CN(tag = "", attr = {}, childs = [], baseNode = null) {
  if (tag === "") {
    var el = document.createDocumentFragment()
  }
  else {
    var el = document.createElement(tag);
  }
  if (typeof attr === 'object') {
    for (var a in attr)
      el.setAttribute(a, attr[a]);
  }
  if (Array.isArray(childs)) {
    childs.forEach(child => {
      el.appendChild((typeof child === "string" || typeof child === "number") ? document.createTextNode(child) : child);
    });
  }
  if (baseNode !== null) {
    baseNode.appendChild(el);
  }

  return el;
}

const renderPosts = (jsonData, baseSelectNode) => {
  let options_array = jsonData.options;
  let df = _CN("");
  options_array.forEach((option) => {
    _CN("option", { value: option.id }, [option.name], df);
  })
  baseSelectNode.appendChild(df);
  baseSelectNode.value = client_id_element_main.value;

  return baseSelectNode;
}

const renderOptionsForCostBudgetlines = (jsonData, baseSelectNode2, baseSelectNode3) => {
  let options_array1 = jsonData.costcentres;
  let options_array2 = jsonData.budgetlines;
  let df1 = _CN("");
  options_array1.forEach((option) => {
    _CN("option", { value: option.id }, [option.name], df1);
  })
  baseSelectNode2.appendChild(df1);

  let df2 = _CN("");
  options_array2.forEach((option) => {
    _CN("option", { value: option.id }, [option.name], df2);
  })
  baseSelectNode3.appendChild(df2);

  return [baseSelectNode2, baseSelectNode3];
}




function changeHandler(element) {
  console.log("change_event_target_element", element);
  let elementValue = element.value;
  console.log("elementValue", elementValue);
  let parent = element.closest('tr');
  console.log("parentElementOnChange", parent);
  let bgtlineEl = parent.querySelector('.budgetline_id');
  let cstCEl = parent.querySelector('.costcentre_id');
  // then clear contents of the above 2 select divs and replace with fetch api data when using this for the options. Access the api data using the elementValue above 
  while (bgtlineEl.firstChild) {
    bgtlineEl.removeChild(bgtlineEl.firstChild);
  }
  while (cstCEl.firstChild) {
    cstCEl.removeChild(cstCEl.firstChild);
  }
  console.log("costcentreDiv", cstCEl);
  console.log("budgetlineDiv", bgtlineEl);
  // now that option array contents of the above 2 select divs are cleared, replace with fetch api data when using this for the options. Access the api data using the elementValue above 
  let form_data = new FormData();
  form_data.append('client_id', elementValue);
  fetch(urlFetchCostAndBudgetlines, {
    method: 'POST',
    body: form_data
  })
    .then(res => res.json())
    .then(jsonData => renderOptionsForCostBudgetlines(jsonData, cstCEl, bgtlineEl));



}
// add new TR
add_button.addEventListener("click", addNewRow);

function addNewRow() {
  newValue = parseInt((document.getElementById("counter")).value) + 1;
  let tr = _CN("tr", { "data-id": `${newValue}` }, [], table_body);
  _CN("td", { class: "p-3" }, [_CN("input", { type: 'hidden', value: '', readonly: 'readonly', class: "form-control project_budgetline_id", id: `project_budgetline_id_${newValue}`, name: `project_budgetline_id_${newValue}` })], tr);
  //SELECT1 START
  let selectBlock1 = _CN("select", { class: "form-control client_id", id: `client_id_${newValue}`, name: `client_id_${newValue}`, onchange: 'changeHandler(this)', style: 'width:200px' });
  fetch(urlFetchClients, {
    method: 'POST',
  })
    .then(res => res.json())
    .then(jsonData => renderPosts(jsonData, selectBlock1));
  _CN("td", { class: "p-3" }, [_CN("label", { class: "control-label", for: `client_id_${newValue}` }), selectBlock1], tr);
  //END  

  //SELECT2&3 START    
  let selectBlock2 = _CN("select", { class: "form-control costcentre_id", id: `costcentre_id_${newValue}`, name: `costcentre_id_${newValue}`, style: 'width:200px' });
  let selectBlock3 = _CN("select", { class: "form-control budgetline_id", id: `budgetline_id_${newValue}`, name: `budgetline_id_${newValue}`, style: 'width:200px' });
  let form_data = new FormData();
  form_data.append('client_id', client_id_element_main.value);
  fetch(urlFetchCostAndBudgetlines, {
    method: 'POST',
    body: form_data
  })
    .then(res => res.json())
    .then(jsonData => renderOptionsForCostBudgetlines(jsonData, selectBlock2, selectBlock3));
  _CN("td", { class: "p-3" }, [_CN("label", { class: "control-label", for: `costcentre_id_${newValue}` }), selectBlock2], tr);
  _CN("td", { class: "p-3" }, [_CN("label", { class: "control-label", for: `budgetline_id_${newValue}` }), selectBlock3], tr);
  //END  
  _CN("td", { class: "p-3" }, [_CN("label", { class: "control-label", for: `budgeted_amount_${newValue}` }), _CN("input", { type: 'number', value: '', class: "form-control budgeted_amount", id: `budgeted_amount_${newValue}`, name: `budgeted_amount_${newValue}` })], tr);
  _CN("td", { class: "px-3 py-4" }, [_CN("label", { class: "control-label", for: `remove_${newValue}` }), _CN("button", { type: 'button', class: "form-control btn btn-danger btn-sm remove_button mt-3", id: `remove_${newValue}`, name: `remove_${newValue}` }, [_CN("span", { class: "fas fa-times" })])], tr);
  // table_body.appendChild(tr);
  document.getElementById("counter").value = newValue;

  $('.client_id').select2();
  $('.costcentre_id').select2();
  $('.budgetline_id').select2();
}

$('.client_id').select2();
$('.costcentre_id').select2();
$('.budgetline_id').select2();
// document.addEventListener('DOMContentLoaded', function () {
//   $('.client_id').select2();
//   $('.costcentre_id').select2();
//   $('.budgetline_id').select2();
// });