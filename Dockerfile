FROM nginx:1.19.2-alpine

COPY ./dist/gmp-dashboard /usr/share/nginx/html/gmp
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
