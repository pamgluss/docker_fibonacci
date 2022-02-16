## Build Phase
# Specify base image
FROM node:16-alpine as builder

# add working directory
WORKDIR '/app'

# Install dependencies
COPY ./package.json ./
RUN npm install --legacy-peer-deps
COPY . .

RUN npm run build

## Run Phase
FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html

# nginx starts up automatically
