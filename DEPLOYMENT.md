# 🚀 FM Moneyball Scout - Production Deployment Guide

Este guia explica como fazer o deploy do FM Moneyball Scout em produção usando Docker.

## 📋 Pré-requisitos

- Docker instalado (versão 20.10+)
- Docker Compose instalado (versão 2.0+)
- Pelo menos 1GB de RAM livre
- Porta 80 disponível (ou configure outra porta)

## 🐳 Opções de Deployment

### Opção 1: Deploy Simples com Docker

```bash
# 1. Construir a imagem
docker build -t fm-moneyball-scout .

# 2. Executar o container
docker run -d \
  --name fm-scout-app \
  -p 80:80 \
  --restart unless-stopped \
  fm-moneyball-scout

# 3. Verificar se está funcionando
curl http://localhost/health
```

### Opção 2: Deploy com Docker Compose (Recomendado)

```bash
# 1. Executar com docker-compose
docker-compose up -d

# 2. Verificar logs
docker-compose logs -f fm-scout

# 3. Parar o serviço
docker-compose down
```

### Opção 3: Deploy Automatizado com Script

```bash
# Dar permissão de execução ao script
chmod +x scripts/deploy.sh

# Executar o deploy
./scripts/deploy.sh
```

## 🔧 Configuração de Produção

### Variáveis de Ambiente

Edite o arquivo `.env.production` com suas configurações:

```bash
# Configurações da aplicação
VITE_APP_NAME="FM Moneyball Scout"
VITE_API_URL=https://sua-api.com

# Analytics (opcional)
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

# Features
VITE_ENABLE_DEBUG=false
```

### Configuração do Nginx

O arquivo `nginx.conf` inclui:
- ✅ Compressão Gzip
- ✅ Cache de assets estáticos
- ✅ Headers de segurança
- ✅ Suporte para React Router (SPA)
- ✅ Health check endpoint

## 🌐 Deploy em Cloud Providers

### AWS ECS

```bash
# 1. Construir e enviar para ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com
docker build -t fm-moneyball-scout .
docker tag fm-moneyball-scout:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/fm-moneyball-scout:latest
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/fm-moneyball-scout:latest

# 2. Criar task definition e service no ECS
```

### DigitalOcean Droplets

```bash
# 1. Conectar no droplet
ssh root@your-server-ip

# 2. Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# 3. Clonar o repositório e fazer deploy
git clone <your-repo>
cd fm-moneyball-scout
./scripts/deploy.sh
```

### Heroku (usando registry)

```bash
# 1. Login no Heroku
heroku login
heroku container:login

# 2. Criar aplicação
heroku create fm-moneyball-scout

# 3. Fazer push da imagem
heroku container:push web
heroku container:release web
```

## 📊 Monitoramento

### Health Check

```bash
# Verificar se a aplicação está funcionando
curl http://localhost/health

# Resposta esperada: "healthy"
```

### Logs do Container

```bash
# Ver logs em tempo real
docker logs -f fm-scout-app

# Ver logs do docker-compose
docker-compose logs -f fm-scout
```

### Métricas do Container

```bash
# Ver uso de recursos
docker stats fm-scout-app
```

## 🔒 Segurança em Produção

### SSL/HTTPS

Para produção, configure HTTPS usando:

1. **Reverse Proxy (Nginx/Traefik)**
2. **CloudFlare** (mais simples)
3. **Let's Encrypt** (gratuito)

Exemplo com Traefik (descomente no docker-compose.yml):

```yaml
# Configurar labels para SSL automático
labels:
  - "traefik.http.routers.fm-scout.tls.certresolver=myresolver"
```

### Headers de Segurança

O nginx.conf já inclui headers essenciais:
- X-Frame-Options
- X-Content-Type-Options  
- X-XSS-Protection
- Content-Security-Policy

## 🚨 Troubleshooting

### Problemas Comuns

**Porta em uso:**
```bash
# Verificar qual processo está usando a porta 80
sudo lsof -i :80
# Mudar para outra porta
docker run -p 8080:80 fm-moneyball-scout
```

**Container não inicia:**
```bash
# Ver logs detalhados
docker logs fm-scout-app
# Verificar recursos disponíveis
docker system df
```

**Build falha:**
```bash
# Limpar cache do Docker
docker builder prune
# Build sem cache
docker build --no-cache -t fm-moneyball-scout .
```

## 🔄 Atualizações

Para atualizar a aplicação:

```bash
# 1. Parar container atual
docker stop fm-scout-app

# 2. Fazer rebuild
docker build -t fm-moneyball-scout .

# 3. Executar nova versão
docker run -d --name fm-scout-app-new -p 80:80 fm-moneyball-scout

# 4. Remover versão antiga (após verificar que funciona)
docker rm fm-scout-app
```

## 📈 Performance

### Otimizações Incluídas

- ✅ Build multi-stage (imagem final ~15MB)
- ✅ Assets estáticos com cache de 1 ano
- ✅ Compressão Gzip habilitada
- ✅ Usuário non-root para segurança
- ✅ Health checks automáticos

### Scaling Horizontal

Para múltiplas instâncias:

```yaml
# docker-compose.yml
services:
  fm-scout:
    # ... config ...
    deploy:
      replicas: 3
```

---

## 📞 Suporte

Se encontrar problemas:

1. Verifique os logs: `docker logs fm-scout-app`
2. Teste o health check: `curl http://localhost/health` 
3. Verifique recursos: `docker system df`

**Aplicação rodando com sucesso em:** http://localhost