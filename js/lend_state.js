document.getElementById("formularioEntrega").addEventListener("submit", function(event) {
      event.preventDefault(); // evitar que se cierre automáticamente
      const fecha = document.getElementById("fechaEntrega").value;
      alert("Fecha de entrega ingresada: " + fecha);
      document.getElementById("msjEntrega").close();
    });

document.getElementById("formularioProrroga").addEventListener("submit", function(event) {
      event.preventDefault(); // evitar que se cierre automáticamente
      const fecha = document.getElementById("fechaProrroga").value;
      alert("Fecha de prorroga ingresada: " + fecha);
      document.getElementById("msjProrroga").close();
    });