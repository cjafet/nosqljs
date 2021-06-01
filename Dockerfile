FROM mysql:5.7

COPY ./product.sql /docker-entrypoint-initdb.d

ENV MYSQL_DATABASE=Products
ENV MYSQL_ROOT_PASSWORD=123456

EXPOSE 3306