CREATE TABLE tables
(
id serial PRIMARY KEY,
num integer,
capacity integer
);

CREATE TABLE reservations
(
id integer,
table_id integer REFERENCES tables(id) ON DELETE CASCADE,
start_time char(32),
end_time char(32),
guests integer,
PRIMARY KEY (id, table_id)
);
