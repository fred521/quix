FROM node:11

COPY ./ ./
WORKDIR /client
RUN npm install
WORKDIR /shared
RUN npm install
WORKDIR /service
RUN npm install
RUN npm run build

EXPOSE 3000
ENTRYPOINT ["npm", "start"]

