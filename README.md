# Proyecto_APIVehiculos
Breve descripción
El presente proyecto consiste en el desarrollo de un sistema web para la gestión de un autolote. El sistema permite administrar información relacionada con usuarios, clientes, vehículos y ventas. Asimismo, incorpora mecanismos de autenticación y control de acceso, además de una funcionalidad adicional de conversión de precios a moneda extranjera mediante el uso de una API externa.
Arquitectura del sistema
El sistema está basado en una arquitectura cliente-servidor, organizada en tres componentes principales:
Frontend
Desarrollado en Angular, se encarga de la interfaz de usuario, la captura de datos mediante formularios y la visualización de la información. Además, realiza peticiones HTTP al backend para consumir los servicios de la API.
Backend
Desarrollado con Node.js y Express, es responsable de la lógica del sistema. Gestiona las rutas de la API, procesa las solicitudes del frontend, realiza validaciones, implementa la autenticación y establece la comunicación con la base de datos.
Base de datos
Se utiliza MySQL como sistema gestor de base de datos. El modelo es relacional y está compuesto por diversas tablas interconectadas mediante llaves foráneas, lo que garantiza la integridad de los datos.
Autenticación y seguridad
El sistema implementa autenticación mediante JSON Web Tokens (JWT). El proceso es el siguiente:
1.	El usuario ingresa sus credenciales (usuario y contraseña). 
2.	El backend valida la información. 
3.	Si las credenciales son correctas, se genera un token. 
4.	El token debe enviarse en las solicitudes posteriores en el encabezado Authorization. 
Adicionalmente, las contraseñas se almacenan en la base de datos utilizando bcrypt, lo que garantiza que no se guarden en texto plano. También se emplea el uso de variables de entorno para proteger información sensible como claves y configuraciones del sistema.
Funcionalidades del sistema
Gestión de usuarios
Creación de usuarios 
Consulta de usuarios 
Consulta de usuario por identificador 
Gestión de clientes
Creación de clientes 
Consulta de clientes 
Actualización de información 
Eliminación de registros 
Gestión de vehículos
Registro de vehículos 
Consulta de vehículos 
Consulta por identificador 
Actualización de información 
Eliminación de registros 
Gestión de ventas
Registro de ventas 
Consulta de ventas con información relacionada (cliente, usuario y vehículo) 
Conversión de moneda
El sistema permite convertir el precio de los vehículos a dólares estadounidenses. Para ello, se utiliza una API externa de tasas de cambio. La autenticación a dicha API se realiza mediante una API Key almacenada en variables de entorno.
API REST
El backend expone una API REST accesible a través de la siguiente URL base:
http://localhost:3000/api
Entre los principales endpoints se encuentran:
/auth/login 
/auth/Registro 
/usuarios 
/clientes 
/vehiculos 
/ventas 
/precio-usd 
Las rutas protegidas requieren el envío de un token JWT en el encabezado de la solicitud.
Base de datos
La base de datos utilizada es MySQL, con una estructura relacional. Las principales tablas son:
Usuarios 
Clientes 
Vehiculos 
Ventas 
La tabla Ventas se relaciona con las demás tablas mediante llaves foráneas, lo que permite mantener la consistencia e integridad de la información.
Tecnologías utilizadas
Node.js 
Express.js 
Angular 
MySQL 
JWT (jsonwebtoken) 
bcrypt 
dotenv 
cors 
Conclusión
El sistema desarrollado permite la gestión integral de un autolote mediante una arquitectura modular y organizada. Se implementan buenas prácticas de seguridad, separación de responsabilidades y uso de tecnologías actuales, lo que facilita su mantenimiento, escalabilidad y comprensión.
