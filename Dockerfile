FROM node:18 AS builder

ARG VITE_GOOGLE_CLIENTID

WORKDIR /app/puppy-spa

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

FROM scratch AS package

WORKDIR /app/puppy-spa

COPY --from=builder /app/puppy-spa/dist ./dist
