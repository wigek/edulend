document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM fully loaded and parsed");
    Init()
});

function Init(){
    const actionModal = document.querySelectorAll("a");

    const fondoFormulario = document.getElementById("registrarse-iniciar-sesion")

    actionModal.forEach(e => {
        e.addEventListener("click", e => {

            console.log(typeof(e.target.dataset.registrarse))

            if(e.target.dataset.registrarse == "true"){
                fondoFormulario.style.transform = 'translateX(-51%)';
            }
            else{
                fondoFormulario.style.transform = 'translateX(51%)';
            }
        })
    });
}