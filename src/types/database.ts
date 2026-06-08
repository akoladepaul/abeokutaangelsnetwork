export type Role = "investor" | "startup" | "admin";

export type MatchStatus = "pending" | "interested" | "connected" | "passed";

export interface Profile {
  id: string;
  role: Role;
  approved: boolean;
  created_at: string;
}

export interface InvestorProfile {
  id: string;
  user_id: string;
  full_name: string | null;
  headline: string | null;
  bio: string | null;
  linkedin_url: string | null;
  photo_url: string | null;
  sectors: string[];
  stages: string[];
  ticket_min: number;
  ticket_max: number;
  investments_pa: string | null;
  thesis: string | null;
  accredited: boolean;
  verified: boolean;
  updated_at: string;
}

export interface StartupProfile {
  id: string;
  user_id: string;
  company_name: string | null;
  tagline: string | null;
  description: string | null;
  sector: string | null;
  stage: string | null;
  location: string | null;
  founded_year: number | null;
  team_size: number | null;
  website: string | null;
  funding_ask: number | null;
  use_of_funds: string | null;
  deck_url: string | null;
  mrr: number | null;
  users_count: number | null;
  traction_notes: string | null;
  logo_url: string | null;
  approved: boolean;
  updated_at: string;
}

export interface Match {
  id: string;
  investor_id: string;
  startup_id: string;
  score: number;
  status: MatchStatus;
  investor_seen: boolean;
  startup_seen: boolean;
  created_at: string;
  updated_at: string;
  // Joined
  investor_profile?: InvestorProfile;
  startup_profile?: StartupProfile;
}

export interface Message {
  id: string;
  match_id: string;
  sender_id: string;
  body: string;
  read: boolean;
  created_at: string;
}

export interface SavedStartup {
  id: string;
  investor_id: string;
  startup_id: string;
  created_at: string;
  startup_profile?: StartupProfile;
}
