
# FROM node:18-alpine
# WORKDIR /app
# COPY . .
# RUN npm install
# RUN npm run build
# RUN npm install -g serve
# CMD serve -s build -l 80




# build stage
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci && npm cache clean --force
COPY . .
RUN npm run build
#################################
# production stage
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/build .
COPY nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
