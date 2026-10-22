export interface LoginResponse {
  message: string;
  data: LoginData;
}

export interface LoginData {
  token: string;
  user: AuthUser;
  expires: string;
  expires_in: number;
}

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  image: string | null;
  mobile: string | null;
  gender: string | null;
  locale: string;
  status: string;
  login: string;
  onesignal_player_id: string | null;
  unreadNotifications: unknown[];
  image_url: string;
  modules: string[];
  roles: AuthRole[];
}

export interface AuthRole {
  id: number;
  name: string;
  display_name: string;
  description: string;
  created_at: string;
  updated_at: string;
  pivot: {
    user_id: number;
    role_id: number;
  };
  perms: unknown[];
}
