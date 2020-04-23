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
