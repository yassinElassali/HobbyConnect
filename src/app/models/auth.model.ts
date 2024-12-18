export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegistrationData {
  email: string;
  password: string;
  username: string;
  displayName: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordUpdate {
  token: string;
  newPassword: string;
}