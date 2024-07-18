# Changelog

## [Unreleased]

### Added

- Inicialización del proyecto
- Creación de archivo `index.js`
- Configuración de `package.json`
- Creación de la rama `conexion-a-db`
- Conexión a la base de datos PostgresSQL:
  - Configuración de conexión utilizando variables de enetorno.
  - Verficar la conexión a la base de datos.
- Cargar la información de los archivos SQL en PostgreSQL:
  - Creación tabla `taxis`.
  - Cragar datos en la tabla.
  - Creación tabla `trajectories`.
  - Cargar datos en la tabla.
  - Implementación del servidor con Express.

### Changed

- N/A

### Fixed

- N/A

### Removed

- N/A

## [17/07/2024]

### Added

- Inicialización del proyecto
- Creación de archivo `index.js`
- Configuración de `package.json`
- Creación de la rama `conexion-a-db`

## [18/07/2024]

### Added

- Creación de la conexión a PostgreSQL:
  - Implementación de la configuración de conexión utilizando variables de entorno.
  - Verificación y prueba de la conexión a la base de datos desde el archivo index.js.
- Cargar información a la base de datos:
  - Se han considerado las relaciones entre las tablas según el diagrama proporcionado.
- Implementación del servidor con Express.
