# -------- Stage 1: Build Vite App --------
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# -------- Stage 2: Serve with Apache --------
FROM httpd:alpine

# Create custom Apache config (optional)
# COPY ./my-httpd.conf /usr/local/apache2/conf/httpd.conf

# Remove default files and copy your app
RUN rm -rf /usr/local/apache2/htdocs/*
COPY --from=builder /app/dist/ /usr/local/apache2/htdocs/

EXPOSE 80
CMD ["httpd-foreground"]


# # -------- Stage 1: Build with Node --------
# FROM node:18 AS builder

# WORKDIR /app

# COPY package*.json ./
# RUN npm install

# COPY . .
# RUN npm run build

# # -------- Stage 2: Serve with Nginx --------
# FROM nginx:alpine

# # Remove default nginx static files
# RUN rm -rf /usr/share/nginx/html/*

# # Copy built app from builder stage
# COPY --from=builder /app/dist /usr/share/nginx/html

# # Copy custom nginx config (optional)
# # COPY nginx.conf /etc/nginx/nginx.conf

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]


