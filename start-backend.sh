#!/bin/bash

# Script para iniciar el backend en background
cd "$(dirname "$0")"

echo "🚀 Iniciando Paquetería24 Backend..."
npm run start:dev
