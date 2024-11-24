#!/bin/bash
# Caminho do diretório onde o front-end será armazenado
cd /home/ubuntu/sustentare-web

# Puxar a última versão do repositório
git pull origin main

# Instalar dependências
npm install

# Construir o projeto
npm run build

# Reiniciar o servidor (exemplo usando serve)
pm2 restart sustentare-web || pm2 start build/ --name sustentare-web

# Certificar que o Nginx ou outro servidor está servindo o build
