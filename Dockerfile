FROM node:16-alpine as build

WORKDIR /app

# install dependances
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

RUN ls -la /app/dist

# Use Nginx to serve the application
FROM nginx:stable-alpine

# Copy build files to the Nginx directory
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]