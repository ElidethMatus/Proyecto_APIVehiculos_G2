# Proyecto_APIVehiculos
Conversión de precios de vehículos a diferentes monedas según la API externa.
Sistema de Gestión de Autolote

Este proyecto consiste en el desarrollo de un sistema web para la gestión de un autolote, el cual permite administrar vehículos, usuarios, ventas y consultas. Además, el sistema incorpora autenticación segura mediante JSON Web Tokens (JWT), permitiendo proteger rutas y controlar el acceso según los usuarios registrados.

El sistema está dividido en dos partes principales: un backend desarrollado con Node.js y Express, encargado de la lógica del sistema y la conexión con la base de datos, y un frontend desarrollado con Angular, que proporciona la interfaz de usuario y se comunica con la API mediante peticiones HTTP.

La estructura del proyecto está organizada de la siguiente manera: una carpeta config donde se encuentra la configuración de la base de datos, una carpeta middleware que contiene la lógica de autenticación mediante JWT, una carpeta routes donde se definen todas las rutas de la API como usuarios, vehículos y autenticación, una carpeta sql con los scripts de base de datos, y una carpeta frontend que contiene la aplicación Angular. Además, el archivo principal del backend es app.js, y se incluyen archivos como package.json y .env para la configuración general.

Para el desarrollo del backend se utilizaron tecnologías como Node.js, Express.js, MySQL, jsonwebtoken para la autenticación, bcrypt para la encriptación de contraseñas, dotenv para el manejo de variables de entorno y cors para permitir la comunicación entre frontend y backend. En el frontend se utilizó Angular junto con TypeScript y HttpClient para realizar las peticiones a la API.

El sistema implementa autenticación mediante JWT. El usuario inicia sesión utilizando su nombre de usuario y contraseña, y si las credenciales son correctas, el sistema genera un token que debe ser enviado en las siguientes peticiones protegidas. Este token se envía en los headers de las solicitudes con el formato: Authorization: Bearer TOKEN. De esta manera, el middleware del backend verifica la validez del token antes de permitir el acceso a las rutas protegidas.

Para instalar el proyecto, primero se debe clonar el repositorio y ubicarse en la carpeta principal. Luego se instalan las dependencias del backend con el comando npm install. Posteriormente, se debe crear un archivo .env en la raíz del proyecto donde se configuren variables como el puerto del servidor, las credenciales de la base de datos y la clave secreta para JWT. Un ejemplo de configuración incluye variables como PORT, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME y JWT_SECRET_KEY.

Para ejecutar el backend, se utiliza el comando nodemon app.js o node app.js, lo cual levantará el servidor en la dirección http://localhost:3000
. Para ejecutar el frontend, se debe ingresar a la carpeta frontend, instalar sus dependencias con npm install y luego ejecutar ng serve -o, lo que abrirá automáticamente la aplicación en el navegador en la dirección http://localhost:4200
.

La comunicación entre frontend y backend se realiza mediante peticiones HTTP hacia la API. En el frontend se define una URL base como http://localhost:3000/api
, y a partir de ella se construyen las rutas, por ejemplo, para el login se utiliza la ruta /api/auth/login. El frontend utiliza servicios de Angular para consumir estas rutas y manejar la respuesta del servidor.

Entre los endpoints principales del sistema se encuentran los de autenticación, como POST /api/auth/login y POST /api/auth/Registro. También existen endpoints protegidos para la gestión de usuarios como GET /api/usuarios, GET /api/usuarios/:id, PUT /api/usuarios/:id y DELETE /api/usuarios/:id. De igual manera, se manejan endpoints para vehículos como GET, POST, PUT y DELETE bajo la ruta /api/vehiculos.

Para probar el funcionamiento del sistema se pueden utilizar herramientas como Postman o KeyRunner. Por ejemplo, para iniciar sesión se realiza una petición POST a http://localhost:3000/api/auth/login
 enviando un JSON con username y password. Si la autenticación es correcta, se obtiene un token que posteriormente se debe enviar en el header Authorization para acceder a las rutas protegidas.

La base de datos utilizada es MySQL, con una base llamada autolote_db. Entre las tablas principales se encuentran Usuarios, Vehiculos, Ventas, Consultas y Prueba_Manejo. La tabla Usuarios contiene campos como idUsuarios, Nombre, Apellido, Correo, Password, Rol, Telefono, Estado y Username.

En cuanto a la seguridad, el sistema utiliza bcrypt para almacenar las contraseñas de forma encriptada, JWT para la autenticación de usuarios, middleware para proteger rutas y dotenv para evitar exponer información sensible en el código.

Entre los problemas comunes que se pueden presentar están errores de rutas incorrectas, por ejemplo cuando no se incluye el prefijo /api, errores de CORS que se solucionan habilitando el middleware correspondiente en el backend, y problemas con el token cuando no se envía correctamente en los headers.

Actualmente el proyecto cuenta con un backend completamente funcional, autenticación mediante JWT, operaciones CRUD para usuarios y vehículos, y un frontend conectado al backend. Como mejoras futuras se propone implementar control de roles más avanzado, mejorar la interfaz gráfica, aplicar eliminación lógica de registros, agregar validaciones más robustas y desarrollar un dashboard administrativo más completo.

Este proyecto fue desarrollado como parte de práctica académica en el área de desarrollo de aplicaciones web, integrando tecnologías modernas tanto en el frontend como en el backend.