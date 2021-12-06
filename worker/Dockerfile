FROM node:16-alpine

WORKDIR '/app'

# Install dependencies
COPY ./package.json ./
RUN npm install

COPY . .

# Run startup command
CMD ["npm", "run", "start"]
