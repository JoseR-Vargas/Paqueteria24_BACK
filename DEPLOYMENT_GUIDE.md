# 🚀 Guía de Despliegue - Paquetería24 Backend

## ✅ PROBLEMA RESUELTO

El error `sh: 1: nest: not found` se resolvió moviendo `@nestjs/cli` y `typescript` a `dependencies`.

---

## Despliegue en Render.com (Paso a Paso)

### Paso 1: Commit y Push

```bash
cd /home/dev/Desktop/Apps/Paqueteria24_BACK/paqueteria24
git add .
git commit -m "Fix: Move @nestjs/cli to dependencies for deployment"
git push origin master
```

### Paso 2: Configurar en Render

1. Ve a [dashboard.render.com](https://dashboard.render.com)
2. Click **"New +"** → **"Web Service"**
3. Conecta tu repositorio: `JoseR-Vargas/Paqueteria24_BACK`
4. Configuración:

   **General:**
   - Name: `paqueteria24-backend`
   - Region: Oregon (US West)
   - Branch: `master`
   - Root Directory: `paqueteria24`
   - Runtime: `Node`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run start:prod`

   **Environment Variables:**
   ```
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://paqueteria24_db_user:kI8tC1vPEaj3swT8@paqueteria24.5utnuoj.mongodb.net/paqueteria24_prod?retryWrites=true&w=majority
   ALLOWED_ORIGINS=https://paqueteria24.netlify.app
   DB_NAME=paqueteria24_prod
   ```

5. Click **"Create Web Service"**
6. Tu URL será: `https://paqueteria24-backend.onrender.com`

### Paso 3: Verificar Funcionamiento

```bash
# Health check
curl https://paqueteria24-backend.onrender.com/health

# Endpoint de formularios
curl https://paqueteria24-backend.onrender.com/form
```

### Paso 4: Actualizar Frontend

Usa el script automático:

```bash
cd /home/dev/Desktop/Apps/Paqueteria24_BACK/paqueteria24
chmod +x update-backend-url.sh
./update-backend-url.sh https://paqueteria24-backend.onrender.com
```

O manualmente edita `Paqueteria24/js/dashboard.js` línea 90:

```javascript
const backendUrl = isLocalDev
    ? 'http://localhost:3000' 
    : 'https://paqueteria24-backend.onrender.com';
```

### Paso 5: Redesplegar Frontend en Netlify

```bash
cd /home/dev/Desktop/Apps/Paqueteria24
git add .
git commit -m "Update backend URL"
git push origin master
```

---

## 🔧 Solución de Problemas

### ❌ Build fails con "nest: not found"
✅ **YA RESUELTO** - `@nestjs/cli` movido a dependencies

### ❌ CORS Error
- Verifica `ALLOWED_ORIGINS` en las variables de entorno de Render
- Debe incluir: `https://paqueteria24.netlify.app`

### ❌ MongoDB Connection Error
1. Ve a MongoDB Atlas → Network Access
2. Click "Add IP Address" → "Allow Access from Anywhere" (0.0.0.0/0)
3. Verifica que la contraseña en `MONGODB_URI` sea correcta

### ❌ Backend no responde
- Revisa los logs en Render Dashboard
- Verifica que el puerto sea el correcto (Render usa el que ellos asignan)
- El `PORT` debe estar en las variables de entorno o usar `process.env.PORT`

---

## 📝 Checklist Final

- [ ] Backend compilado sin errores (`npm run build` funciona)
- [ ] Código pusheado a GitHub
- [ ] Servicio creado en Render
- [ ] Variables de entorno configuradas
- [ ] MongoDB Atlas permite conexiones (0.0.0.0/0)
- [ ] Backend responde en `/health`
- [ ] Backend responde en `/form`
- [ ] URL actualizada en `dashboard.js`
- [ ] Frontend re-desplegado en Netlify
- [ ] Aplicación funciona en producción ✅

---

## 🎯 URLs Finales

- **Frontend:** https://paqueteria24.netlify.app
- **Backend:** https://paqueteria24-backend.onrender.com
- **Base de Datos:** MongoDB Atlas

## ⚠️ Nota sobre Render Free Tier

El plan gratuito de Render:
- Se "duerme" después de 15 minutos de inactividad
- La primera petición después de dormir tarda ~30 segundos
- Esto es normal y esperado en el plan gratuito
