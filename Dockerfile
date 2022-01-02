FROM node:16-alpine

WORKDIR /app

COPY package.json ./

COPY . ./

RUN npm run build
CMD ["npm", "run", "serve"]
