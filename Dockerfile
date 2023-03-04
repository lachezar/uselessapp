FROM node:alpine AS build

WORKDIR /uselessapp

COPY . .
RUN yarn install --frozen-lockfile
RUN yarn build

FROM caddy:alpine

COPY --from=build /uselessapp/public/ /usr/share/caddy/
COPY --from=build /uselessapp/Caddyfile /etc/caddy/Caddyfile
