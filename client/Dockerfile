# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Install app dependencies
COPY package.json .
RUN npm install

# Copy app source code
COPY . .

# Expose the port used by the app
EXPOSE 3000

# Start the app
CMD [ "npm", "start" ]
