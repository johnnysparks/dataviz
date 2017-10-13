select
	distinct(history) as flow,
	count(*) as count
from
(
	select
		LISTAGG(event,'-') within group (order by occurred_date) as history
	from
		actions_client
	where
		client_id in (select distinct(client_id) as client_id from actions_client order by occurred_date limit 10000 offset 0)
	group by
		client_id
) as flow_table
group by
	flow;
	



--(select distinct(client_id) as client_id from actions_client order by occurred_date limit 10 offset 10);


--select distinct(event) as event from actions_client;