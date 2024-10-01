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
  let budgetlinestable_body = document.getElementById("budgetlinestable_body");
  let btnaddbudgetline = document.getElementById("btnaddbudgetline");
  // EDIT  Section
  // counter.value = $(".budgetline_id").length;
  document.getElementById('counter').value = document.querySelectorAll(".budgetline_id").length;
  // $('.client_id').select2()
  // document.querySelectorAll('.client_id').forEach(functionForEach);
  console.log(budgetlinestable_body.children.length);
  let df = new DocumentFragment();
  btnaddbudgetline.addEventListener("click", function() {
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
    let add_tr = document.createElement('tr');
    add_tr.setAttribute('data-id', '');
    // counter
    // let add_counter = document.createElement('td');
    // add_counter.textContent = add_counter;
    // entry_id
    let project_budgetline_td = document.createElement('td');
    let project_budgetline_input = document.createElement('input');
    project_budgetline_input.setAttribute('class', 'form-control project_budgetline_id');
    project_budgetline_input.setAttribute('type', 'hidden');
    project_budgetline_input.setAttribute('id', 'project_budgetline_id_' + add_counter);
    project_budgetline_input.setAttribute('name', 'project_budgetline_id_' + add_counter);
    project_budgetline_input.setAttribute('value', '');
    project_budgetline_input.setAttribute('readonly', '');
    project_budgetline_td.appendChild(project_budgetline_input);
    //    client_id
    let client_id_td = document.createElement('td');
    let client_id_inputWrap = document.createElement('div');
    client_id_inputWrap.setAttribute('class', 'form-group');
    let client_id_label = document.createElement('label');
    client_id_label.setAttribute('class', 'control-label');
    client_id_label.setAttribute('for', 'client_id_' + add_counter);
    client_id_inputWrap.appendChild(client_id_label);
    let client_id_select = document.createElement('select');
    client_id_select.setAttribute('class', 'form-control client_id');
    client_id_select.setAttribute('style', 'width:200px');
    client_id_select.setAttribute('id', 'client_id_' + add_counter);
    client_id_select.setAttribute('name', 'client_id_' + add_counter);
    client_id_select.setAttribute('onchange', 'handleClientChange(this)');
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
        client_id_select.appendChild(options_df);
        let client_id_element_main = document.getElementById('client_id');
        // client_id_select.options[client_id_select.selectedIndex].value = client_id_element_main.options[client_id_element_main.selectedIndex].value;
        client_id_select.value = client_id_element_main.options[client_id_element_main.selectedIndex].value;
      })
      .catch((err) => {
        console.log('ERROR:', err.message);
      });
    client_id_inputWrap.appendChild(client_id_select);
    client_id_td.appendChild(client_id_inputWrap);
    //    costcentre_id
    let costcentre_id_td = document.createElement('td');
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
    let budgetline_id_td = document.createElement('td');
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
    costcentre_id_td.appendChild(costcentre_id_inputWrap);
    budgetline_id_inputWrap.appendChild(budgetline_id_select);
    budgetline_id_td.appendChild(budgetline_id_inputWrap);
    // amount td
    let budgeted_amount_td = document.createElement('td');
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
    budgeted_amount_td.appendChild(budgeted_amount_inputWrap);
    //remove bnt td
    //appending all tds to the Tr
    add_tr.appendChild(project_budgetline_td);
    add_tr.appendChild(client_id_td);
    add_tr.appendChild(costcentre_id_td);
    add_tr.appendChild(budgetline_id_td);
    add_tr.appendChild(budgeted_amount_td);
    df.appendChild(add_tr);
    budgetlinestable_body.appendChild(df);
    // document.querySelectorAll('.client_id').forEach(functionForEach);
    $('.client_id').select2()
    $('.costcentre_id').select2()
    $('.budgetline_id').select2()
  }); // btnaddbudgetline end here
  $('.client_id').select2()
  $('.costcentre_id').select2()
  $('.budgetline_id').select2()
});