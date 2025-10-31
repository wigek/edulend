
 (function () {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });; // reemplaza con tu clave pública
  })();

  // Configurar Toast
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: toast => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  // Envío del formulario
  document.getElementById("formContacto").addEventListener("submit", function (e) {
    e.preventDefault();

    Toast.fire({
      icon: "info",
      title: "Enviando mensaje..."
    });

   
    const formData = Object.fromEntries(new FormData(this).entries());

    // Convierte a objeto legible
    const TEMPLATE_PARAMS = {
        name: formData.name,
        email: formData.email,
        tel: formData.tel
    };
    
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, TEMPLATE_PARAMS)
      .then(() => {
        Toast.fire({
          icon: "success",
          title: "Mensaje enviado correctamente 🎉"
        });
        e.target.reset();
      })
      .catch((error) => {
        Toast.fire({
          icon: "error",
          title: "Error al enviar mensaje 😕"
        });
        console.error("Error:", error);
      });
  });