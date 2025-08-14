function menuPrincipal(){
    console.clear();
    const option = prompt("Bienvenido a Edulend\n Selecciona un de las siguientes opciones \n 1. Registro de usuario \n 2. Inicio de sesión usuario \n 3. Olvidé la contraseña \n4. Inicio sesion como administrador \n Ingresa el número de la opción:")
    switch (option){
        case "1":
            registro();
            break;
        case "2":
            login();
            break;
        case "3":
            olvidoContraseña();
            break;
        case "4":
            loginadm();    
            break;
        default:
            alert("Ingresa una opción  válida");
            menuPrincipal();
    }
}

function registro(){
    console.clear();
    const nombre = prompt("Ingresa su nombre completo:");
    const email = prompt ("Ingresa tu correo electronico");
    const contraseña = prompt("Ingresa tu contraseña:");
    alert("Registro exitoso, Ya puedes iniciar sesión");
    menuPrincipal();
}

function login(){
    console.clear();
    const email= prompt("Ingresa tú correo electrónico");
    const contraseña= prompt("Ingresa tú contraseña");
    if (email && contraseña){
        dashboard();
    }
    alert("Credenciales incorrectas. Intentalo de nuevo");
    menuPrincipal();
}

function loginadm(){
    console.clear();
    const email= prompt("Ingresa tú correo electrónico");
    const contraseña= prompt("Ingresa tú contraseña");
    if (email && contraseña){
        dashboardadm();
    }
    alert("Credenciales incorrectas. Intentalo de nuevo");
    menuPrincipal();
}

function olvidoContraseña(){
    console.clear();
    const email = prompt("Ingresa el correo electrónico registrado");
    alert("Hemos enviado a tú correo electrónico tú nueva contraseña para iniciar sesión");
    menuPrincipal();
}

function dashboard(){
    console.clear();
    const opcion= prompt("Bienvenido al panel principal \n 1. Soliciar prestamo de articulo \n 2. Estado de prestamos \n 3. Datos de usuario \n 4. ¿Quienes somos? \n 5. Cerrar sesión \n Ingresa el número de la opción.")
        switch (opcion){
        case "1":
            solicitarPrestamo();
            break;
        case "2":
            estadoPrestamo();
            break;
        case "3":
            datosUsuario();
            break;
        case "4":
            quienesSomos();    
            break;
        case "5":
            menuPrincipal();
            break;
        default:
            alert("Ingresa una opción  válida");
            dashboard();
    }
}

function dashboardadm(){
    console.clear();
    const opcion= prompt("Bienvenido al panel principal como administrador  \n 1. Estado de prestamos \n 2. Recibo de equipos \n 3. Perfiles de usuario \n 4. Gestión de articulos \n 5. Inventario \n 6. Cerrar sesión \n Ingresa el número de la opción.")
        switch (option){
        case "1":
            estadoPrestamo();
            break;
        case "2":
            reciboEquipos();
            break;
        case "3":
            perfilesUsuario();
            break;
        case "4":
            gestionArticulos();    
            break;
        case "5":
            inventario();
            break;
        case "6":
            menuPrincipal();
        default:
            alert("Ingresa una opción  válida");
            dashboardadm();
    }
}

function solicitarPrestamo() {
    console.clear();
    const articulo = prompt("Ingrese el nombre del artículo que desea solicitar:");
    const dias = prompt("¿Por cuántos días desea el préstamo?");

    console.log(`El artículo: ${articulo} \n Para un tiempo de prestamo ${dias} días \n Por favor, espere confirmación del administrador. `);
    alert("Tu solicitud de préstamo ha sido registrada correctamente.");
    dashboard(); 
}

function estadoPrestamo() {
    console.clear();
    console.log("Estado de tus préstamos:");
    console.log("Portátil Dell: En uso, vence el 20/08/2025");
    console.log("Proyector Epson: Devuelto el 10/08/2025");
    console.log("Tablet Samsung: En revisión técnica");
    alert("Consulta realizada.");
    dashboard();
}

function datosUsuario() {
    console.clear();
    console.log("Datos de usuario");
    console.log("Nombre: Juan Pérez");
    console.log("Documento: CC 123456789");
    console.log("Correo: juanperez@email.com");
    console.log("Préstamos activos: 1");
    alert("Tus datos se han cargado");
    dashboard();
}

function quienesSomos() {
    console.clear();
    console.log("Somos Edulend, una plataforma educativa para gestionar el préstamo y control de artículos tecnológicos y educativos. \n Misión: Facilitar el acceso a equipos de aprendizaje \n Visión: Ser la plataforma líder de préstamos en instituciones. ");
    dashboard();
}

function reciboEquipos() {
    console.clear();
    console.log("Recibo de equipos:");
    console.log("Portátil Dell recibido el 12/08/2025");
    console.log("Proyector Epson pendiente de recibir");
    alert("Consulta realizada.");
    dashboardadm();
}

function perfilesUsuario() {
    console.clear();
    console.log("Perfiles de usuario:");
    console.log("1. Juan Pérez - Estudiante - Activo");
    console.log("2. Ana Torres - Profesor - Activo");
    console.log("3. Luis Gómez - Estudiante - Suspendido");
    alert("Perfiles cargados");
    dashboardadm();
}

function gestionArticulos() {
    console.clear();
    console.log("Gestión de artículos:");
    console.log("1. Agregar artículo");
    console.log("2. Editar artículo");
    console.log("3. Eliminar artículo");
    dashboardadm();
}

function inventario() {
    console.clear();
    console.log("Inventario de artículos:");
    console.log("10 Portátiles disponibles");
    console.log("5 Proyectores en préstamo");
    console.log("7 Tablets en mantenimiento");
    alert("Inventario.");
    dashboardadm();
}

window.onload = menuPrincipal;