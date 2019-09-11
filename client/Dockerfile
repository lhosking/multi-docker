FROM node:alpine as builder 
WORKDIR '/app'
COPY package.json .
RUN npm install
COPY . .

FROM builder as dev
CMD [ "npm", "run", "start" ]

FROM dev as prod-build
RUN npm run build
# ^^^populates /app/build

FROM nginx as prod
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=prod-build /app/build /usr/share/nginx/html