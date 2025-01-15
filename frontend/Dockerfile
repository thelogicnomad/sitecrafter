# use the node.js image for building
FROM node:16-alpine as build 

# Set the working directory
WORKDIR /app

# copy the package.json and install the dependencies
COPY package*.json ./
RUN npm install

# copy the rest of the applications code
COPY . .

# build the react app
RUN npm run build

# Use an nginx image to serve the built files
FROM nginx:alpine

# Copy the build files to nginx's default directory
COPY --from=build /app/build /usr/share/nginx/html

# expose port 80 (default for nginx)
EXPOSE 80

# Start nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]