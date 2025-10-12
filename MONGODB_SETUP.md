# 🔧 Configuración MongoDB Atlas

## ⚠️ IMPORTANTE: Debes completar estos pasos

### 1️⃣ Obtener tu Contraseña de MongoDB Atlas

1. Ve a [MongoDB Atlas](https://cloud.mongodb.com/)
2. Inicia sesión con tu cuenta
3. Ve a **Database Access** (Acceso a la Base de Datos)
4. Encuentra el usuario `paqueteria24_db_user`
5. Si no recuerdas la contraseña:
   - Click en **Edit**
   - Click en **Edit Password**
   - Genera una nueva contraseña **SEGURA**
   - **Copia la contraseña** (no la perderás)

### 2️⃣ Actualizar el archivo `.env`

Abre el archivo `.env` y reemplaza `TU_PASSWORD_AQUI` con tu contraseña:

```env
MONGODB_URI=mongodb+srv://paqueteria24_db_user:MI_PASSWORD_REAL@paqueteria24.5utnuoj.mongodb.net/paqueteria24_prod?retryWrites=true&w=majority
```

**Ejemplo:**
```env
MONGODB_URI=mongodb+srv://paqueteria24_db_user:Abc123XyZ456@paqueteria24.5utnuoj.mongodb.net/paqueteria24_prod?retryWrites=true&w=majority
```

### 3️⃣ Configurar IP Whitelist

MongoDB Atlas requiere que agregues tu IP a la lista de permitidos:

1. En MongoDB Atlas, ve a **Network Access**
2. Click en **Add IP Address**
3. Opciones:
   - **Desarrollo:** Click en "Allow Access from Anywhere" (0.0.0.0/0)
   - **Producción:** Agrega solo tu IP específica

### 4️⃣ Verificar Permisos del Usuario

1. Ve a **Database Access**
2. Verifica que `paqueteria24_db_user` tenga permisos:
   - **Read and write to any database** ✅
   - O al menos **readWrite** en `paqueteria24_prod`

### 5️⃣ Verificar el Cluster

1. Ve a **Database** (Databases)
2. Verifica que el cluster `paqueteria24` esté activo
3. El nombre debe coincidir con la URL: `@paqueteria24.5utnuoj.mongodb.net`

---

## 🚀 Iniciar el Backend

Después de configurar todo:

```bash
cd /home/dev/Desktop/Apps/Paqueteria24_BACK/paqueteria24
npm run start:dev
```

Si todo está bien, deberías ver:
```
✅ Paquetería24 Backend está corriendo en puerto 3000
🌍 Entorno: development
📍 Acceso: http://localhost:3000
```

---

## ❌ Errores Comunes

### Error: "bad auth: authentication failed"
**Solución:** Contraseña incorrecta en `.env`
- Verifica que copiaste la contraseña correctamente
- No debe tener espacios
- Si tiene caracteres especiales (@, #, %, etc.), codifícalos:
  - `@` → `%40`
  - `#` → `%23`
  - `%` → `%25`

### Error: "Unable to connect to the database"
**Solución:** IP no está en whitelist
- Ve a Network Access en MongoDB Atlas
- Agrega tu IP actual
- O usa 0.0.0.0/0 para permitir todas (solo desarrollo)

### Error: "Server selection timed out"
**Solución:** Problemas de red o cluster inactivo
- Verifica tu conexión a internet
- Verifica que el cluster esté activo en MongoDB Atlas
- Espera unos segundos y reintenta

---

## 🔍 Verificar Conexión

Una vez que el backend esté corriendo, prueba:

```bash
curl http://localhost:3000
```

Debería responder con:
```json
{"message": "¡Bienvenido a Paquetería24 Backend API! 🚀"}
```

---

## 📝 Estructura de la URI

```
mongodb+srv://[usuario]:[contraseña]@[cluster].mongodb.net/[database]?retryWrites=true&w=majority
```

Tu configuración:
- **Usuario:** `paqueteria24_db_user`
- **Contraseña:** `[TU_PASSWORD]` ⚠️ DEBES REEMPLAZAR ESTO
- **Cluster:** `paqueteria24.5utnuoj.mongodb.net`
- **Database:** `paqueteria24_prod`

---

## 🛡️ Seguridad

⚠️ **NUNCA** subas el archivo `.env` a GitHub

Ya está en `.gitignore`, pero verifica:
```bash
cat .gitignore | grep .env
```

Debe aparecer `.env`

---

¿Necesitas ayuda? Revisa los logs del terminal donde ejecutaste `npm run start:dev`
