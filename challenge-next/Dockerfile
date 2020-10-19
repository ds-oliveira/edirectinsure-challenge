FROM node:12.18.4-alpine3.9
WORKDIR /app
ADD ./ ./

ENV BACKEND_API_URL=http://api:3000
ENV BACKEND_API_KEY=hDb0Euw9wKYBk6vr26Gr816x7ITSFeE1

EXPOSE 80

RUN ["npm", "install"]
RUN ["npm", "run", "build"]

CMD ["npm", "run", "start"]
