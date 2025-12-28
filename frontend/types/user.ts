export interface User {
  id: number;
  uuid: string;
  name: string;
  created_at: string;
  updated_at: string;
  profile: Profile | null;
  money: Money | null;
  player_level: PlayerLevel | null;
  user_position: UserPosition | null;
  count: Count | null;
  custom_name: CustomName | null;
}

export interface Profile {
  id: number;
  user_id: number;
  introduction: string;
  show_last_login: number;
  created_at: string;
  updated_at: string;
}

export interface Money {
  id: number;
  user_id: number;
  money: number;
  created_at: string;
  updated_at: string;
}

export interface PlayerLevel {
  id: number;
  user_id: number;
  total_exp: number;
  level_mode: number;
  created_at: string;
  updated_at: string;
  player_normal_level: PlayerNormalLevel | null;
}

export interface PlayerNormalLevel {
  id: number;
  user_id: number;
  exp: number;
  level: number;
  level_mode_total_exp: number;
  exp_for_next_level: number;
  created_at: string;
  updated_at: string;
}

export interface UserPosition {
  id: number;
  user_id: number;
  position_id: number;
  created_at: string;
  updated_at: string;
  position: Position | null;
}

export interface Position {
  id: number;
  name: string;
}

export interface Count {
  id: number;
  user_id: number;
  kill_death_count: KillDeathCount | null;
  life_count: LifeCount | null;
  ore_count: OreCount | null;
  player_count: PlayerCount | null;
}

export interface KillDeathCount {
  id: number;
  count_id: number;
  player_kill: number;
  mob_kill: number;
  ender_dragon_kill: number;
  wither_kill: number;
  death: number;
}

export interface LifeCount {
  id: number;
  count_id: number;
  fishing: number;
  block_break: number;
  block_place: number;
  flower_place: number;
  wood_break: number;
  gacha: number;
  gacha_rarity_count: number;
  gacha_ceiling_count: number;
}

export interface OreCount {
  id: number;
  count_id: number;
  coal_ore: number;
  iron_ore: number;
  gold_ore: number;
  lapis_ore: number;
  redstone_ore: number;
  emerald_ore: number;
  diamond_ore: number;
  copper_ore: number;
}

export interface PlayerCount {
  id: number;
  count_id: number;
  login: number;
  consecutive_login: number;
  last_login_date: string;
}

export interface CustomName {
  id: number;
  user_id: number;
  custom_name: string;
  created_at: string;
  updated_at: string;
}