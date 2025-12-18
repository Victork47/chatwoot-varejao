#!/bin/bash
# ============================================
# BUILD SCRIPT - VAREJÃO CHAT
# ============================================

echo "🚀 Building Varejão Chat..."

# Verificar se .env existe
if [ ! -f ".env" ]; then
    echo "⚠️  Arquivo .env não encontrado!"
    echo "   Copie o .env.example e configure:"
    echo "   cp .env.example .env"
    echo ""
    echo "   Configurações importantes:"
    echo "   - MAILER_SENDER_EMAIL=Suporte Varejão <suporteon@varejaodacontingencia.com.br>"
    echo "   - SMTP_DOMAIN=varejaodacontingencia.com.br"
    echo "   - SECRET_KEY_BASE=(gere com 'rake secret')"
    exit 1
fi

# Build da imagem Docker
echo "📦 Construindo imagem Docker..."
docker-compose -f docker-compose.production.yaml build --no-cache

# Subir containers
echo "🔄 Iniciando containers..."
docker-compose -f docker-compose.production.yaml up -d

echo ""
echo "✅ Varejão Chat está rodando!"
echo "🌐 Acesse: http://localhost:3000"
echo ""
