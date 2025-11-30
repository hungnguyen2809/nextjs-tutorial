/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from 'clsx';
import * as JWT from 'jsonwebtoken';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const decodeJWT = <TPayload = any>(token: string) => {
  if (!token) return null;
  return JWT.decode(token) as TPayload;
};
