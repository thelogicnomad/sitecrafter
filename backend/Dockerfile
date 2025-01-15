# Use a Node.js image for the backend
FROM node:18-alpine

#  Set the working directory
WORKDIR /app

# Copy the package.json and install the dependencies
COPY package*.json ./
RUN npm install

# copy the rest of the application code
COPY . .

# Expose the backend port
EXPOSE 5000

# start the background server
CMD ["npm","run", "dev"]