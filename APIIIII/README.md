# Backend API - Sistema de Asistencia

Este es el backend del sistema, construido con Node.js, Express, TypeScript y Prisma.

## Requisitos
- Node.js
- MySQL (Laragon) corriendo en localhost:3306.

## Configuración
1.  Asegúrate de que la base de datos `asistencia_db` exista en MySQL.
    -   Puedes crearla con HeidiSQL o CLI: `CREATE DATABASE asistencia_db;`
2.  Las variables de entorno están en `.env`.

## Ejecución
1.  Instalar dependencias:
    ```bash
    npm install
    ```
2.  Sincronizar base de datos:
    ```bash
    npx prisma db push
    ```
3.  Generar cliente Prisma:
    ```bash
    npx prisma generate
    ```
4.  Iniciar servidor en desarrollo:
    ```bash
    npx nodemon src/server.ts
    ```
    O compilar y correr:
    ```bash
    npm run build
    node dist/server.js
    ```

## Estructura
-   `src/app.ts`: Configuración de Express.
-   `src/routes`: Rutas de la API (`/auth`, `/api`).
-   `src/controllers`: Lógica de negocio.
-   `prisma/schema.prisma`: Definición de la BD.
