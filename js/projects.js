$(document).ready(function() {

  // Start  Javascript
  // EDIT  Section
  $('#client_id').trigger('change');
  counter.value = $(".budgetline_id").length;
  $('.client_id').select2()
  $('.costcentre_id').select2()
  $('.budgetline_id').select2()
  $(".client_id").on('change', function() {
    var client_id = this.value;
    var tr = $(this).parent().parent().parent();
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
  })

  // Edit ends here
  // Add new starts here
  $(document).on('click', '.btnaddbudgetline', function() {
    var Itemcounterr = parseInt(counter.value);
    Itemcounterr++;
    counter.value = Itemcounterr;

    var html = '';

    html += '<tr>';
    //requisition_item_id Make sure the value of the name attribute is referenced correctly and as per the forloop in respective Ctroller
    html +=
      '<td><input type="hidden" id="project_budgetline_id_' + Itemcounterr + '" name="project_budgetline_id_' + Itemcounterr + '" value=""/></td>';
    // client
    html +=
      '<td><?= FH::selectBlock('', "client_id_'+Itemcounterr+'", '', $this->clients, ['class' => 'client_id', 'style' => 'width:200px'], [], []) ?></td>';
    // costcentre
    html +=
      '<td><?= FH::selectBlock('', "costcentre_id_'+Itemcounterr+'", '', [], ['class' => 'costcentre_id', 'style' => 'width:200px'], [], []) ?></td>';
    // Budgetline
    html +=
      '<td><?= FH::selectBlock('', "budgetline_id_'+Itemcounterr+'", '', [], ['class' => 'form-control budgetline_id', 'style' => 'width:200px'], ['class' => 'from-group'], []) ?> </td>';
    // budgeted_amount input Div
    html +=
      '<td><?= FH::inputBlock('number', '', "budgeted_amount_'+Itemcounterr+'", '', ['class' => 'form-control budgeted_amount', 'step' => 'any', '' => ''], [], []) ?> </td > ';

    // btnremoveProduct Div
    html +=
      '<td><div class= "pt-4"><center><button type="button" name="removebudgetline_' + Itemcounterr + '" class="btn btn-danger btn-sm btnremovebudgetline"><span class="fas fa-times"></span></button><center></td></div></center>';
    html +=
      '</tr>';
    $('#budgetlinestable').append(html);
    //get newly added row client id value
    var newTR_client_id = $("#client_id_" + Itemcounterr);
    //on change of top client_id (that of the project), you change value of client_id on join table
    $("#client_id").on('change', function() {
      newTR_client_id.prop('value', $(this).prop('value'));
      newTR_client_id.trigger('change');
    })

    $('#client_id').trigger('change');

    //Initialize Select2 Elements
    $('.client_id').select2()
    $('.costcentre_id').select2()
    $('.budgetline_id').select2()
    $(".client_id").on('change', function() {

      var client_id = this.value;
      var tr = $(this).parent().parent().parent();
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


    })

    newTR_client_id.trigger('change');



  }) // btnaddbudgetline end here


  $(document).on('click', '.btnremovebudgetline', function() {

    $(this).closest('tr').remove();

  }) // btnremove end here


});