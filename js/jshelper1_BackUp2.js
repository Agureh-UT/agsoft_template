// CreateElement Helper Function from https://dev.to/ahmedadel/custom-javascript-createelement-function-244f
let CreateElement = (initObj) => {
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
    url: `${JS_SITE_ROOT}templatehelper/loadBgtlinesByClient`,
    method: 'POST',
    data: 'client_id=' + client_id,
    success: function (data) {
      // console.log(data);          
      tr.find(".costcentre_id").empty();
      data.costcentres.forEach(function (costcentre) {
        tr.find(".costcentre_id").append('<option value="' + costcentre.id + '">' + costcentre.name + '</option>');
      })
      tr.find(".budgetline_id").empty();
      data.budgetlines.forEach(function (budgetline) {
        tr.find(".budgetline_id").append('<option value="' + budgetline.id + '">' + budgetline.name + '</option>');
      })
    }
  })
}
document.addEventListener('DOMContentLoaded', function () {
  let table_body = document.getElementById("table_body");
  let add_button = document.getElementById("add_button");
  let client_id_element_main = document.getElementById('client_id');
  // console.log(table_body.children.length);
  // console.log(document.querySelectorAll(".budgetline_id").length);
  let counter = document.querySelectorAll(".budgetline_id").length;
  document.getElementById("counter").value = counter;
  add_button.addEventListener("click", function () {
    let df = new DocumentFragment();
    counter++;
    document.getElementById("counter").value = counter;
    let newTableRow = document.createElement('tr');
    newTableRow.setAttribute('data-id', counter);
    //  td 1 
    let td_1_input = CreateElement(
      {
        Tag: 'input',
        type: 'hidden',
        id: 'project_budgetline_id_' + counter,
        name: 'project_budgetline_id_' + counter,
        classList: 'form-control project_budgetline_id',
        value: '',
        readonly: '',
        // attributes:
        //   [
        //     { key: 'customAttr1', value: 500 },
        //     { key: 'customAttr2', value: 'ABC' },
        //   ],
      });

    let td_1 = CreateElement(
      {
        Tag: 'td',
        childNodes: [td_1_input]
      });
    newTableRow.appendChild(td_1);
    // td_2
    // td_2_options (getoptions for select via fetch api)
    let req = new Request(`${JS_SITE_ROOT}templatehelper/clientsgetOptionsForForm`, {
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
        console.log(jsonData.options.length);
        let options_df = new DocumentFragment;
        for (var count = 0; count < jsonData.options.length; count++) {
          var optionTag = CreateElement(
            {
              Tag: 'option',
              value: jsonData.options[count].id,
              textContent: jsonData.options[count].name,
            });
          options_df.appendChild(optionTag);
        }
        // td_2_select
        let td_2_select = CreateElement(
          {
            Tag: 'select',
            id: 'client_id_' + counter,
            // value: document.getElementById('client_id').value,
            name: 'client_id_' + counter,
            style: 'width:200px',
            classList: 'form-control client_id',
            childNodes: [options_df]
          });
        // td_2_label
        let td_2_label = CreateElement(
          {
            Tag: 'label',
            classList: 'control-label',
            attributes:
              [
                { key: 'for', value: 'client_id_' + counter }
              ]
          });
        //td_2_div_wrapper
        let td_2_div_wrapper = CreateElement(
          {
            Tag: 'div',
            classList: 'form-group',
            childNodes: [td_2_label, td_2_select]
          });
        // td_2
        let td_2 = CreateElement(
          {
            Tag: 'td',
            childNodes: [td_2_div_wrapper]
          });
        newTableRow.appendChild(td_2);
        td_2_select.value = client_id_element_main.value;
        $('.client_id').select2()
      })
      .catch((err) => {
        console.log('ERROR:', err.message);
      });
    // TD 3
    // td_3_options (getoptions for select via fetch api)
    let form_data = new FormData();
    form_data.append('client_id', client_id_element_main.value);
    let costcentrereq = new Request(`${JS_SITE_ROOT}templatehelper/loadBgtlinesByClient`, {
      method: 'POST',
      body: form_data
      // mode: 'cors'
    });
    fetch(costcentrereq).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('BAD HTTP!');
      }
    })
      .then((jsonData) => {
        // cost_centre_options build
        console.log(jsonData.costcentres.length);
        let costcenter_options_df = new DocumentFragment;
        for (var count = 0; count < jsonData.costcentres.length; count++) {
          var optionTag = CreateElement(
            {
              Tag: 'option',
              value: jsonData.costcentres[count].id,
              textContent: jsonData.costcentres[count].name,
            });
          costcenter_options_df.appendChild(optionTag);
        }

        // budgetlines_options_build since they are fetched at once
        console.log(jsonData.budgetlines.length);
        let budgetlines_options_df = new DocumentFragment;
        for (var count = 0; count < jsonData.budgetlines.length; count++) {
          var budgetlines_optionTag = CreateElement(
            {
              Tag: 'option',
              value: jsonData.budgetlines[count].id,
              textContent: jsonData.budgetlines[count].name,
            });
          budgetlines_options_df.appendChild(budgetlines_optionTag);
        }
        // td_3_select
        let td_3_select = CreateElement(
          {
            Tag: 'select',
            id: 'costcentre_id_' + counter,
            name: 'costcentre_id_' + counter,
            style: 'width:200px',
            classList: 'form-control costcentre_id',
            childNodes: [costcenter_options_df]
          });
        // td_3_label
        let td_3_label = CreateElement(
          {
            Tag: 'label',
            classList: 'control-label',
            attributes:
              [
                { key: 'for', value: 'costcentre_id_' + counter }
              ]
          });
        //td_3_div_wrapper
        let td_3_div_wrapper = CreateElement(
          {
            Tag: 'div',
            classList: 'form-group',
            childNodes: [td_3_label, td_3_select]
          });
        // td_3
        let td_3 = CreateElement(
          {
            Tag: 'td',
            childNodes: [td_3_div_wrapper]
          });
        newTableRow.appendChild(td_3);
        $('.costcentre_id').select2()

        // TD 4
        // td_4_select
        let td_4_select = CreateElement(
          {
            Tag: 'select',
            id: 'budgetline_id_' + counter,
            name: 'budgetline_id_' + counter,
            style: 'width:200px',
            classList: 'form-control budgetline_id',
            childNodes: [budgetlines_options_df]
          });
        // td_4_label
        let td_4_label = CreateElement(
          {
            Tag: 'label',
            classList: 'control-label',
            attributes:
              [
                { key: 'for', value: 'budgetline_id_' + counter }
              ]
          });
        //td_4_div_wrapper
        let td_4_div_wrapper = CreateElement(
          {
            Tag: 'div',
            classList: 'form-group',
            childNodes: [td_4_label, td_4_select]
          });
        // td_4
        let td_4 = CreateElement(
          {
            Tag: 'td',
            childNodes: [td_4_div_wrapper]
          });
        newTableRow.appendChild(td_4);
        $('.budgetline_id').select2()
      })
      .catch((err) => {
        console.log('ERROR:', err.message);
      });
      
    // TD 5 budgeted amount
    // td_5_label
    let td_5_label = CreateElement(
      {
        Tag: 'label',
        classList: 'control-label',
        attributes:
          [
            { key: 'for', value: 'budgeted_amount_' + counter }
          ]
      });

    let td_5_input = CreateElement(
      {
        Tag: 'input',
        type: 'number',
        id: 'budgeted_amount_' + counter,
        name: 'budgeted_amount_' + counter,
        classList: 'form-control budgeted_amount',
        value: ''
      });

    
    //td_5_div_wrapper
    let td_5_div_wrapper = CreateElement(
      {
        Tag: 'div',
        classList: 'form-group',
        childNodes: [td_5_label, td_5_input]
      });

    let td_5 = CreateElement(
      {
        Tag: 'td',
        childNodes: [td_5_div_wrapper]
      });
    
    
      newTableRow.appendChild(td_5);



    // TD 6

    df.appendChild(newTableRow);
    table_body.appendChild(df);
    // document.querySelectorAll('.client_id').forEach(functionForEach);
    // $('.client_id').select2()
  }); // add_button end here
  $('.client_id').select2()
  $('.costcentre_id').select2()
  $('.budgetline_id').select2()
});