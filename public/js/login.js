document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed");
    Init();
});

function Init() {
    const fondoFormulario = document.getElementById("registrarse-iniciar-sesion");
    const actionModal = document.querySelectorAll("a");

    actionModal.forEach(a => {
        a.addEventListener("click", e => {
            if (e.target.dataset.registrarse === "true") {
                fondoFormulario.style.transform = "translateX(-51%)";
            } else if (e.target.dataset.registrarse === "false") {
                fondoFormulario.style.transform = "translateX(51%)";
            }

            
            if (e.target.dataset.show) {
                document.querySelector(`#${e.target.dataset.show}`).showModal();
            } else if (e.target.dataset.hidde) {
                document.querySelector(`#${e.target.dataset.hidde}`).close();
            }
        });
    });

   
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1550,
        timerProgressBar: true,
        didOpen: toast => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    const formLogin = document.querySelectorAll(".formulario")[0];
    formLogin.addEventListener("submit", e => {
        e.preventDefault();

        const usuario = formLogin.querySelector('input[name="usuario"]').value;
        const contrasenia = formLogin.querySelector('input[name="contasenia"]').value;

        localStorage.removeItem("usuarioActual");
        
        const usuarioGuardado = JSON.parse(localStorage.getItem(usuario));
       
        if (usuarioGuardado && usuario === usuarioGuardado.email && contrasenia === usuarioGuardado.contrasenia) {
            Toast.fire({
                icon: "success",
                title: "Inicio de sesión exitoso",
                text: "Bienvenido a EduLend, " + usuario
            });

            localStorage.setItem("usuarioActual", usuarioGuardado.email);

            setTimeout(() => {
                window.location.href = "/views/user_lend.html";
            }, 1600);
        } 
        else if (usuario.includes("admin") && contrasenia.includes("admin")) {
            Toast.fire({
                icon: "success",
                title: "Inicio de sesión exitoso",
                text: "Bienvenido a EduLend, " + usuario
            });
            setTimeout(() => {
                document.location.replace("/views/dashboard.html");
            }, 1600);
        }         
        else {
            Toast.fire({
                icon: "error",
                title: "Usuario o contraseña incorrectos"
            });
        }
    });


    const formRegistro = document.querySelectorAll(".formulario")[1];
    formRegistro.addEventListener("submit", e => {
        e.preventDefault();
        debugger;
        const nombre = formRegistro.querySelector('input[name="nombre"]').value;
        const email = formRegistro.querySelector('input[name="email"]').value;
        const cedula = formRegistro.querySelector('input[name="cedula"]').value;
        const celular = formRegistro.querySelector('input[name="celular"]').value;
        const contrasenia = formRegistro.querySelector('input[name="contasenia"]').value;

        const usuario = { nombre, email, cedula, celular, contrasenia };

        if (localStorage.getItem(email)) {
            Swal.fire({
                icon: "error",
                title: "Error de registro",
                text: "El correo electrónico ya está registrado",
                confirmButtonText: "Aceptar"
            });
            return;
        }

        localStorage.setItem(email, JSON.stringify(usuario));

        Swal.fire({
            icon: "success",
            title: "Registro exitoso",
            text: "Ahora puedes iniciar sesión con tus datos",
            confirmButtonText: "Aceptar"
        });

        formRegistro.reset();
        fondoFormulario.style.transform = "translateX(51%)"; // vuelve al login
    });
}
