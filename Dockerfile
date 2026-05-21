# Paso 1: Compilar la aplicación de React con Node 22 (Versión moderna compatible con Vite)
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./

# Desactivamos la verificación estricta de SSL de NPM para saltar el bloqueo de tu red de trabajo
RUN npm config set strict-ssl false

# Instalamos las dependencias base
RUN npm install

# Instalamos TypeScript globalmente ignorando las restricciones del certificado
RUN npm install -g typescript

COPY . .
RUN npm run build

# Paso 2: Servir los archivos con un servidor web ultra rápido (Nginx)
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
