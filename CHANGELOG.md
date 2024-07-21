# Changelog

Todos los cambios de este proyecto se documentarán en este archivo <3.

## [Unreleased]

### Added

- **GET** `/api/taxis`: Endpoint para listar taxis con paginación.
  - Documentación Swagger actualizada.
  - Pruebas unitarias, incluyendo validación de parámetros de consulta no válidos.
- **GET** `/api/taxis/{id}/locations`: Endpoint para obtener ubicación de un taxi por ID.
  - Documentación Swagger actualizada.
  - Pruebas implementadas, cubriendo ubicaciones encontradas, no encontradas y parámetros de consulta no válidos.

### Changed

- Mocking de pruebas para `getTaxis` y `getTaxiLocations` para evitar consultas a la DB real.

### Fixed

- Mejorando manejo de errores y respuestas en los endpoints.

### Removed

- N/A

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
