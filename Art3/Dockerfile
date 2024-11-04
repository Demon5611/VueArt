# Используем базовый образ Node.js для сборки
FROM node:18 AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта в контейнер
COPY . .

# Собираем проект
RUN npm run build

# Создаем конечный легковесный образ с Nginx
FROM nginx:alpine

# Копируем сгенерированные файлы сборки Vue.js в Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Копируем конфигурационный файл Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Указываем порт, который будет открыт
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
