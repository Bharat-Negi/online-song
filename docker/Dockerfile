FROM node:alpine

COPY app /opt/contactcentre
COPY docker/test.sh /opt/contactcentre

WORKDIR /opt/contactcentre

RUN chmod +x /opt/contactcentre/test.sh && ln -svf /opt/contactcentre/test.sh /usr/bin/test.sh
RUN apk --no-cache add nginx curl && mkdir -p /run/nginx

COPY docker/nginx.conf /etc/nginx/nginx.conf

RUN npm install && npm run build

HEALTHCHECK --interval=3s --timeout=5s --retries=3 CMD test.sh

CMD ["nginx","-c","/etc/nginx/nginx.conf"]
