window.onload = function(){
    var element = document.getElementsByClassName("inputElement");
    for (let index = 0; index < element.length; index++) {
       element.item(index).addEventListener("focus",(element)=>{
           var elementSpan = element.target.nextElementSibling;
           elementSpan.style.top = '-6px';
       });

       element.item(index).addEventListener("blur",(element)=>{
           if (element.target.value == ""){
               var elementSpan = element.target.nextElementSibling;
               console.log(elementSpan);
                elementSpan.style.top = '16px';

           }
    });
        
    }
};

function entrar(elemten){
    elemten.target.parentElement.style.background = "#ff3f51";
    setTimeout(()=>{
        elemten.target.parentElement.style.background = "#bd1d2c";
    },
    200);

    var correo = document.getElementsByName("email")[0].value;
    var pass = document.getElementsByName("password")[0].value;

    if(correo === "" || pass === ""){

        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Llene todos los campos',
          });
    }
    else{
        firebase.auth().signInWithEmailAndPassword(correo, pass).catch(function(error) {
            
            var errorCode = error.code;

            if(errorCode == "auth/wrong-password"){
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: 'La contraseña no es correcta'
                  });
                  document.getElementById("pass").value = "";

            }
            else{
                if(errorCode == "auth/user-not-found"){
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: 'El usuario no existe'
                      });
                      document.getElementById("pass").value = "";
                      document.getElementById("email").value = "";
    
                }
                
            }
          });
    }


}