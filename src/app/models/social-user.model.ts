export interface SocialUser {
  id: string;
  email: string;
  name: string;
  photoUrl: string;
  provider: 'google' | 'facebook';
  token: string;
}