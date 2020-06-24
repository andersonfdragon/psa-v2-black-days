$(document).ready(function(){
    $("#aceptar_terminos_popUp").click(function(){
      $('.bs-example-modal').modal('hide');
      $("input[type='checkbox']").attr('checked',':checked');
    });
});

//FORMULARIO DE CONTACTO - ENVIAR DESDE FORMULARIO CONTACTO PC
$("#contactForm").validator().on("submit", function (event) {
    var valido_form_01 = 0;

    if (event.isDefaultPrevented("Complete este campo")) {
        // handle the invalid form...
        submitMSG(false, "Complete los campos que faltan.");
    } else {
        event.preventDefault();
        submitMSG(true, "");
        valido_form_01 = 1;
    }

    //Checkbox
    if ($("#checkbox").is(':checked') === false){
        submitMSG_condiciones(false, "Aún no acepta terminos y condiciones.");
    }else {
        event.preventDefault();
        submitMSG_condiciones(true, "");
        valido_check = 1;
    }

    //Validacion final
    if ((valido_form_01)&&(valido_check) === 1) {
        event.preventDefault();
        submitForm();
    }else {
        submitMSG(false, "Complete los campos que faltan");
    }
});



function submitMSG(valid, msg){
    if(valid){
        var msgClasses = "h4 text-center text-warning";
    } else {
        var msgClasses = "h4 text-center text-danger";
    }
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
}

function submitMSG_condiciones(valid, msg){
    if(valid){
        var msgClasses = "h4 text-center text-warning tx_form_error";
    } else {
        var msgClasses = "h4 text-center text-danger tx_form_error";
    }
    $("#msgSubmit_condiciones").removeClass().addClass(msgClasses).text(msg);
}

function formSuccess(){
    $("#contactForm")[0].reset();
    submitMSG(true, "Gracias por dejar sus datos, pronto estaremos en contacto.")
}

function submitForm(){
    // Initiate Variables With Form Content
    var empresa = $("#empresa").val();
    var first_name = $("#first_name").val();
    var telephone = $("#telephone").val();
    var email = $("#email").val();

    $.ajax({
        type: "POST",
        url:  "pruebas-2020-bw/php/process_formulario_black_week_02.php",
        data: "empresa=" + empresa +
              "&first_name=" + first_name +
              "&telephone=" + telephone +
              "&email=" + email,

        success: function(text){
            if (text == "success"){
                formSuccess();
                window.location.href = "mensaje_enviado_formulario_black_week.html";
            } else {
                submitMSG_paso_02(false,text);
            }
        }
    });
}
