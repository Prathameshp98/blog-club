# Use the official Node.js image as the base image
FROM node:15.14

# Set the working directory in the container
WORKDIR /app

# Copy the application files into the working directory
COPY . /app

# Install the application dependencies
RUN yarn install

# Define the entry point for the container
EXPOSE 8282
CMD ["npm", "start"]