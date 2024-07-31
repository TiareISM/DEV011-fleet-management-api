# Changelog

## [Unreleased]

### Added

- **Funcionalidad para cargar datos desde un archivo: loadTaxisData`.txt`**
  - Transacciones en la base de datos: Uso de comandos `BEGIN`, `COMMIT`, y `ROLLBACK` para manejar la integridad de los datos.
  - Pruebas unitarias: Se han creado pruebas utilizando Jest para verificar el manejo de archivos vacíos, datos inválidos y datos válidos.
  - Script: Implementación del script `testLoadTaxisData.js` para ejecutar la función `loadTaxisData`.
- **GET** `/api/taxis`: Endpoint para listar taxis con paginación.
  - Documentación Swagger actualizada.
  - Pruebas unitarias, incluyendo validación de parámetros de consulta no válidos.
- **GET** `/api/taxis/{id}/locations`: Endpoint para obtener ubicación de un taxi por ID.
  - Documentación Swagger actualizada.
  - Pruebas implementadas, cubriendo ubicaciones encontradas, no encontradas y parámetros de consulta no válidos.
- **GET** `/api/taxis/{id}/location/latest`: Endpoint para obtener la última ubicación de un taxi por ID.
  - Documentación Swagger actualizada.
  - Pruebas implementadas, cubriendo ubicaciones encontradas, no encontradas y parámetros de consulta no válidos.

### Changed

- Mocking de pruebas para `getTaxis` , `getTaxiLocations` y `getTaxiLastLocation` para evitar consultas a la DB real.

### Fixed

- Mejorando manejo de errores y respuestas en los endpoints.

### Removed

- N/A

## [31/07/2024]

### Added

- **Pruebas unitarias para la función** `loadTaxisData`:

  - Lee el archivo desde la ruta especificada.
  - Verifica si el archivo está vacío y termina la ejecución si es así.
  - Utiliza transacciones para asegurar la integridad de los datos con los comandos `BEGIN`, `COMMIT`, y `ROLLBACK` en la base de datos.
  - Valida los datos antes de insertarlos en la tabla `taxis`.
  - Registra errores en caso de datos inválidos y problemas de inserción.

- **Transacciones en la base de datos**: Implementación de transacciones en la base de datos para garantizar la integridad de los datos durante el proceso de carga. Esto incluye:

  - `BEGIN` para iniciar la transacción.
  - `COMMIT` para confirmar la transacción si todos los datos son válidos.
  - `ROLLBACK` para revertir la transacción en caso de errores.

- **Testing de la función `loadTaxisData`**: Se han creado pruebas unitarias para la función utilizando Jest, que incluyen:

  - Prueba de archivo vacío: Verifica que la función maneje correctamente el caso cuando el archivo está vacío y no realice operaciones en la base de datos.
  - Prueba de formato de datos inválido: Asegura que la función maneje correctamente datos con formato inválido y no realice inserciones incorrectas en la base de datos.
  - Prueba de datos válidos: Confirma que la función procese y cargue correctamente datos válidos en la base de datos.

- **Script** `node testLoadTaxisData.js`: Se ha creado el script `testLoadTaxisData.js` para ejecutar la función `loadTaxisData`, utilizando la CLI.

## [22/07/2024]

### Added

- **GET** `/api/taxis/{id}/location/latest`: Endpoint para obtener la última ubicacion de un taxi por ID.
  - Documentación Swagger añadida.
  - Pruebas implementadas, cubriendo ubicaciones encontradas, no encontradas, y parámetros de consulta no válidos.

## [20/07/2024]

### Added

- **GET** `/api/taxis/{id}/locations`: Endpoint para obtener ubicaciones de un taxi por ID.
  - Documentación Swagger añadida.
  - Pruebas implementadas, cubriendo ubicaciones encontradas, no encontradas, y parámetros de consulta no válidos.

## [19/07/2024]

### Added

- Endpoint para listar taxis con paginación (`GET /api/taxis`)
- Documentación Swagger para el endpoint de taxis.
- Prueba para getTaxis, incluyendo la validación de parámetros de consulta no válidos.

## [18/07/2024]

### Added

- Creación de la conexión a PostgreSQL:
  - Implementación de la configuración de conexión utilizando variables de entorno.
  - Verificación y prueba de la conexión a la base de datos desde el archivo index.js.
- Cargar información a la base de datos:
  - Se han considerado las relaciones entre las tablas según el diagrama proporcionado.
- Implementación del servidor con Express.

## [17/07/2024]

### Added

- Inicialización del proyecto
- Creación de archivo `index.js`
- Configuración de `package.json`
- Creación de la rama `develop` desde `main` para seguir el flujo de trabajo GitFlow.
- Creación de la rama `conexion-a-db` para implementar la conexión a la base de datos.
