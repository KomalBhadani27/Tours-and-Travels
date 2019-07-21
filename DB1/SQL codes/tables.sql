set serveroutput on
create table user_table(username varchar(30),email varchar(30) not null,password varchar(30) not null,primary key(username),
	constraint uniq_user unique(email),constraint pass_check check(length(password)>=8),constraint mail_check check(email like '%@%.com'));

create table tour_list(tour_id varchar(10),tour_name varchar(30) not null,duration number not null,city varchar(20) not null,
	state varchar(20) not null,transport_type varchar(10) not null,primary key(tour_id));

create table residence_details(residence_id varchar(10),name varchar(20) not null,location varchar(30) not null,contact number,primary key(residence_id));

insert into residence_details values('R001', 'IVY stays', 'Riverfront', '9462973268');
insert into residence_details values('R002', 'PQR stays', 'Riverfront', '9462973268');
insert into residence_details values('R003', 'TXP stays', 'Riverfront', '9462973268');
insert into residence_details values('R004', 'GLO stays', 'Riverfront', '9462973268');
insert into residence_details values('R005', 'MUN stays', 'Riverfront', '9462973268');
insert into residence_details values('R006', 'MUN stays', 'Riverfront', '9462973268');
insert into residence_details values('R007', 'MUN stays', 'Riverfront', '9462973268');
insert into residence_details values('R008', 'MUN stays', 'Riverfront', '9462973268');
insert into residence_details values('R009', 'MUN stays', 'Riverfront', '9462973268');


create table tour_details(tour_id varchar(10) not null,residence_id varchar(10)not null,description varchar(500) not null, cost number not null,
	constraint f1 foreign key(tour_id) references tour_list(tour_id),constraint f2 foreign key(residence_id) references residence_details(residence_id));
--drop table tour_details; 
create table booking_details(booking_id varchar(10),username varchar(30),tour_id varchar(10),start_date date,end_date date,primary key(booking_id),
	constraint f3 foreign key(tour_id) references tour_list(tour_id),constraint f4 foreign key(username) references user_table(username));
    
insert into tour_list values ('T001', 'Raja', '3', 'Lucknow', 'U.P', 'BUS');
insert into tour_list values ('T002', 'Raja', '3', 'Lucknow', 'U.P', 'Train');
insert into tour_list values ('T003', 'Raja', '3', 'Lucknow', 'U.P', 'Flight');
insert into tour_list values ('T007', 'Raja', '3', 'Kota', 'Raj', 'BUS');
insert into tour_list values ('T008', 'Raja', '3', 'kota', 'Raj', 'Train');
insert into tour_list values ('T009', 'Raja', '3', 'kota', 'Raj', 'Flight');


insert into tour_details values ('T001', 'R001', 'Lucknow, the capital of Uttar Pradesh, lies in the middle of the Heritage Arc. This bustling city, famed for its Nawabi era finesse and amazing food, is a unique mix of the ancient and the modern.', '5000');
insert into tour_details values ('T002', 'R002', 'Lucknow, the capital of Uttar Pradesh, lies in the middle of the Heritage Arc. This bustling city, famed for its Nawabi era finesse and amazing food, is a unique mix of the ancient and the modern.', '7000');
insert into tour_details values ('T003', 'R003', 'Lucknow, the capital of Uttar Pradesh, lies in the middle of the Heritage Arc. This bustling city, famed for its Nawabi era finesse and amazing food, is a unique mix of the ancient and the modern.', '5000');
insert into tour_details values ('T004', 'R004', 'Lucknow, the capital of Uttar Pradesh, lies in the middle of the Heritage Arc. This bustling city, famed for its Nawabi era finesse and amazing food, is a unique mix of the ancient and the modern.', '12000');
insert into tour_details values ('T005', 'R005', 'Lucknow, the capital of Uttar Pradesh, lies in the middle of the Heritage Arc. This bustling city, famed for its Nawabi era finesse and amazing food, is a unique mix of the ancient and the modern.', '5000');
insert into tour_details values ('T006', 'R006', 'Lucknow, the capital of Uttar Pradesh, lies in the middle of the Heritage Arc. This bustling city, famed for its Nawabi era finesse and amazing food, is a unique mix of the ancient and the modern.', '5000');
insert into tour_details values ('T007', 'R007', 'Lucknow, the capital of Uttar Pradesh, lies in the middle of the Heritage Arc. This bustling city, famed for its Nawabi era finesse and amazing food, is a unique mix of the ancient and the modern.', '5000');
insert into tour_details values ('T008', 'R008', 'Lucknow, the capital of Uttar Pradesh, lies in the middle of the Heritage Arc. This bustling city, famed for its Nawabi era finesse and amazing food, is a unique mix of the ancient and the modern.', '5000');
insert into tour_details values ('T009', 'R009', 'Lucknow, the capital of Uttar Pradesh, lies in the middle of the Heritage Arc. This bustling city, famed for its Nawabi era finesse and amazing food, is a unique mix of the ancient and the modern.', '5000'set serveroutput on;
set serveroutput on;
select * from tour_details where rownum <= 6;

--select * from tour_list where city = 'Lucknow';
----select * from tour_list order by tour_id
----fetch next 6 rows only;
--select * from tour_details where tour_id = 'T001'