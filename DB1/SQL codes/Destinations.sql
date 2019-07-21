set serveroutput on;

create table Accomodation(
Acc_id varchar2(10) not null,
Start_date varchar2(10),
End_date varchar2(10),
status varchar2(1000),
location varchar2(50),
Cost varchar2(50),
type varchar2(50),
User_id varchar2(10) not null,
PRIMARY KEY (Acc_id)
);

insert into Accomodation values ('A001', ' ', ' ', ' ', ' ', ' ', ' ', 'U001');
insert into Accomodation values ('A002', ' ', ' ', ' ', ' ', ' ', ' ', 'U002');
insert into Accomodation values ('A003', ' ', ' ', ' ', ' ', ' ', ' ', 'U003');
--select * FROM Accomodation;


create table destination(place_id varchar2(10) not null, city varchar2(10) not null, state varchar2(10) not null, description varchar2(1000),
 Acc_id varchar2(10) not null REFERENCES Accomodation (Acc_id),
 PRIMARY KEY (place_id));
insert into destination values('D001', 'Lucknow', 'U.P', 'Lucknow, the capital of Uttar Pradesh, lies in the middle of the Heritage Arc. This bustling city, famed for its Nawabi era finesse and amazing food, is a unique mix of the ancient and the modern.', 'A001');
insert into destination values('D002', 'kota', 'Rajasthan', 'Kota, has a lot on offer for your perusal. The desert city cites an attractive historical beginning and has seen a lot of valour, majesty, courtliness and grandeur, etching India’s glorious monarchy.', 'A002');
insert into destination values('D003', 'jhunsi', 'U.P', 'Jhunsi, has a lot on offer for your perusal. The desert city cites an attractive historical beginning and has seen a lot of valour, majesty, courtliness and grandeur, etching India’s glorious monarchy.', 'A002');
select * FROM destination;

create table user_tab(User_id VARCHAR2(10) not null, name varchar2(100), password varchar2(100) not null, PRIMARY KEY (User_id));
insert into user_tab values ('U001', ' ', ' ');

select * from Accomodation;

drop table destination;
