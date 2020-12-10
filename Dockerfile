FROM node
ENV DB_USER_NAME=postgres\
	DB_PASS=123456
RUN mkdir -p /home/app
COPY . /home/app
CMD ["node","/home/app/server.js"]
