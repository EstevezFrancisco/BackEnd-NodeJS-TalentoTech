# 2025-TalentoTech-BackEnd-EntregaFinal

## Descripción

API REST básica para gestión de productos desarrollada con Node.js, Express, ES Modules y Firestore como base de datos. Incluye autenticación JWT y operaciones CRUD.

## Tecnologías

- Node.js - Entorno de ejecución
- Express - Framework web
- Firestore - Base de datos NoSQL
- JWT - Autenticación por tokens
- dotenv - Variables de entorno
- CORS - Intercambio de recursos entre orígenes

## Instalación

1. Clonar el repositorio
```bash
git clone <tu-repositorio>
cd <nombre-del-proyecto>
```

2. Instalar dependencias
```
npm install
```

3. Configurar Firebase
    - Crear proyecto en [Firebase Console](https://console.firebase.google.com/)
    - Habilitar Firestore Database
    - Obtener credenciales de configuración
    - Crear colección `products`

4. Configurar variables de entorno
    - Copiar `.env-example` a `.env`
    - Completar con tus credenciales de Firebase
    - Definir un `JWT_SECRET` seguro

## Ejecución
- Desarrollo: `npm run dev`
- Producción: `npm start`
El servidor se ejecutará en `http://localhost:3000` o `http://localhost:3005`

## Endpoints
### Login
`POST /auth/login`
```json
{
  "email": "x@x.com",
  "password": "1234!"
}
```

### Obtener todos los productos:
`GET /api/products`

### Obtener productos filtrados:
`GET /api/product?min_price=10000&max_price=20000`

### Obtener producto por ID:
`GET /api/products/:id`

### Crear producto:
`POST /api/products/create`
```json
{
  "name": "Producto Ejemplo",
  "price": 29999.99
}
```

### Actualizar producto por ID:
`PUT /api/products/:id`
```json
{
  "name": "Producto Actualizado",
  "price": 399.99
}
```

### Eliminar producto por ID:
`DELETE /api/products/:id`
