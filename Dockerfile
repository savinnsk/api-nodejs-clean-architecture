FROM node:18-alpine
WORKDIR /usr/src/clean-node-api

# copy the file package.json to the container
COPY  package.json ./

RUN npm install
# copy the folder dist to the container

# COPY ./dist ./dist
# open port 5000

# EXPOSE 5000

# CMD npm start