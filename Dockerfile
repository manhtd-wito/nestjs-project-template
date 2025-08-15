# Fetching the minified node image on apline linux
FROM node:iron

# Setting up the work directory
WORKDIR /app

# COPY package.json
COPY package.json /app

# Installing dependencies
RUN npm install

# Copying all the files in our project
COPY . /app

# Build dist
RUN npm run build

# Exposing server port
EXPOSE 3000

# Starting our application
CMD ["npm", "start"]
