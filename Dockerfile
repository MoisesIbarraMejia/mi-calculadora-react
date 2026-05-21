# Paso 1: Compilar la aplicación de React con Node
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./

# Instalamos las dependencias base
RUN npm install

# Forzamos la instalación global de TypeScript para asegurar que exista 'tsc'
RUN npm install -g typescript

COPY . .
RUN npm run build

# Paso 2: Servir los archivos con un servidor web ultra rápido (Nginx)
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
