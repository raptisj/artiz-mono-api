FROM node:18

# Install MongoDB tools
# RUN apt-get update && \
#     apt-get install -y mongodb-clients && \
#     rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "start"]
