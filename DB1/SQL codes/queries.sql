SELECT tour_list.city, tour_list.state, tour_details.description
FROM tour_list INNER JOIN tour_details ON tour_list.tour_id = tour_details.tour_id;
commit;

SELECT tour_list.city, tour_list.state, tour_details.description FROM tour_list INNER JOIN tour_details ON tour_list.tour_id = tour_details.tour_id where tour_list.city = 'kota';

SELECT DISTINCT * FROM tour_list;
update tour_list set city = 'Kota' where tour_id = 'T009';
update tour_details set tour_type = 'camping' where tour_id = 'T002';
alter table tour_details ADD tour_type varchar2(20);
update tour_details set tour_type = 'Romance' where tour_id = 'T009';
SELECT DISTINCT tour_type FROM tour_details;
update tour_list set duration = '5' where tour_id = 'T009';

commit;

select tour_list.duration, tour_details.resindence_id, residence_details.name from ((tour_list INNER JOIN tour_details ON tour_list.tour_id = tour_details.tour_id) )

select tour_list.duration,tour_details.residence_id,residence_details.name from 
((tour_list INNER JOIN tour_details ON tour_list.tour_id = tour_details.tour_id) inner join residence_details on tour_details.residence_id = residence_details.residence_id) ;