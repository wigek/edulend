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
}