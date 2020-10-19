FROM node:12.18.4-alpine3.9
WORKDIR /app
ADD ./ ./

ENV APPLICATION_PORT=3000
ENV MONGO_ENDPOINT=mongodb://mongo:27017
ENV MONGO_DATABASE=challenge

EXPOSE 3000

RUN ["npm", "install"]
RUN ["npm", "install", "pm2@3.5.0", "-g"]

CMD pm2 start process.yml && tail -f /dev/null
