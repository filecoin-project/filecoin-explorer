FROM node:11

# Default local filecoin
ARG REACT_APP_API_URL="http://127.0.0.1:3453"
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN yarn install

# Bundle app source
COPY . .

RUN yarn build

FROM nginx:1.15
MAINTAINER Filecoin Dev Team

COPY --from=0 /usr/src/app/build /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
