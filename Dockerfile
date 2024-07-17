# Etapa de desarrollo - Instalación de dependencias
FROM node:22.3.0 as dev-deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --force

# Etapa de construcción - Compilación de la aplicación
FROM dev-deps as builder
COPY . .
RUN npm run build --prod

# Etapa de producción - Servidor Nginx
FROM nginx:1.23.3
EXPOSE 80
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/vex/ /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
