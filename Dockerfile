FROM node:latest-alpine

# set working directory
WORKDIR /app

# install app dependencies
COPY package.json ./
RUN yarn

COPY . ./
RUN npm run build
CMD ["npm", "run", "serve"]
