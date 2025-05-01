FROM node:23-slim AS build
WORKDIR /app
COPY ./*  ./
LABEL maintainer="Ernestine"
RUN npm install && npm run build

#used official httpd image as base image
FROM httpd:2.4.51-buster
WORKDIR /app
COPY --from=build /app/build /usr/local/apache2/htdocs/
EXPOSE 80
CMD ["/bin/sh", "-c", "httpd-foreground" && npm start"]