-- ============================================================
-- Abeokuta Angels Network — Supabase Schema
-- Run this in the Supabase SQL editor
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================================
-- PROFILES (extends auth.users)
-- ============================================================
create table public.profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  role         text not null check (role in ('investor', 'startup', 'admin')),
  approved     boolean default false,
  created_at   timestamptz default now()
);
alter table public.profiles enable row level security;
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Admins can view all" on public.profiles for select using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- ============================================================
-- INVESTOR PROFILES
-- ============================================================
create table public.investor_profiles (
  id               uuid primary key default uuid_generate_v4(),
  user_id          uuid unique not null references public.profiles(id) on delete cascade,
  full_name        text,
  headline         text,
  bio              text,
  linkedin_url     text,
  photo_url        text,
  sectors          text[] default '{}',
  stages           text[] default '{}',
  ticket_min       bigint default 5000000,
  ticket_max       bigint default 50000000,
  investments_pa   text,
  thesis           text,
  accredited       boolean default false,
  verified         boolean default false,
  updated_at       timestamptz default now()
);
alter table public.investor_profiles enable row level security;
create policy "Investors can manage own profile" on public.investor_profiles
  for all using (user_id = auth.uid());
create policy "Approved investors see all investor profiles" on public.investor_profiles
  for select using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'investor' and approved = true)
  );

-- ============================================================
-- STARTUP PROFILES
-- ============================================================
create table public.startup_profiles (
  id               uuid primary key default uuid_generate_v4(),
  user_id          uuid unique not null references public.profiles(id) on delete cascade,
  company_name     text,
  tagline          text,
  description      text,
  sector           text,
  stage            text,
  location         text,
  founded_year     int,
  team_size        int,
  website          text,
  funding_ask      bigint,
  use_of_funds     text,
  deck_url         text,
  mrr              bigint,
  users_count      int,
  traction_notes   text,
  logo_url         text,
  approved         boolean default false,
  updated_at       timestamptz default now()
);
alter table public.startup_profiles enable row level security;
create policy "Startup can manage own profile" on public.startup_profiles
  for all using (user_id = auth.uid());
create policy "Approved investors can view approved startups" on public.startup_profiles
  for select using (
    approved = true and
    exists (select 1 from public.profiles where id = auth.uid() and role in ('investor','admin') and approved = true)
  );

-- ============================================================
-- MATCHES
-- ============================================================
create table public.matches (
  id             uuid primary key default uuid_generate_v4(),
  investor_id    uuid not null references public.investor_profiles(id) on delete cascade,
  startup_id     uuid not null references public.startup_profiles(id) on delete cascade,
  score          int default 0,
  status         text not null default 'pending' check (status in ('pending','interested','connected','passed')),
  investor_seen  boolean default false,
  startup_seen   boolean default false,
  created_at     timestamptz default now(),
  updated_at     timestamptz default now(),
  unique(investor_id, startup_id)
);
alter table public.matches enable row level security;
create policy "Investor sees own matches" on public.matches for select using (
  investor_id in (select id from public.investor_profiles where user_id = auth.uid())
);
create policy "Startup sees own matches" on public.matches for select using (
  startup_id in (select id from public.startup_profiles where user_id = auth.uid())
);
create policy "Investor updates own matches" on public.matches for update using (
  investor_id in (select id from public.investor_profiles where user_id = auth.uid())
);

-- ============================================================
-- SAVED (investor bookmarks)
-- ============================================================
create table public.saved_startups (
  id          uuid primary key default uuid_generate_v4(),
  investor_id uuid not null references public.investor_profiles(id) on delete cascade,
  startup_id  uuid not null references public.startup_profiles(id) on delete cascade,
  created_at  timestamptz default now(),
  unique(investor_id, startup_id)
);
alter table public.saved_startups enable row level security;
create policy "Investor manages own saved" on public.saved_startups for all using (
  investor_id in (select id from public.investor_profiles where user_id = auth.uid())
);

-- ============================================================
-- MESSAGES
-- ============================================================
create table public.messages (
  id          uuid primary key default uuid_generate_v4(),
  match_id    uuid not null references public.matches(id) on delete cascade,
  sender_id   uuid not null references auth.users(id),
  body        text not null,
  read        boolean default false,
  created_at  timestamptz default now()
);
alter table public.messages enable row level security;
create policy "Match participants can read messages" on public.messages for select using (
  match_id in (
    select m.id from public.matches m
    join public.investor_profiles ip on ip.id = m.investor_id
    join public.startup_profiles sp on sp.id = m.startup_id
    where ip.user_id = auth.uid() or sp.user_id = auth.uid()
  )
);
create policy "Match participants can insert messages" on public.messages for insert with check (
  sender_id = auth.uid() and
  match_id in (
    select m.id from public.matches m
    join public.investor_profiles ip on ip.id = m.investor_id
    join public.startup_profiles sp on sp.id = m.startup_id
    where ip.user_id = auth.uid() or sp.user_id = auth.uid()
  )
);

-- ============================================================
-- MATCHING FUNCTION
-- Scores investor-startup compatibility (0-100)
-- ============================================================
create or replace function compute_match_score(
  p_investor_id uuid,
  p_startup_id  uuid
) returns int language plpgsql as $$
declare
  v_investor investor_profiles%rowtype;
  v_startup  startup_profiles%rowtype;
  v_score    int := 0;
begin
  select * into v_investor from investor_profiles where id = p_investor_id;
  select * into v_startup  from startup_profiles  where id = p_startup_id;

  -- Sector match (40 pts)
  if v_startup.sector = any(v_investor.sectors) then
    v_score := v_score + 40;
  end if;

  -- Stage match (30 pts)
  if v_startup.stage = any(v_investor.stages) then
    v_score := v_score + 30;
  end if;

  -- Ticket size fit (20 pts)
  if v_startup.funding_ask between v_investor.ticket_min and v_investor.ticket_max then
    v_score := v_score + 20;
  elsif v_startup.funding_ask <= v_investor.ticket_max * 2 then
    v_score := v_score + 10;
  end if;

  -- Approved bonus (10 pts)
  if v_startup.approved then
    v_score := v_score + 10;
  end if;

  return v_score;
end;
$$;

-- ============================================================
-- AUTO-GENERATE MATCHES when a startup is approved
-- ============================================================
create or replace function generate_matches_for_startup(p_startup_id uuid)
returns void language plpgsql as $$
declare
  v_investor record;
  v_score    int;
begin
  for v_investor in select id from investor_profiles loop
    v_score := compute_match_score(v_investor.id, p_startup_id);
    if v_score >= 30 then
      insert into matches(investor_id, startup_id, score)
      values (v_investor.id, p_startup_id, v_score)
      on conflict (investor_id, startup_id) do update set score = excluded.score;
    end if;
  end loop;
end;
$$;

-- ============================================================
-- TRIGGER: generate matches when startup is approved
-- ============================================================
create or replace function on_startup_approved()
returns trigger language plpgsql as $$
begin
  if new.approved = true and (old.approved = false or old.approved is null) then
    perform generate_matches_for_startup(new.id);
  end if;
  return new;
end;
$$;

create trigger startup_approved_trigger
after update on startup_profiles
for each row execute function on_startup_approved();

-- ============================================================
-- TRIGGER: create profile on user signup
-- ============================================================
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles(id, role)
  values (new.id, coalesce(new.raw_user_meta_data->>'role', 'startup'));
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();
