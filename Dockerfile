FROM node:alpine3.18

WORKDIR /react-frontend

COPY . .

RUN npm ci
RUN ./node_modules/vite/bin/vite.js build

CMD ["./node_modules/vite/bin/vite.js", "--mode", "production", "--host", "0.0.0.0", "--port", "5173"]
