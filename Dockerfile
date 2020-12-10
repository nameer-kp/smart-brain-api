FROM node
ENV DB_USER_NAME=postgres\
	DB_PASS=123456\
	PORT=3001
#RUN mkdir -p /home/app
#COPY ./backend /home/app
WORKDIR /app
CMD ["node","/app/server.js"]
