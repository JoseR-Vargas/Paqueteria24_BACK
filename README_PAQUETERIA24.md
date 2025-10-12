# 🚚 Paquetería24 - Backend API

Backend desarrollado en **NestJS** con **TypeScript** y **MongoDB** para la gestión de contactos y consultas de la empresa Paquetería24.

## 🏗️ Arquitectura

- **Framework**: NestJS con TypeScript
- **Base de Datos**: MongoDB con Mongoose
- **Validación**: class-validator + class-transformer
- **CORS**: Configurado para desarrollo y producción

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js >= 16
- MongoDB (local o Atlas)
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd paqueteria24

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus configuraciones
```

### Configuración de Base de Datos

#### Opción 1: MongoDB Local
```bash
# Instalar MongoDB localmente o usar Docker
docker run --name paqueteria24-mongo -p 27017:27017 -d mongo:latest

# En .env:
MONGODB_URI=mongodb://localhost:27017/paqueteria24_dev
```

#### Opción 2: MongoDB Atlas (Producción)
```bash
# En .env:
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/paqueteria24_prod
```

## 🛠️ Scripts Disponibles

### Usando npm

```bash
# Desarrollo (con hot reload)
npm run dev

# Producción
npm run build
npm run start:prod

# Tests
npm run test
npm run test:watch
npm run test:e2e
```

### Usando el script personalizado

```bash
# Hacer el script ejecutable
chmod +x start.sh

# Modo desarrollo
./start.sh dev

# Modo producción
./start.sh prod

# Ver todas las opciones
./start.sh help
```

## 📡 API Endpoints

### Contactos (Forms)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/form` | Crear nuevo contacto |
| GET | `/form` | Obtener todos los contactos |
| GET | `/form/:id` | Obtener contacto por ID |
| PATCH | `/form/:id` | Actualizar contacto |
| DELETE | `/form/:id` | Eliminar contacto |
| GET | `/form/stats` | Obtener estadísticas |

### Ejemplo de Petición

```javascript
// POST /form
{
  "nombre": "Juan Pérez",
  "cedula": "12345678",
  "telefono": "099123456",
  "email": "juan@example.com",
  "comentario": "Consulta sobre precios",
  "paqueteria": ["mercado-libre", "ecommerce"],
  "fecha": "2024-10-11T10:30:00.000Z"
}
```

### Respuesta de la API

```javascript
{
  "success": true,
  "message": "Contacto guardado exitosamente",
  "data": {
    "_id": "...",
    "nombre": "Juan Pérez",
    // ... resto de campos
    "createdAt": "2024-10-11T10:30:00.000Z",
    "updatedAt": "2024-10-11T10:30:00.000Z"
  }
}
```

## 🔧 Variables de Entorno

```bash
# Entorno
NODE_ENV=development          # development | production

# Servidor
PORT=3000                    # Puerto del servidor

# Base de Datos
MONGODB_URI=mongodb://localhost:27017/paqueteria24_dev

# CORS
FRONTEND_URL=http://localhost:3001
ALLOWED_ORIGINS=http://localhost:3001,http://127.0.0.1:5500

# Base de datos
DB_NAME=paqueteria24_dev
```

## 🚀 Despliegue

### Desarrollo Local

```bash
# Iniciar MongoDB
./start.sh mongo

# Iniciar backend
./start.sh dev
```

### Producción

```bash
# Compilar
npm run build

# Iniciar en producción
NODE_ENV=production npm run start:prod
```

### Docker (Opcional)

```bash
# Construir imagen
npm run docker:build

# Ejecutar contenedor
npm run docker:run
```

## 🔐 Validaciones

El backend incluye validaciones automáticas para:

- ✅ Campos obligatorios (nombre, cedula, telefono, email, comentario)
- ✅ Formato de email válido
- ✅ Límite de 300 caracteres en comentarios
- ✅ Tipos de paquetería válidos
- ✅ Formato de fecha ISO

## 📊 Estructura del Proyecto

```
src/
├── app.module.ts              # Módulo principal
├── main.ts                    # Punto de entrada
├── form/                      # Módulo de formularios
│   ├── form.controller.ts     # Controlador REST
│   ├── form.service.ts        # Lógica de negocio
│   ├── form.module.ts         # Módulo
│   ├── dto/                   # DTOs de validación
│   │   ├── create-form.dto.ts
│   │   └── update-form.dto.ts
│   └── entities/              # Esquemas de base de datos
│       └── form.entity.ts
└── test/                      # Tests E2E
```

## 🔗 Integración con Frontend

El backend está configurado para trabajar con el frontend estático ubicado en `/Paqueteria24/`. 

Las URLs se detectan automáticamente:
- **Desarrollo**: `http://localhost:3000`
- **Producción**: Variable de entorno `FRONTEND_URL`

## 📝 Notas Importantes

1. **CORS**: Configurado para múltiples orígenes (desarrollo y producción)
2. **Validación**: Validación automática de DTOs con mensajes de error claros
3. **Logging**: Console logs detallados para debugging
4. **Error Handling**: Manejo robusto de errores con mensajes apropiados
5. **Base de Datos**: Esquemas optimizados con índices y validaciones

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para la feature (`git checkout -b feature/AmazingFeature`)
3. Commit los cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📞 Soporte

Para preguntas o problemas, contacta al equipo de desarrollo.

---

**Desarrollado con ❤️ para Paquetería24**