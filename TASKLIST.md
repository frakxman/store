# Syscomp ConexiónPOS
# Store
## Lista de tareas pendientes:

### WEB
-	Navbar:  Organizar el buscador y el paginador para dispositivo móvil~~
-	Searcher: Desarrollar la funcionalidad de búsqueda tanto por producto como para las categorías
-	Paginator: Desarrollar la funcionalidad de paginación para los productos como para las categorias
-	Slider: Programar la funcionalidad basado en la extracción de las direcciones de la respuesta del api
-	Productos: Arreglar el problema de la carga inicial y el bloqueo del botón de menú ( El problema se da por la carga inicial del warehouse sí el valor asignado precarga es 0 revienta la aplicación y no se renderizan los productos, por otra parte si el valor esta quemado por defecto este si hace el cambio a la asignación como respuesta de la API)
-	Footer: Organizar los tamaños para tablets y pantallas más grandes~~
-	Cart:  - Diseño y funcionalidad de la tabla donde se renderizan los productos seleccionados. -Hacer funcional el formulario de ingreso de datos de nuevos clientes.
-	Product: Crear la página de muestra especifica de cada producto.
### AUTH
-	Login: Implementar el guard para la navegación al módulo administrativo, lo que incluye validar el token y el userId respecto al que esta en la base de datos.
### ADMIN
-	General: Diseñar y desarrollar todo el módulo en función de los formularios para la edición y carga de los productos,
-	List: la renderización de los productos en la tabla o por tarjetas.
-	Edit: Conectar el formulario con la lógica y realizar el posteo de la información, aplicar diseño al formulario.
-	Img: Conectar el formulario para la carga de la información.
-	Desarrollar la funcionalidad de switch de 5 colores para personalización del store.
### SHARED
-	404: Desarrollar la página de no encontrado.
* Queda pendiente pasar a este módulo los componentes que se van a reutilizar entre los módulos Admin y Web
