#!/bin/bash

# ================================
# Script para Actualizar Backend URL
# Paquetería24
# ================================

if [ -z "$1" ]; then
    echo "❌ Error: Debes proporcionar la URL del backend"
    echo ""
    echo "Uso: ./update-backend-url.sh https://tu-backend.onrender.com"
    exit 1
fi

BACKEND_URL=$1

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "🔧 Actualizando URL del backend..."
echo ""

# Ruta al archivo dashboard.js del frontend
FRONTEND_PATH="../../Paqueteria24/js/dashboard.js"

if [ ! -f "$FRONTEND_PATH" ]; then
    echo "❌ No se encontró el archivo dashboard.js"
    echo "   Ruta esperada: $FRONTEND_PATH"
    exit 1
fi

# Hacer backup
cp "$FRONTEND_PATH" "$FRONTEND_PATH.backup"

# Actualizar la URL
sed -i "s|: 'https://tu-backend-en-produccion.com'|: '$BACKEND_URL'|g" "$FRONTEND_PATH"

echo -e "${GREEN}✅ URL del backend actualizada a: $BACKEND_URL${NC}"
echo ""
echo "📝 Cambios realizados en: $FRONTEND_PATH"
echo "   (Backup guardado en: $FRONTEND_PATH.backup)"
echo ""
echo -e "${YELLOW}🚀 Próximos pasos:${NC}"
echo "   1. Verifica que el backend esté funcionando:"
echo "      curl $BACKEND_URL/form"
echo ""
echo "   2. Actualiza tu frontend en Netlify:"
echo "      cd ../../Paqueteria24"
echo "      git add ."
echo "      git commit -m 'Update backend URL'"
echo "      git push origin master"
echo ""
echo "   Netlify detectará automáticamente los cambios y re-desplegará"
