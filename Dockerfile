FROM node:latest as build-stage

WORKDIR /src

COPY . .

RUN npm install

RUN npm run build

# Utilize o servidor HTTP do Nginx para servir os arquivos estáticos
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /src/dist /usr/share/nginx/html

# Exponha a porta 80
EXPOSE 80

# Comando para iniciar o servidor nginx
CMD ["nginx", "-g", "daemon off;"]
