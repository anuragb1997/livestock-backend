-- users table 
create table users(
  user_id serial primary key,
  email varchar(255) unique not null,
  password varchar(255) not null,
  created_at date default current_date
);

create table animals(
  animal_id serial primary key,
  animal_name varchar(255) not null,
  tag_no varchar(255) unique not null,
  breed varchar(255) not null,
  statu varchar(255),
  shed int not null,
  user_id int,
  p_date date default current_date,
  foreign key(user_id) references users(user_id)
);

create table shed(
  shed_id serial primary key,
  shed_name varchar(255),
  
  )


create table animals(
aid serial primary key,
name varchar(255),
breed varchar(255),
type varchar(255),
sex varchar(255),
status varchar(255),
weight int,
ev int,
color varchar(255),
height int,
age int,
shed_no int,
user_id int,
date date default current_date, 
foreign key(user_id) references users(user_id),
foreign key(shed_no) references shed(shed_id)
)



create table foods(
  food_id serial,
  food_name varchar(255) not null,
  user_id int,
  primary key(food_id),
  foreign key(user_id)references users(user_id)
  )

create table eat(
  food_id int,
  shed_id int,
  foreign key(food_id) references foods(food_id),
  foreign key(shed_id) references shed(shed_id)
)
create table doctors(
  doctor_id serial primary key,
  doctor_name varchar(255) not null,
  contact int,
  foreign key(user_id) references users(user_id)
);

create table vaccine_infos(
  aid int,
  doctor_id int,
  vaccine_name varchar(255) not null,
  vaccine_date date default current_date,
  foreign key(aid) references animals(aid),
  foreign key(doctor_id) references doctors(doctor_id)
);

create table expenses(
  expense_id serial primary key,
  discription varchar(255),
  amount int not null,
  user_id int,
  foreign key(user_id) references users(user_id)
);



create table animal_weight(
  weight_id serial primary key,
  aid int,
  weight int,
  weight_date date default current_date,
  foreign key(aid) references animals(aid))