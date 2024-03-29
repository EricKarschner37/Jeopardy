FROM node:16.7 as build-deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
ENV REACT_APP_WEBSOCKET_SERVER="jeopardy.karschner.studio"
RUN yarn build

FROM nginxinc/nginx-unprivileged:latest
COPY --from=build-deps /app/build /app
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
