# 🚀 Cómo Iniciar el Backend

## ⚠️ IMPORTANTE: Debes mantener el backend corriendo

El error de CORS que estás viendo ocurre porque el backend no está corriendo.

## 📝 Solución Rápida

### Opción 1: Terminal en VS Code

1. Abre una **nueva terminal** en VS Code (Terminal → New Terminal)
2. Ejecuta estos comandos:
   ```bash
   cd /home/dev/Desktop/Apps/Paqueteria24_BACK/paqueteria24
   npm run start:dev
   ```
3. **NO CIERRES** esta terminal
4. El backend debe mostrar:
   ```
   ✅ Paquetería24 Backend está corriendo en puerto 3000
   ```
5. Deja esta terminal abierta y trabaja en otras pestañas

### Opción 2: Terminal Externa

1. Abre una terminal fuera de VS Code
2. Ejecuta:
   ```bash
   cd /home/dev/Desktop/Apps/Paqueteria24_BACK/paqueteria24
   npm run start:dev
   ```
3. Minimiza la terminal (NO la cierres)

### Opción 3: Script Automático

```bash
cd /home/dev/Desktop/Apps/Paqueteria24_BACK/paqueteria24
./start-backend.sh
```

## ✅ Verificar que Funciona

Una vez que el backend esté corriendo, abre otra terminal y ejecuta:

```bash
curl http://localhost:3000
```

Deberías ver:
```json
{"message":"¡Bienvenido a Paquetería24 Backend API! 🚀"}
```

## 🔍 Probar el Formulario

1. Asegúrate que el backend esté corriendo (ver arriba)
2. Abre: http://localhost:8080/index.html
3. Llena el formulario de contacto
4. Envía
5. Los datos se guardarán en MongoDB Atlas ✅

## 🐛 Si Sigue Sin Funcionar

### Error: "CORS request did not succeed"
**Causa:** El backend no está corriendo
**Solución:** Sigue los pasos de arriba para iniciar el backend

### Error: "Failed to connect to localhost port 3000"
**Causa:** El backend se detuvo
**Solución:** Reinicia el backend

### Error: "bad auth: authentication failed"
**Causa:** Contraseña de MongoDB Atlas incorrecta
**Solución:** Revisa el archivo `.env` y verifica la contraseña

## 📊 Monitoreo

Cuando el backend esté corriendo, verás logs en tiempo real:

```
POST /form 201 - - ms
```

Esto significa que recibió una petición del formulario ✅

## 🔄 Flujo Correcto

```
1. Iniciar Backend (npm run start:dev)
   ↓
2. Ver mensaje "✅ Backend corriendo en puerto 3000"
   ↓
3. Abrir http://localhost:8080
   ↓
4. Llenar formulario
   ↓
5. Enviar
   ↓
6. Ver en logs del backend: "POST /form 201"
   ↓
7. Datos guardados en MongoDB Atlas ✅
```

## 💡 Tip

Usa **dos terminales**:
- Terminal 1: Backend (npm run start:dev) ← Déjala abierta
- Terminal 2: Para otros comandos

---

**El backend debe estar SIEMPRE corriendo mientras uses el formulario**
