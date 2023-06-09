# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the application code to the container
COPY . .

RUN npm run build

# Set the command to run the Next.js application
CMD ["npm", "start"]
# CMD ["npm", "run", "dev"]
