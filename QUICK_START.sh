#!/bin/bash

# ================================
# PASOS RÁPIDOS PARA DESPLEGAR
# ================================

echo "📋 CHECKLIST DE DESPLIEGUE - Paquetería24"
echo "=========================================="
echo ""

echo "✅ PROBLEMAS RESUELTOS:"
echo "  1. Error 'nest: not found' → @nestjs/cli movido a dependencies"
echo "  2. CORS configurado para Netlify"
echo "  3. Health check endpoint agregado"
echo "  4. Build probado y funcionando ✓"
echo ""

echo "🚀 PRÓXIMOS PASOS:"
echo ""
echo "PASO 1: Subir cambios a GitHub"
echo "  cd /home/dev/Desktop/Apps/Paqueteria24_BACK"
echo "  git add ."
echo "  git commit -m 'Fix: Prepare backend for Render deployment'"
echo "  git push origin master"
echo ""

echo "PASO 2: Desplegar en Render.com"
echo "  1. Ve a: https://dashboard.render.com"
echo "  2. Click 'New +' → 'Web Service'"
echo "  3. Conecta: JoseR-Vargas/Paqueteria24_BACK"
echo "  4. Configuración:"
echo "     - Root Directory: paqueteria24"
echo "     - Build Command: npm install && npm run build"
echo "     - Start Command: npm run start:prod"
echo "  5. Variables de entorno:"
echo "     NODE_ENV=production"
echo "     MONGODB_URI=mongodb+srv://paqueteria24_db_user:kI8tC1vPEaj3swT8@paqueteria24.5utnuoj.mongodb.net/paqueteria24_prod?retryWrites=true&w=majority"
echo "     ALLOWED_ORIGINS=https://paqueteria24.netlify.app"
echo ""

echo "PASO 3: Una vez desplegado en Render"
echo "  Anota tu URL (ej: https://paqueteria24-backend.onrender.com)"
echo "  Ejecuta:"
echo "  ./update-backend-url.sh https://TU-URL.onrender.com"
echo ""

echo "PASO 4: Actualizar frontend en Netlify"
echo "  cd /home/dev/Desktop/Apps/Paqueteria24"
echo "  git add ."
echo "  git commit -m 'Update backend URL'"
echo "  git push origin master"
echo ""

echo "PASO 5: Verificar"
echo "  curl https://TU-URL.onrender.com/health"
echo "  curl https://TU-URL.onrender.com/form"
echo "  Visitar: https://paqueteria24.netlify.app"
echo ""

echo "📖 Para más detalles, lee: DEPLOYMENT_GUIDE.md"
