firebase.auth().onAuthStateChanged(function(user) {

    var direccion = window.location.pathname;

    if (user) {

        if (direccion == "/dash_queplan/login.html") {

            Swal.fire({

                type: 'success',
                title: 'Bienvenido ' + user.email,
                timer: 1500,
                showConfirmButton: false,
                onClose: () => {

                    window.location = "/dash_queplan/";
                }
            });


        }

    } else {

        if (direccion == "/dash_queplan/") 
            window.location = "/dash_queplan/login.html";

    }
});

function salir() {

    Swal.fire({
        title: '¿Quieres cerrar sesión?',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.value) {
            firebase.auth().signOut().then(function() {}).catch(function(error) {
                // An error happened.
            });
        }
      });
    

    
}