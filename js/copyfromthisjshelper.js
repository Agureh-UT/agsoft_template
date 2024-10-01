// CreateElement Helper Function from https://dev.to/ahmedadel/custom-javascript-createelement-function-244f
let CreateElement= (initObj)=> {
  var element = document.createElement(initObj.Tag);
  for (var prop in initObj) {
      if (prop === "childNodes") {
          initObj.childNodes.forEach(function (node) { element.appendChild(node); });
      }
      else if (prop === "attributes") {
          initObj.attributes.forEach(function (attr) { element.setAttribute(attr.key, attr.value) });
      }
      else element[prop] = initObj[prop];
  }
  return element;
}

// USE CASE
let myElement = CreateElement(
  {
     Tag:'div',
     id:'myId',
     classList:'btn btn-danger',
     innerHTML:"<i class='fas fa-trash-alt'></i>",
    //  onchange:handleClientChange(obj=NULL),
     attributes:
     [
       {key:'customAttr1',value: 500},
       {key:'customAttr2',value: 'ABC'},
     ],
    //  childNodes: [nodeElement1 , nodeElement2]
  });

function handleClientChange(obj) {
  // console.log('text_content', obj.options[obj.selectedIndex].text);
  // console.log('value', obj.options[obj.selectedIndex].value);
  // alert(obj.options[obj.selectedIndex].value);
  let client_id = obj.options[obj.selectedIndex].value;
  let tr = $(obj).parent().parent().parent();
  // console.log('tr', tr);
  // let tr = $(this).parent().parent().parent();
  $(tr).find('.client_id').select2()
  $(tr).find('.costcentre_id').select2()
  $(tr).find('.budgetline_id').select2()
  $.ajax({
    url: `${JS_SITE_ROOT}projects/loadBgtlinesByClient`,
    method: 'POST',
    data: 'client_id=' + client_id,
    success: function(data) {
      // console.log(data);          
      tr.find(".costcentre_id").empty();
      data.costcentres.forEach(function(costcentre) {
        tr.find(".costcentre_id").append('<option value="' + costcentre.id + '">' + costcentre.name + '</option>');
      })
      tr.find(".budgetline_id").empty();
      data.budgetlines.forEach(function(budgetline) {
        tr.find(".budgetline_id").append('<option value="' + budgetline.id + '">' + budgetline.name + '</option>');
      })
    }
  })
}
document.addEventListener('DOMContentLoaded', function() {
  let table_body = document.getElementById("table_body");
  let add_button = document.getElementById("add_button");
  // EDIT  Section
  // counter.value = $(".budgetline_id").length;
  document.getElementById('counter').value = document.querySelectorAll(".budgetline_id").length;
  // $('.client_id').select2()
  // document.querySelectorAll('.client_id').forEach(functionForEach);
  console.log(table_body.children.length);
  // let df = new DocumentFragment();
  add_button.addEventListener("click", function() {
    let df = new DocumentFragment();
    /*
    Instead of above You can also refer to an external "named" function:e.g
    element.addEventListener("click", myFunction);
                function myFunction() {
                  alert ("Hello World!");
                 } 
    */
    let add_counter = parseInt(counter.value);
    add_counter++;
    counter.value = add_counter;
    let newTableRow = document.createElement('tr');
    newTableRow.setAttribute('data-id',add_counter);
    // counter
    // let add_counter = document.createElement('td');
    // add_counter.textContent = add_counter;
    // entry_id
    let td_1 = document.createElement('td');
    let td_1_input = document.createElement('input');
    td_1_input.setAttribute('class', 'form-control project_budgetline_id');
    td_1_input.setAttribute('type', 'hidden');
    td_1_input.setAttribute('id', 'project_budgetline_id_' + add_counter);
    td_1_input.setAttribute('name', 'project_budgetline_id_' + add_counter);
    td_1_input.setAttribute('value', '');
    td_1_input.setAttribute('readonly', '');
    td_1.appendChild(td_1_input);
    //    client_id
    let td_2 = document.createElement('td');
    let td_2_div_wrapper = document.createElement('div');
    td_2_div_wrapper.setAttribute('class', 'form-group');
    let td_2_label = document.createElement('label');
    td_2_label.setAttribute('class', 'control-label');
    td_2_label.setAttribute('for', 'client_id_' + add_counter);
    td_2_div_wrapper.appendChild(td_2_label);
    let td_2_select = document.createElement('select');
    td_2_select.setAttribute('class', 'form-control client_id');
    td_2_select.setAttribute('style', 'width:200px');
    td_2_select.setAttribute('id', 'client_id_' + add_counter);
    td_2_select.setAttribute('name', 'client_id_' + add_counter);
    td_2_select.setAttribute('onchange', 'handleClientChange(this)');
    let req = new Request(`${JS_SITE_ROOT}projects/clientsgetOptionsForForm`, {
      method: 'POST'
      // mode: 'cors'
    });
    fetch(req)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('BAD HTTP!');
        }
      })
      .then((jsonData) => {
        // console.log(jsonData);
        let options_df = new DocumentFragment();
        jsonData.options.forEach((option, index) => {
          // console.log(option);
          index++
          let optionTag = document.createElement('option');
          optionTag.setAttribute('value', option.id);
          optionTag.textContent = option.name;
          options_df.appendChild(optionTag);
        });
        td_2_select.appendChild(options_df);
        let client_id_element_main = document.getElementById('client_id');
        // td_2_select.options[td_2_select.selectedIndex].value = client_id_element_main.options[client_id_element_main.selectedIndex].value;
        td_2_select.value = client_id_element_main.options[client_id_element_main.selectedIndex].value;
      })
      .catch((err) => {
        console.log('ERROR:', err.message);
      });
    td_2_div_wrapper.appendChild(td_2_select);
    td_2.appendChild(td_2_div_wrapper);
    //    costcentre_id
    let td_3 = document.createElement('td');
    let costcentre_id_inputWrap = document.createElement('div');
    costcentre_id_inputWrap.setAttribute('class', 'form-group');
    let costcentre_id_label = document.createElement('label');
    costcentre_id_label.setAttribute('class', 'control-label');
    costcentre_id_label.setAttribute('for', 'costcentre_id_' + add_counter);
    costcentre_id_inputWrap.appendChild(costcentre_id_label);
    let costcentre_id_select = document.createElement('select');
    costcentre_id_select.setAttribute('class', 'form-control costcentre_id');
    costcentre_id_select.setAttribute('style', 'width:200px');
    costcentre_id_select.setAttribute('id', 'costcentre_id_' + add_counter);
    costcentre_id_select.setAttribute('name', 'costcentre_id_' + add_counter);
    //    budgetline_id
    let td_4 = document.createElement('td');
    let budgetline_id_inputWrap = document.createElement('div');
    budgetline_id_inputWrap.setAttribute('class', 'form-group');
    let budgetline_id_label = document.createElement('label');
    budgetline_id_label.setAttribute('class', 'control-label');
    budgetline_id_label.setAttribute('for', 'budgetline_id_' + add_counter);
    budgetline_id_inputWrap.appendChild(budgetline_id_label);
    let budgetline_id_select = document.createElement('select');
    budgetline_id_select.setAttribute('class', 'form-control budgetline_id');
    budgetline_id_select.setAttribute('style', 'width:200px');
    budgetline_id_select.setAttribute('id', 'budgetline_id_' + add_counter);
    budgetline_id_select.setAttribute('name', 'budgetline_id_' + add_counter);
    // Get client element values from Main client id at the top 
    let client_id_element = document.getElementById('client_id');
    let client_id = client_id_element.options[client_id_element.selectedIndex].value;
    // console.log('client_id', client_id);
    let form_data = new FormData();
    form_data.append('client_id', client_id);
    let costcentrereq = new Request(`${JS_SITE_ROOT}projects/loadBgtlinesByClient`, {
      method: 'POST',
      body: form_data
      // mode: 'cors'
    });
    fetch(costcentrereq)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('BAD HTTP!');
        }
      })
      .then((jsonData) => {
        // console.log(jsonData);
        let costcenter_options_df = new DocumentFragment();
        jsonData.costcentres.forEach((costcentre, index) => {
          // console.log(option);
          index++
          let costcenter_optionTag = document.createElement('option');
          costcenter_optionTag.setAttribute('value', costcentre.id);
          costcenter_optionTag.textContent = costcentre.name;
          costcenter_options_df.appendChild(costcenter_optionTag);
        });
        let options_df = new DocumentFragment();
        jsonData.budgetlines.forEach((budgetline, index) => {
          // console.log(option);
          index++
          let optionTag = document.createElement('option');
          optionTag.setAttribute('value', budgetline.id);
          optionTag.textContent = budgetline.name;
          options_df.appendChild(optionTag);
        });
        costcentre_id_select.appendChild(costcenter_options_df);
        budgetline_id_select.appendChild(options_df);
      })
      .catch((err) => {
        console.log('ERROR:', err.message);
      });
    costcentre_id_inputWrap.appendChild(costcentre_id_select);
    td_3.appendChild(costcentre_id_inputWrap);
    budgetline_id_inputWrap.appendChild(budgetline_id_select);
    td_4.appendChild(budgetline_id_inputWrap);
    // amount td
    let td_5 = document.createElement('td');
    let budgeted_amount_inputWrap = document.createElement('div');
    budgeted_amount_inputWrap.setAttribute('class', '');
    let budgeted_amount_label = document.createElement('label');
    budgeted_amount_label.setAttribute('class', 'control-label');
    budgeted_amount_label.setAttribute('for', 'budgeted_amount_' + add_counter);
    budgeted_amount_inputWrap.appendChild(budgeted_amount_label);
    let budgeted_amount_input = document.createElement('input');
    budgeted_amount_input.setAttribute('class', 'form-control budgeted_amount');
    budgeted_amount_input.setAttribute('type', 'number');
    budgeted_amount_input.setAttribute('id', 'budgeted_amount_' + add_counter);
    budgeted_amount_input.setAttribute('name', 'budgeted_amount_' + add_counter);
    budgeted_amount_input.setAttribute('value', '');
    budgeted_amount_inputWrap.appendChild(budgeted_amount_input);
    td_5.appendChild(budgeted_amount_inputWrap);
    //remove bnt td
    //appending all tds to the Tr
    newTableRow.appendChild(td_1);
    newTableRow.appendChild(td_2);
    newTableRow.appendChild(td_3);
    newTableRow.appendChild(td_4);
    newTableRow.appendChild(td_5);
    df.appendChild(newTableRow);
    table_body.appendChild(df);
    // document.querySelectorAll('.client_id').forEach(functionForEach);
    $('.client_id').select2()
    $('.costcentre_id').select2()
    $('.budgetline_id').select2()
  }); // add_button end here
  $('.client_id').select2()
  $('.costcentre_id').select2()
  $('.budgetline_id').select2()
});