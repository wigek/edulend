document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("formularioEntrega").addEventListener("submit", function(event) {
    event.preventDefault(); // evitar que se cierre automáticamente

    const fecha = document.getElementById("fechaEntrega").value;
    let mensaejeFecha = "Fecha de entrega ingresada: " + fecha;

    document.getElementById("msjEntrega").close();
    enviarFormulario(event, "Entrega realizada", mensaejeFecha)
  });

  document.getElementById("formularioProrroga").addEventListener("submit", function(event) {
    event.preventDefault(); // evitar que se cierre automáticamente

    const fecha = document.getElementById("fechaProrroga").value;
    let mensaejeFecha = "Fecha de prorroga ingresada: " + fecha

    document.getElementById("msjProrroga").close();
    enviarFormulario(event, "Prorroga realizada", mensaejeFecha)
  });


  function enviarFormulario(e, mensaje, mensaejeFecha) {
      Swal.fire({
          title: mensaje,
          text: mensaejeFecha,
          icon: "success",
          draggable: true
      });

      e.target.reset();
  }

});
