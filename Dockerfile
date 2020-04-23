# build stage
FROM node:11.13.0 as build-stage
MAINTAINER nguyentranhoan<nguyentranhoan13@gmail.com>
WORKDIR /usr/src/app
COPY package*.json ./
RUN NODE_ENV=development npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:1.13.12-alpine as production-stage
MAINTAINER nguyentranhoan<nguyentranhoan13@gmail.com>
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
