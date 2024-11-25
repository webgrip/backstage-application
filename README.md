# Backstage Application

## Requirements
- Docker
- Docker Compose
- Nvm (Node.js 22.10.0)

## Running the project
```
cd backstage
yarn install --immutable
yarn tsc
cd ..
docker-compose up --build
```

Setting up cluster

```ssh
kubectl -n backstage apply -f ops/k8s/service-account.yaml
kubectl -n backstage get secret admin-user -o jsonpath={".data.token"} | base64 -d
```