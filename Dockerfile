# Paso 1: Compilar la aplicación de React con Node
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
# Forzamos la instalación de todas las dependencias incluyendo TypeScript
RUN npm install --include=dev
COPY . .
RUN npm run build

# Paso 2: Servir los archivos con un servidor web ultra rápido (Nginx)
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
