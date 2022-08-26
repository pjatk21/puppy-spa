FROM node:18 AS builder

WORKDIR /app/puppy-spa

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

FROM scratch AS package

COPY --from=builder /app/puppy-spa/dist /dist
