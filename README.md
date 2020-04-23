# Frontend Dropship

### docker-compose.yml
```
version: '3'
networks:
    app-network:
        driver: bridge

services:
  fe_dropship:
    build:
      context: ./fe_dropship
      dockerfile: dev.Dockerfile
    volumes:
      - ./fe_dropship:/usr/src/app
      - /usr/src/app/node_modules
    networks:
      - reverse-proxy
    ports:
      - 8092:8080
    environment:
      - CHOKIDAR_USEPOLLING=true
      - npm_config_unsafe_perm=true
    restart: unless-stopped

  #PHP Service
  app:
    build:
        context: .
        dockerfile: Dockerfile
    image: digitalocean.com/php
    container_name: app
    restart: unless-stopped
    tty: true
    environment:
        SERVICE_NAME: app
        SERVICE_TAGS: dev
    working_dir: /var/www
    volumes:
        - ./:/var/www
        - ./php/local.ini:/usr/local/etc/php/conf.d/local.ini
    networks:
        - app-network

  #Nginx Service
  webserver:
    image: nginx:alpine
    container_name: webserver
    restart: unless-stopped
    tty: true
    ports:
        - "8888:80"
        - "443:443"
    volumes:
        - ./:/var/www
        - ./nginx/conf.d/:/etc/nginx/conf.d/
    networks:
      - app-network

  #MySQL Service
  db:
    image: mysql:5.7.22
    container_name: db
    restart: unless-stopped
    tty: true
    ports:
        - "33068:3306"
    environment:
      MYSQL_DATABASE: dropship
      MYSQL_ROOT_PASSWORD: dropship
      SERVICE_TAGS: dev
      SERVICE_NAME: mysql
    volumes:
        - dbdata:/var/lib/mysql
        # - ./mysql/my.cnf:/etc/mysql/my.cnf
    networks:
        - app-network

volumes:
    dbdata:
        driver: local
```

### dev.Dockerfile Frontend
```
FROM node:11.13.0
MAINTAINER Nguyễn Trần Hoàn<hoan.nguyen@futa.vn>
ENV NODE_ENV=dev
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --verbose
ENV NODE_PATH=/usr/src/app/node_modules
RUN npm install -g @vue/cli
# COPY . .
EXPOSE 8080
CMD ["npm","run","serve"]
```

### dev.Dockerfile Api
```
FROM php:7.2-fpm

# Copy composer.lock and composer.json
COPY composer.lock composer.json /var/www/

# Set working directory
WORKDIR /var/www

# Install dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    mariadb-client \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    locales \
    zip \
    jpegoptim optipng pngquant gifsicle \
    vim \
    unzip \
    git \
    curl

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install extensions
RUN docker-php-ext-install pdo_mysql mbstring zip exif pcntl
RUN docker-php-ext-configure gd --with-gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ --with-png-dir=/usr/include/
RUN docker-php-ext-install gd

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Add user for laravel application
RUN groupadd -g 1000 www
RUN useradd -u 1000 -ms /bin/bash -g www www

# Copy existing application directory contents
COPY . /var/www

# Copy existing application directory permissions
COPY --chown=www:www . /var/www

# Change current user to www
USER www

# Expose port 9000 and start php-fpm server
EXPOSE 9000
CMD ["php-fpm"]
```

### Config db .env Api
```
DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=dropship
DB_USERNAME=dropship
DB_PASSWORD=dropship
```
*DB_HOST là tên container db ở docker-compose*

### Run setup docker
```
cp .env.example .env
docker-compose up -d

docker-compose exec app bash
  *www@8125b8453342:/var/www$* ***php artisan key:generate***
  *www@8125b8453342:/var/www$* ***php artisan config:cache***

docker-compose exec db bash
  *root@2705a5f4ea79:/#* ***mysql -u root -p***
    (Pass là MYSQL_ROOT_PASSWORD ở docker-compose.yml)
  *mysql>* ***show databases;***
  *mysql>* ***GRANT ALL ON dropship.* TO 'dropship'@'%' IDENTIFIED BY 'dropship';***
    (dropship là pass ở env)
  *mysql>* ***FLUSH PRIVILEGES;***

docker-compose exec app bash
  *www@8125b8453342:/var/www$* ***php artisan migrate***
```

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Lints and fixes files
```
yarn run lint
```

### Run your unit tests
```
yarn run test:unit
```
# futa-ticket-admin
