FROM node:19.8.1-alpine
WORKDIR /app/frontend

COPY . .
#RUN npm install

EXPOSE 3000
#CMD npm run dev