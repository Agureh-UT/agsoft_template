const table_body = document.getElementById("table_body");
const add_button = document.getElementById("add_button");
const client_id_element_main = document.getElementById('client_id');
const cells = document.querySelectorAll("select.client_id");
// const cells = document.getElementsByClassName("client_id");
const counter = document.querySelectorAll(".budgetline_id").length;
document.getElementById("counter").value = counter;
const urlFetchClients = `${JS_SITE_ROOT}templatehelper/clientsgetOptionsForForm`;
const urlFetchCostAndBudgetlines = `${JS_SITE_ROOT}templatehelper/loadBgtlinesByClient`;


const renderPosts = (jsonData,baseSelectNode) => {
  let options_array = jsonData.options;
  let df = _CN("");
  options_array.forEach((option) => {
    _CN("option", { value: option.id}, [option.name], df);    
  })
  baseSelectNode.appendChild(df);
  baseSelectNode.value = client_id_element_main.value;
  
  return baseSelectNode;
}

const renderOptionsForCostBudgetlines = (jsonData,baseSelectNode2,baseSelectNode3) => {
  let options_array1 = jsonData.costcentres;
  let options_array2 = jsonData.budgetlines;
  let df1 = _CN("");
  options_array1.forEach((option) => {
    _CN("option", { value: option.id}, [option.name], df1);    
  })
  baseSelectNode2.appendChild(df1);

  let df2 = _CN("");
  options_array2.forEach((option) => {
    _CN("option", { value: option.id}, [option.name], df2);    
  })
  baseSelectNode3.appendChild(df2);

  return [baseSelectNode2,baseSelectNode3];
}



function _CN(tag="", attr={}, childs=[], baseNode = null) {
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


function changeHandler(element) {
  console.log("change_event_target_element", element);
  let elementValue = element.value;
  let originalvalue = element.dataset.originalvalue ? element.dataset.originalvalue : "";

  // let originalvalue = element.dataset.originalvalue;
  console.log("elementValue1", elementValue);
  console.log("originalvalue", originalvalue);
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
  // let userInputs = [
  //   "client_id=" +elementValue,
  //   "originalvalue="+originalvalue
  // ];
  let userInputs = {
    "client_id": elementValue,
    "originalvalue": originalvalue
  };
  fetch(urlFetchCostAndBudgetlines, {
    method: 'POST',
    // body: new URLSearchParams(userInputs),
    body: new URLSearchParams(userInputs).toString(),
    headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" }
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
  let selectBlock1 = _CN("select", { class: "form-control client_id", id: `client_id_${newValue}`, name: `client_id_${newValue}`, style: 'width:200px', 'data-originalvalue': "" });
  fetch(urlFetchClients, {
    method: 'POST',
  })
  
  .then(res => res.json())
  .then(jsonData => renderPosts(jsonData,selectBlock1));
    _CN("td", { class: "p-3" }, [selectBlock1], tr);
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
    .then(jsonData => renderOptionsForCostBudgetlines(jsonData,selectBlock2,selectBlock3));
      _CN("td", { class: "p-3" }, [selectBlock2], tr);
      _CN("td", { class: "p-3" }, [selectBlock3], tr);
    //END  
  _CN("td", { class: "p-3" }, [_CN("input", { type: 'number', value: '', class: "form-control budgeted_amount", id: `budgeted_amount_${newValue}`, name: `budgeted_amount_${newValue}` })], tr);
  _CN("td", { class: "p-3" }, [_CN("button", { type: 'button', class: "form-control btn btn-danger btn-sm remove_button", id: `remove_${newValue}`, name: `remove_${newValue}` }, [_CN("span", { class: "fas fa-times" })])], tr);
  // table_body.appendChild(tr);
  document.getElementById("counter").value = newValue;
}


// for (var i = 0; i < cells.length; i++) {
//   console.log("clientCell",cells[i]);
//     cells[i].addEventListener('change', chnghndler);
// }

// Listen to events for dynamically added elements using vanilla JavaScript
// for (var i = 0; i < cells.length; i++) {
  document.addEventListener("change", (event) => {
	if(event.target && event.target.classList.contains("client_id")){
		// target element
    let element = event.target;
    // changeHandler(event.target);
    changeHandler(element);
	}
});
// document.addEventListener('DOMContentLoaded', function () {
//   $('.client_id').select2();
//   $('.costcentre_id').select2();
//   $('.budgetline_id').select2();
// });