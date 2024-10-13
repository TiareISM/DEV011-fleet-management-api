# Fleet Management Software API

## 1. Descripción del proyecto

Este proyecto es una API REST para un software de gestión de flotas que permite consultar las ubicaciones de vehículos de una empresa de taxis. La API se desarrolla utilizando `Node.js` y `Express`, y está diseñada para interactuar con una base de datos PostgreSQL 🐘.

## 2. Tecnologias utilizadas

- `Node-js`: Entorno de ejecución para JavaScript en el lado del servidor.

- `Express`: Framework web para Node.js.

- `PostgreSQL`: Sistema de gestión de bases de datos relacional.

- `Swagger`: Herramienta para documentar y probar la API.

- `Jest`: Framework de pruebas para asegurar la calidad del código.

## 3. Endpoints de la API

1. _Obtener la lista de taxis_

- Método: `GET`
- Ruta: `/api/taxis`
- Descripción: Recupera una lista de todos los taxis disponibles con pagincaón.
- Parámetros de consulta:
  - `limit`: Número de taxis a devolver.
  - `page`: Número de página para la paginación.
- Respuestas:
  - `200 ok`: Devuelve una lista de taxis.
  - `400 Bad Request`: Párametro de consulta inválido.

2. _Obtener las ubicaciones de un taxi específico_

- Método: `Get`
- Ruta: `/api/taxis/{id}/locations`
- Descripción: Recupera una lista de ubicaciones para un taxi específico basado en su ID, con filtrado opcional por fecha y paginación.
- Parámetros:
  - `id`(requrido): ID del taxi para recuperar ubicaciones.
- Parámetros de consulta:
  - `date` (opcional): Filtrar ubicaciones por fecha (formato YYYY-MM-DD).
  - `limit` (opcional): Número de ubicaciones a devolver por página.
  - `page` (opcional): Número de página para la paginación.
- Respuestas:

  - `200 OK`: Devuelve una lista de ubicaciones para el taxi especificado.
  - `400 Bad Request`: Parámetros de consulta inválidos.
  - `404 Not Found`: No se encontraron ubicaciones para el ID del taxi y/o fecha proporcionados.

  3. _Obtener la última ubicación de un taxi específico_

- Método: `GET`
- Ruta: `/api/taxis/{id}/location/latest`
- Descripción: Recupera la ubicación más reciente de un taxi basado en su ID, con paginación opcional.
- Parámetros:
  - `id`(requerido): ID del taxi para recuperar la última ubicación.
- Parámetros de consulta:
  - `limit` (opcional): Número de ubicaciones a devolver por página.
  - `page` (opcional): Número de página para la paginación.
- Respuestas:
  - `200 OK`: Devuelve la última ubicación del taxi especificado.
  - `400 Bad Request`: Parámetros de consulta inválidos.
  - `404 Not Found`: No se encontraron ubicaciones para el ID del taxi proporcionado.
