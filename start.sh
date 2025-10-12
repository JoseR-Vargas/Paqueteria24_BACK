#!/bin/bash

# ================================
# SCRIPT DE INICIO - PAQUETERÍA24
# ================================

echo "🚀 Iniciando Paquetería24 Backend..."

# Función para mostrar ayuda
show_help() {
    echo ""
    echo "🛠️ Uso: ./start.sh [OPCIÓN]"
    echo ""
    echo "Opciones disponibles:"
    echo "  dev       - Iniciar en modo desarrollo (con hot reload)"
    echo "  prod      - Compilar e iniciar en modo producción"
    echo "  build     - Solo compilar el proyecto"
    echo "  install   - Instalar dependencias"
    echo "  test      - Ejecutar tests"
    echo "  clean     - Limpiar build y node_modules"
    echo "  mongo     - Iniciar MongoDB local (Docker)"
    echo "  help      - Mostrar esta ayuda"
    echo ""
}

# Función para verificar MongoDB
check_mongodb() {
    echo "🔍 Verificando conexión a MongoDB..."
    if [ "$NODE_ENV" = "development" ]; then
        echo "📦 Usando MongoDB local: mongodb://localhost:27017/paqueteria24_dev"
    else
        echo "☁️ Usando MongoDB Atlas (producción)"
    fi
}

# Función para desarrollo
start_dev() {
    echo "🔧 Iniciando en modo DESARROLLO..."
    export NODE_ENV=development
    check_mongodb
    
    # Verificar si existe .env
    if [ ! -f .env ]; then
        echo "⚠️  Archivo .env no encontrado. Usando configuración por defecto..."
    fi
    
    # Instalar dependencias si es necesario
    if [ ! -d "node_modules" ]; then
        echo "📦 Instalando dependencias..."
        npm install
    fi
    
    npm run start:dev
}

# Función para producción
start_prod() {
    echo "🏭 Preparando para PRODUCCIÓN..."
    export NODE_ENV=production
    check_mongodb
    npm run build
    npm run start:prod
}

# Función para instalar dependencias
install_deps() {
    echo "📦 Instalando dependencias..."
    npm install
    echo "✅ Dependencias instaladas correctamente"
}

# Función para limpiar proyecto
clean_project() {
    echo "🧹 Limpiando proyecto..."
    rm -rf dist/
    rm -rf node_modules/
    echo "✅ Proyecto limpio"
}

# Función para iniciar MongoDB con Docker
start_mongodb() {
    echo "🐳 Iniciando MongoDB con Docker..."
    docker run --name paqueteria24-mongo -p 27017:27017 -d mongo:latest
    echo "✅ MongoDB iniciado en puerto 27017"
}

# Manejo de argumentos
case "$1" in
    "dev")
        start_dev
        ;;
    "prod")
        start_prod
        ;;
    "build")
        echo "🔨 Compilando proyecto..."
        npm run build
        ;;
    "install")
        install_deps
        ;;
    "test")
        echo "🧪 Ejecutando tests..."
        npm test
        ;;
    "clean")
        clean_project
        ;;
    "mongo")
        start_mongodb
        ;;
    "help"|"--help"|"-h")
        show_help
        ;;
    "")
        start_dev  # Por defecto, modo desarrollo
        ;;
    *)
        echo "❌ Opción desconocida: $1"
        show_help
        exit 1
        ;;
esac
