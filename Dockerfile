FROM node:16.7 as build-deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
ENV REACT_APP_WEBSOCKET_SERVER="go-jeopardy-jeopardy.apps.okd4.csh.rit.edu"
RUN yarn build

FROM nginx:1.21-alpine
COPY --from=build-deps /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
