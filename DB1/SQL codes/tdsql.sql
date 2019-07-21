select*from contact;
set serveroutput on;
select * from tour_details;
SELECT tour_list.tour_id, tour_list.city, tour_list.state, tour_details.description FROM tour_list INNER JOIN tour_details ON tour_list.tour_id = tour_details.tour_id where rownum <= 6;
ALTER TABLE booking_details
  ADD no_Adults VARCHAR(50);
ALTER TABLE booking_details
  ADD no_Children VARCHAR(50);
ALTER TABLE booking_details
  ADD Hotel VARCHAR(50);
  ALTER TABLE booking_details
  ADD Address_line1 VARCHAR(50);
  ALTER TABLE booking_details
  ADD Address_line2 VARCHAR(50);
  ALTER TABLE booking_details
  ADD town VARCHAR(50);
  ALTER TABLE booking_details
  ADD Postal_code VARCHAR(50);
  ALTER TABLE booking_details
  ADD country VARCHAR(50);
  ALTER TABLE booking_details
  ADD Phone_no VARCHAR(50);
  
  
  
  insert into booking_details
  values ('',user_table.username,'')  where booking Id.usernnme;
  insert into user_table values ('Lakhan','email@gmail.com','password');
  desc booking_details;
  desc user_table;
  drop table booking_details;
create table booking_details(booking_id varchar(10),username varchar(30),tour_id varchar(10),start_date varchar2(50),duration varchar2(50),primary key(booking_id),
	constraint f3 foreign key(tour_id) references tour_list(tour_id));
create table contact(f_name varchar(500),email varchar(300), subject varchar2(100),message varchar2(500),primary key(f_name,email));    
select * from contact;
drop table contact;
select * from booking_details;
DELETE FROM booking_details;
commit;
insert into booking_details values ('B001', 'ram', 'T001', 'aDF', '4', '2', '3', 'fdsgegersgreg');