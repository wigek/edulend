document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM fully loaded and parsed");
    Init()
});

function Init(){
    const fondoFormulario = document.getElementById("registrarse-iniciar-sesion")
    const actionModal = document.querySelectorAll("a");

    actionModal.forEach(e => {
        e.addEventListener("click", e => {

            if(e.target.dataset.registrarse == "true"){
                fondoFormulario.style.transform = 'translateX(-51%)';
            }
            else{
                fondoFormulario.style.transform = 'translateX(51%)';
            }

            if(e.target.dataset.show){
                document.querySelector(`#${e.target.dataset.show}`).showModal()
            }
            else if(e.target.dataset.hidde){
                document.querySelector(`#${e.target.dataset.hidde}`).close();
            }
        })
    });

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    const formulario = document.querySelector('.formulario');

    formulario.addEventListener('submit', function(event) {
        event.preventDefault();

        const usuario = document.querySelector('input[name="usuario"]').value;
        const contrasenia = document.querySelector('input[name="contasenia"]').value;

        if (usuario == "admin"  && contrasenia == "admin"){ 
            document.location.replace("dashboard.html")
        } else if (usuario == "usuario"  && contrasenia == "usuario") {
            document.location.replace("contact_us.html")
        } else {
            Toast.fire({
                icon: "error",
                title: "Usuario incorrecto"
            });

        }
    });
}