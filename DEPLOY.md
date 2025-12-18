# Deploy Varejão Chat - VPS

## Passo a Passo

### 1. Clonar repositório na VPS
```bash
git clone [seu-repo] /opt/varejao-chat
cd /opt/varejao-chat
```

### 2. Criar arquivo .env
```bash
cp .env.example .env
```

### 3. Gerar SECRET_KEY_BASE
```bash
# Dentro do container ou com Ruby instalado:
docker run --rm chatwoot/chatwoot:latest bundle exec rake secret
# Copie o resultado para SECRET_KEY_BASE no .env
```

### 4. Configurar senhas no .env
```bash
nano .env
# Configure:
# - POSTGRES_PASSWORD=SuaSenhaSegura123
# - REDIS_PASSWORD=SuaSenhaRedis456
# - SECRET_KEY_BASE=(valor gerado acima)
```

### 5. Build e Deploy
```bash
chmod +x build-varejao.sh
./build-varejao.sh
```

### 6. Acessar
- URL: http://seu-dominio:3000
- Criar primeira conta admin

## Configurações já aplicadas
- ✅ Idioma: Português Brasil (pt_BR)
- ✅ Logos: Varejão
- ✅ Estilos: Glassmorphism
- ✅ Cores: #0e0e10, #00c4a2
- ✅ Email: suporteon@varejaodacontingencia.com.br
