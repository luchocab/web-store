/**
 * Created by lucho on 29/3/17.
 */
function login(){
    $.ajax({
        data:{
            username: $("#name").val(),
            password: $("#password").val()
        },
        url: '/login',
        type: 'POST',
        timeout: 1000,
        success:  function (response) {
            location.reload();
            $("#login-alert").show().fadeTo(2000, 500).slideUp(500, function(){
                $("#login-alert").slideUp(500);
            });
        }
    });
}

function logout(){
    $.ajax({
        url: '/logout',
        type: 'GET',
        timeout: 1000,
        success:  function (response) {
            location.href = '/';
            $("#logout-alert").show().fadeTo(2000, 500).slideUp(500, function(){
                $("#logout-alert").slideUp(500);
            });
        }
    });
}