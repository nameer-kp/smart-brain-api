create table users (id serial primary key,name varchar(100) not null,email text not null,entries bigInt DEFAULT 0,joined TIMESTAMP);
create table login (id int serial,hash text not null,email text not null);