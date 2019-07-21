set serveroutput on
create table tour_details(tour_id varchar(10) not null,residence_id varchar(10)not null,description varchar(500) not null, cost number not null,
	constraint f1 foreign key(tour_id) references tour_list(tour_id),constraint f2 foreign key(residence_id) references residence_details(residence_id));
    drop table booking_details; 
create table booking_details(booking_id varchar(10),username varchar(30),tour_id varchar(10),start_date date,end_date date,primary key(booking_id),
	constraint f3 foreign key(tour_id) references tour_list(tour_id),constraint f4 foreign key(username) references user_table(username));
    
    
insert into tour_details values ('T001', 'R001', 'Lucknow, the capital of Uttar Pradesh, lies in the middle of the Heritage Arc. This bustling city, famed for its Nawabi era finesse and amazing food, is a unique mix of the ancient and the modern.', '5000');
insert into tour_details values ('T002', 'R002', 'Lucknow, the capital of Uttar Pradesh, lies in the middle of the Heritage Arc. This bustling city, famed for its Nawabi era finesse and amazing food, is a unique mix of the ancient and the modern.', '7000');
insert into tour_details values ('T003', 'R003', 'Lucknow, the capital of Uttar Pradesh, lies in the middle of the Heritage Arc. This bustling city, famed for its Nawabi era finesse and amazing food, is a unique mix of the ancient and the modern.', '5000');
insert into tour_details values ('T004', 'R004', 'Lucknow, the capital of Uttar Pradesh, lies in the middle of the Heritage Arc. This bustling city, famed for its Nawabi era finesse and amazing food, is a unique mix of the ancient and the modern.', '12000');
insert into tour_details values ('T005', 'R005', 'Lucknow, the capital of Uttar Pradesh, lies in the middle of the Heritage Arc. This bustling city, famed for its Nawabi era finesse and amazing food, is a unique mix of the ancient and the modern.', '5000');
insert into tour_details values ('T006', 'R006', 'Lucknow, the capital of Uttar Pradesh, lies in the middle of the Heritage Arc. This bustling city, famed for its Nawabi era finesse and amazing food, is a unique mix of the ancient and the modern.', '5000');
insert into tour_details values ('T007', 'R007', 'Lucknow, the capital of Uttar Pradesh, lies in the middle of the Heritage Arc. This bustling city, famed for its Nawabi era finesse and amazing food, is a unique mix of the ancient and the modern.', '5000');
insert into tour_details values ('T008', 'R008', 'Lucknow, the capital of Uttar Pradesh, lies in the middle of the Heritage Arc. This bustling city, famed for its Nawabi era finesse and amazing food, is a unique mix of the ancient and the modern.', '5000');
insert into tour_details values ('T009', 'R009', 'Lucknow, the capital of Uttar Pradesh, lies in the middle of the Heritage Arc. This bustling city, famed for its Nawabi era finesse and amazing food, is a unique mix of the ancient and the modern.', '5000'set serveroutput on;
set serveroutput on
select * from tour_details where rownum <= 6;
select * from tour_details;
select * from tour_list;