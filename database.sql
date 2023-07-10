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
date date default current_date, 
foreign key(user_id) references users(user_id))

create table foods(
  food_id serial,
  food_name varchar(255) not null,
  quantity varchar(255) not null,
  shed int not null,
  user_id int,animal_id int,
  f_date date default current_date,
  primary key(food_id),
  foreign key(user_id)references users(user_id),
  foreign key(animal_id) references animals(animal_id)
);

create table doctors(
  doctor_id serial primary key,
  doctor_name varchar(255) not null,
  contact int,
  user_id int , 
  foreign key(user_id) references users(user_id)
);

create table vaccine_infos(
  animal_id int,
  doctor_id int,
  vaccine_name varchar(255) not null,
  user_id int,
  vaccine_date date default current_date,
  primary key(animal_id,doctor_id),
  foreign key(animal_id) references animals(animal_id),
  foreign key(doctor_id) references doctors(doctor_id)
);

create table expenses(
  expense_id serial primary key,
  discription varchar(255),
  amount int not null,
  user_id int,
  foreign key(user_id) references users(user_id)
);

create table weights(
  weight_id serial primary key,
  animal_weight int not null,
  user_id int ,
  foreign key(user_id) references users(user_id)
);


create table animal_weight(
  animal_id int,
  weight_id int,
  primary key(animal_id,weight_id),
  foreign key(animal_id) references animals(animal_id),
  foreign key(user_id) references users(user_id)
)