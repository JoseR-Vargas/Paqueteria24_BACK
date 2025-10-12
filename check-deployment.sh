#!/bin/bash

# ================================
# Script de Verificación de Despliegue
# Paquetería24 Backend
# ================================

echo "🔍 Verificando configuración de despliegue..."
echo ""

# Colores para mejor visualización
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar si existe .env
if [ -f ".env" ]; then
    echo -e "${GREEN}✅ Archivo .env encontrado${NC}"
else
    echo -e "${RED}❌ Archivo .env NO encontrado${NC}"
    exit 1
fi

# Verificar MongoDB URI
if grep -q "MONGODB_URI=" .env; then
    echo -e "${GREEN}✅ MONGODB_URI configurado${NC}"
else
    echo -e "${RED}❌ MONGODB_URI NO configurado${NC}"
fi

# Verificar CORS
if grep -q "paqueteria24.netlify.app" .env; then
    echo -e "${GREEN}✅ Netlify en ALLOWED_ORIGINS${NC}"
else
    echo -e "${YELLOW}⚠️  Netlify NO está en ALLOWED_ORIGINS${NC}"
fi

echo ""
echo "📋 Variables de entorno actuales:"
echo "================================"
grep -v "^#" .env | grep -v "^$"
echo ""

# Preguntar si quiere desplegar
echo -e "${YELLOW}❓ ¿Tu backend ya está desplegado en algún servicio (Render/Railway/Fly)?${NC}"
echo "   Si NO está desplegado, necesitas seguir la guía en DEPLOYMENT.md"
echo ""
echo "   Para desplegar rápidamente en Render.com:"
echo "   1. Ve a https://render.com y crea una cuenta"
echo "   2. Conecta este repositorio de GitHub"
echo "   3. Configura las variables de entorno"
echo "   4. Anota la URL que te den (ej: https://paqueteria24-backend.onrender.com)"
echo ""
echo -e "${GREEN}Una vez desplegado, ejecuta:${NC}"
echo "   ./update-backend-url.sh https://TU-URL-DE-BACKEND.onrender.com"
