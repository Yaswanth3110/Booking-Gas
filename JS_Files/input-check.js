const arr=[false,false] ;
$(document).ready(()=>{
    $("#check").click(()=>
    {
        if($("#password").attr("type") == "password")
        {
            $("#password").attr("type","text") ;
            $("#check").text("visibility");
        }
        else
        {
            $("#password").attr("type","password") ;
            $("#check").text("visibility_off");
        }
    })
    $("#emailid").blur(() => {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test($("#emailid").val())) {
            $("#email_check").css({
                "visibility": "visible",
                "color": "green"
            }).text("check");

            $("#email_label").css("color", "green").text("Valid Email");
            arr[0] = true;
        } else {
            $("#email_check").css({
                "visibility": "visible",
                "color": "red"
            }).text("close");
            $("#email_label").css("color", "red").text("Invalid Email");
            arr[0] = false;
        }
    });

    $("#password").blur(() => {
        if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/.test($("#password").val())) {

            $("#password_label").css("color", "green").text("Valid Password");
            arr[1] = true;
        } else {
            $("#password_label").css("color", "red").text("Invalid Password");
            arr[1] = false;
        }
    });
});

function login_validate()
{
if(arr.every((k)=> k ))
{
    return true;
}
else
{
    return false;
}
}