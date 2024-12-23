$(".contact_btn").on('click', function () {

    $(".contact_btn i").removeClass('d-none');

    var post_data, output;
    var proceed = "true";

    var str = $('#contact-form-data').serializeArray();

    $('#contact-form-data input').each(function() {
        if(!$(this).val()){
            proceed = "false";
        }
    });

    if (proceed === "true") {

        var pathArray = window.location.pathname.split('/');
        var secondLevelLocation = pathArray[3];

        var accessURL;
        if(secondLevelLocation){
            accessURL="../vendor/contact-mailer.php";
        }else{
            accessURL="vendor/contact-mailer.php";
        }
        $.ajax({
            type: 'POST',
            url: accessURL,
            data: str,
            dataType: 'json',
            success: function (response) {
                if (response.type == 'error') {
                    output = '<div class="alert-danger" style="padding:10px 15px; margin-bottom:30px;">' + response.text + '</div>';
                } else {
                    output = '<div class="alert-success" style="padding:10px 15px; margin-bottom:30px;">' + response.text + '</div>';
                    $('.contact-form input').val('');
                    $('.contact-form textarea').val('');
                }

                if ($("#result").length) {
                    $("#result").hide().html(output).slideDown();
                    $(".contact_btn i").addClass('d-none');
                }else{
                    if (response.type == 'error') {
                        Swal.fire({
                            type: 'error',
                            icon: 'error',
                            title: 'Oops...',
                            html: '<div class="text-danger">'+ response.text +'</div>',
                        })
                        $(".contact_btn i").addClass('d-none');
                    }else{
                        Swal.fire({
                            type: 'success',
                            icon: 'success',
                            title: 'Success!',
                            html: '<div class="text-success">'+ response.text +'</div>',
                        })
                        $(".contact_btn i").addClass('d-none');
                    }
                }
            },
            error: function () {
                alert("Failer");
            }
        });

    }
    else
    {
        if ($("#result").length) {
            output = '<div class="alert-danger" style="padding:10px 15px; margin-bottom:30px;">Please provide the missing fields.</div>';
            $("#result").hide().html(output).slideDown();
            $(".contact_btn i").addClass('d-none');
        }else{
            Swal.fire({
                icon: 'error',
                type: 'error',
                title: 'Oops...',
                html: '<div class="text-danger">Please provide the missing fields.</div>'
            })
            $(".contact_btn i").addClass('d-none');
        }

    }


});




$(".modal_contact_btn").on('click', function () {

    $(".modal_contact_btn i").removeClass('d-none');

    var post_data, output;
    var proceed = "true";

    var str=$('#modal-contact-form-data').serializeArray();

    $('#modal-contact-form-data input').each(function() {
        if(!$(this).val()){
            proceed = "false";
        }
    });

    if (proceed === "true") {
        var pathArray = window.location.pathname.split('/');
        var secondLevelLocation = pathArray[3];

        var accessURL;
        if(secondLevelLocation){
            accessURL="../vendor/contact-mailer.php";
        }else{
            accessURL="vendor/contact-mailer.php";
        }
        $.ajax({
            type : 'POST',
            url : accessURL,
            data : str,
            dataType: 'json',
            success: function(response) {
                if (response.type == 'error') {
                    output = '<div class="alert-danger" style="padding:10px 15px; margin-bottom:30px;">' + response.text + '</div>';
                } else {
                    output = '<div class="alert-success" style="padding:10px 15px; margin-bottom:30px;">' + response.text + '</div>';
                    $('.contact-form input').val('');
                    $('.contact-form textarea').val('');
                }


                if ($("#quote_result").length) {
                    $("#quote_result").hide().html(output).slideDown();
                    $(".modal_contact_btn i").addClass('d-none');
                }else{
                    if (response.type == 'error') {
                        Swal.fire({
                            type: 'error',
                            icon: 'error',
                            title: 'Oops...',
                            html: '<div class="text-danger">'+ response.text +'</div>',
                        })
                        $(".modal_contact_btn i").addClass('d-none');
                    }else{
                        Swal.fire({
                            type: 'success',
                            icon: 'success',
                            title: 'Success!',
                            html: '<div class="text-success">'+ response.text +'</div>',
                        })
                        $(".modal_contact_btn i").addClass('d-none');
                    }
                }

            },
            error: function () {
                alert("Failer");
            }
        });

    }
    else {

        if ($("#quote_result").length) {
            output = '<div class="alert-danger" style="padding:10px 15px; margin-bottom:30px;">Please provide the missing fields.</div>';
            $("#quote_result").hide().html(output).slideDown();
            $(".modal_contact_btn i").addClass('d-none');
        }else{
            Swal.fire({
                icon: 'error',
                type: 'error',
                title: 'Oops...',
                html: '<div class="text-danger">Please provide the missing fields.</div>'
            })
            $(".modal_contact_btn i").addClass('d-none');
        }
    }

});