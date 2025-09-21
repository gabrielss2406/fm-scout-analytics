#!/bin/bash

# FM Moneyball Scout - Production Deployment Script
set -e

echo "🚀 Deploying FM Moneyball Scout to production..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
IMAGE_NAME="fm-moneyball-scout"
CONTAINER_NAME="fm-scout-app"
PORT=${PORT:-80}

echo -e "${BLUE}FM Moneyball Scout - Production Deployment${NC}"
echo -e "${BLUE}======================================${NC}"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Docker is not running. Please start Docker and try again.${NC}"
    exit 1
fi

# Build the Docker image
echo -e "${YELLOW}📦 Building Docker image...${NC}"
docker build -t $IMAGE_NAME . --no-cache

# Stop and remove existing container if it exists
if [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
    echo -e "${YELLOW}🔄 Stopping existing container...${NC}"
    docker stop $CONTAINER_NAME || true
    docker rm $CONTAINER_NAME || true
fi

# Run the new container
echo -e "${YELLOW}🚀 Starting new container...${NC}"
docker run -d \
  --name $CONTAINER_NAME \
  -p $PORT:80 \
  --restart unless-stopped \
  --env-file .env.production \
  --memory=512m \
  --cpus=1.0 \
  $IMAGE_NAME

# Wait for container to be ready
echo -e "${YELLOW}⏳ Waiting for container to be ready...${NC}"
sleep 10

# Health check with retries
echo -e "${YELLOW}🔍 Running health checks...${NC}"
for i in {1..5}; do
    if curl -f http://localhost:$PORT/health > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Health check passed!${NC}"
        break
    else
        echo -e "${YELLOW}Attempt $i/5 failed, retrying...${NC}"
        if [ $i -eq 5 ]; then
            echo -e "${RED}❌ Health check failed after 5 attempts. Please check the container logs:${NC}"
            echo "docker logs $CONTAINER_NAME"
            exit 1
        fi
        sleep 5
    fi
done

# Success message
echo -e "${GREEN}✅ Deployment successful! FM Moneyball Scout is running on port $PORT${NC}"
echo -e "${GREEN}🔗 Access your application at: http://localhost:$PORT${NC}"
echo -e "${GREEN}📊 Health endpoint: http://localhost:$PORT/health${NC}"

# Show container info
echo -e "${BLUE}📊 Container Information:${NC}"
echo "Container ID: $(docker ps -q -f name=$CONTAINER_NAME)"
echo "Image: $IMAGE_NAME"
echo "Port: $PORT"
echo "Status: $(docker inspect -f '{{.State.Status}}' $CONTAINER_NAME)"

# Show resource usage
echo -e "${BLUE}💾 Resource Usage:${NC}"
docker stats --no-stream $CONTAINER_NAME

# Cleanup old images
echo -e "${YELLOW}🧹 Cleaning up old images...${NC}"
docker image prune -f > /dev/null 2>&1

echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
echo -e "${BLUE}======================================${NC}"
echo -e "Useful commands:"
echo -e "  View logs: ${YELLOW}docker logs -f $CONTAINER_NAME${NC}"
echo -e "  Stop app:  ${YELLOW}docker stop $CONTAINER_NAME${NC}"
echo -e "  Restart:   ${YELLOW}docker restart $CONTAINER_NAME${NC}"