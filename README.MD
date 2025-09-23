

📘 EduLend – Frontend
📌 Descripción

EduLend es una plataforma web orientada a la gestión de préstamos de equipos estudiantiles (libros, portátiles, tabletas).
Este repositorio contiene el frontend del proyecto, desarrollado en HTML, CSS y JavaScript bajo un enfoque MVC simplificado, para mantener un orden claro entre vistas, lógica y recursos estáticos.

🚀 Tecnologías utilizadas

HTML5 – Estructura de las vistas.

CSS3 / TailwindCSS – Estilos y diseño responsivo.

JavaScript (ES6+) – Interactividad y animaciones del DOM.

Animate.css – Animaciones predefinidas.


📂 Estructura del proyecto
Proyecto/
│
├── controllers/       
├── models/            
├── views/             # Páginas HTML (dashboard, perfiles, inventario, etc.)
│
├── public/
│   ├── css/           # Estilos personalizados
│   ├── js/            # Scripts (animaciones, gráficos, navbar activo)
│
├── index.html         # Página principal / Login
├── .gitignore         # Archivos ignorados en Git
└── README.md          # Documentación del proyecto

⚙️ Instalación y uso

Clonar el repositorio:

git clone https://github.com/wigek/edulend.git


Abrir el proyecto en tu editor (VSCode recomendado).

Iniciar un servidor local (ejemplo con VSCode Live Server).


Abrir en el navegador:

http://localhost:5500/index.html

🖼️ Vistas principales

index.html / Logout – Acceso al sistema.

dashboard.html – Resumen general con métricas y gráficas.

lend_state.html – Seguimiento de préstamos por usuario.

receive_item,html – Registro de devoluciones.



✨ Funcionalidades

Interfaz responsiva y moderna con TailwindCSS.

Navbar dinámica con resaltado de la vista activa.

Animaciones con Animate.css para mejorar la UX.

Organización modular de recursos según patrón MVC.

📌 Estado del proyecto

🚧 En desarrollo: actualmente se trabaja en la integración de las vistas y animaciones. Futuro objetivo: conectar el frontend con una API backend.

👨‍💻 Autores

Carlos Perez
Alejandra Alvarez
Jean Medina
Wilder García 