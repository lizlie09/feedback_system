//JAVASCRIPT CODE HERE
function submitBday() {
    var Q4A = "";
    var Bdate = document.getElementById('birthdate').value;
    var Bday = +new Date(Bdate);
    alert(Bdate)
    Q4A += "" + ~~((Date.now() - Bday) / (31557600000));
    var theBday = document.getElementById('age');
    theBday.value = Q4A;
}

// function getAge(DOB) {
//     var today = new Date();
//     var birthDate = new Date(DOB);
//     var age = today.getFullYear() - birthDate.getFullYear();
//     var m = today.getMonth() - birthDate.getMonth();
//     if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
//         age = age - 1;
//     }
//     return age;
// }

//ACCEPT ONLY NUMBER
function onlyNumberKey(evt) { 
    // Only ASCII charactar in that range allowed 
    var ASCIICode = (evt.which) ? evt.which : evt.keyCode 
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) 
        return false; 
    return true; 
} 
//CHECK FORM
function checkForm2(form) {
    var validation = 0;
    if (form.password.value != form.newPassword.value) {
        alert('Password does not match')
        return false;
    }
    return true;
}

//ALLOW NUMBERS AND DOT
function fun_AllowOnlyAmountAndDot(txt)
{
    if(event.keyCode > 47 && event.keyCode < 58 || event.keyCode == 46)
    {
        var txtbx=document.getElementById(txt);
        var amount = document.getElementById(txt).value;
        var present=0;
        var count=0;

        if(amount.indexOf(".",present)||amount.indexOf(".",present+1));
        {
        // alert('0');
        }

        /*if(amount.length==2)
        {
        if(event.keyCode != 46)
        return false;
        }*/
        do
        {
        present=amount.indexOf(".",present);
        if(present!=-1)
        {
            count++;
            present++;
            }
        }
        while(present!=-1);
        if(present==-1 && amount.length==0 && event.keyCode == 46)
        {
            event.keyCode=0;
            //alert("Wrong position of decimal point not  allowed !!");
            return false;
        }

        if(count>=1 && event.keyCode == 46)
        {

            event.keyCode=0;
            //alert("Only one decimal point is allowed !!");
            return false;
        }
        if(count==1)
        {
        var lastdigits=amount.substring(amount.indexOf(".")+1,amount.length);
        if(lastdigits.length>=2)
                    {
                        //alert("Two decimal places only allowed");
                        event.keyCode=0;
                        return false;
                        }
        }
            return true;
    }
    else
    {
            event.keyCode=0;
            //alert("Only Numbers with dot allowed !!");
            return false;
    }

}