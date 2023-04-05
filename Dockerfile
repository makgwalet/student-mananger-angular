# Stage 1
FROM node:10-alpine as build-step

RUN mkdir -p /student-manager

WORKDIR /student-manager

COPY package.json /student-manager

RUN npm install

COPY . /student-manager

RUN npm run build --prod

# Stage 2

FROM nginx:1.17.1-alpine


COPY --from=build-step /student-manager/dist /usr/share/nginx/html
