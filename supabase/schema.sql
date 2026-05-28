create table users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  favorite_player text not null
);

create table tips (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  match_id integer,
  home_tip integer,
  away_tip integer
);
