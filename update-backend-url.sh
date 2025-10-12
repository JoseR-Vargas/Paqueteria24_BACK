#!/bin/bash

# ================================
# Script para Actualizar Backend URL
# Paquetería24
# ================================

if [ -z "$1" ]; then
    echo "❌ Error: Debes proporcionar la URL del backend"
    echo ""
    echo "Uso: ./update-backend-url.sh https://tu-backend.onrender.com"
    echo ""
    echo "Ejemplos:"
    echo "  ./update-backend-url.sh https://paqueteria24-backend.onrender.com"
    echo "  ./update-backend-url.sh https://paqueteria24-api.railway.app"
    exit 1
fi

BACKEND_URL=$1

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo "🔧 Actualizando URL del backend..."
echo ""

# Ruta al archivo config.js del frontend
FRONTEND_CONFIG="../../Paqueteria24/js/config.js"

if [ ! -f "$FRONTEND_CONFIG" ]; then
    echo "❌ No se encontró el archivo config.js"
    echo "   Ruta esperada: $FRONTEND_CONFIG"
    exit 1
fi

# Hacer backup
cp "$FRONTEND_CONFIG" "$FRONTEND_CONFIG.backup"

# Actualizar la URL usando sed
sed -i "s|production: '.*',|production: '$BACKEND_URL',|g" "$FRONTEND_CONFIG"

echo -e "${GREEN}✅ URL del backend actualizada a: $BACKEND_URL${NC}"
echo ""
echo "📝 Cambios realizados en: $FRONTEND_CONFIG"
echo "   (Backup guardado en: $FRONTEND_CONFIG.backup)"
echo ""

echo -e "${BLUE}🔍 Verificando configuración:${NC}"
grep -A2 "production:" "$FRONTEND_CONFIG"
echo ""

echo -e "${YELLOW}🚀 Próximos pasos:${NC}"
echo "   1. Verifica que el backend esté funcionando:"
echo "      ${BLUE}curl $BACKEND_URL/health${NC}"
echo "      ${BLUE}curl $BACKEND_URL/form${NC}"
echo ""
echo "   2. Actualiza tu frontend en Netlify:"
echo "      ${BLUE}cd ../../Paqueteria24${NC}"
echo "      ${BLUE}git add .${NC}"
echo "      ${BLUE}git commit -m 'Update backend URL to Render'${NC}"
echo "      ${BLUE}git push origin master${NC}"
echo ""
echo "   Netlify detectará automáticamente los cambios y re-desplegará"
echo ""
echo -e "${GREEN}✨ ¡Listo!${NC}"
