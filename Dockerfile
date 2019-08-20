FROM nginx
MAINTAINER scott.chen@sixonetech.com
RUN mkdir -p /usr/share/game/soltmgmt
RUN mkdir -p /etc/nginx/ssl
COPY nginx.conf /etc/nginx/nginx.conf
COPY soltmgmt-web.conf /etc/nginx/conf.d/default.conf
COPY soltmgmt-server.conf /etc/nginx/conf.d/soltmgmt-server.conf
COPY build /usr/share/game/soltmgmt
VOLUME ["/usr/share/game/soltmgmt"]
VOLUME ["/etc/nginx/conf.d"]
VOLUME ["/etc/nginx/ssl"]
EXPOSE 80
EXPOSE 443
EXPOSE 8080
