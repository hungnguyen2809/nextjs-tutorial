/* eslint-disable @typescript-eslint/no-explicit-any */
import { ENV } from '@/configs/env';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

type RequetsOptionType = Omit<RequestInit, 'method'> & {
  baseUrl?: string;
};

export class HttpError extends Error {
  public data: any;
  public status: number;

  constructor(status: number, message: string, data?: any) {
    super(message);
    this.data = data;
    this.status = status;
  }
}

class SessionToken {
  private token: string = '';

  get value() {
    return this.token;
  }

  set value(token: string) {
    if (typeof window === 'undefined') {
      throw new Error('Cannot set token on server side');
    }
    this.token = token;
  }
}

export const clientSessionToken = new SessionToken();

const request = async <TResponse>(url: string, method: RequestMethod, options?: RequetsOptionType) => {
  const body = options?.body ? JSON.stringify(options.body) : undefined;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: clientSessionToken.value ? `Bearer ${clientSessionToken.value}` : '',
    ...options?.headers,
  };
  const baseUrl = options?.baseUrl ? options?.baseUrl : ENV.NEXT_PUBLIC_API_ENDPOINT;
  const fullUrl = url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`;

  const response = await fetch(fullUrl, {
    ...options,
    body: body,
    method: method,
    headers: headers,
  });

  const payload: TResponse & { message?: string } = await response.json();

  if (!response.ok) {
    throw new HttpError(response.status, payload.message || 'Http Error', payload);
  }

  return { data: payload, status: response.status };
};

export const http = {
  get: <TResponse>(url: string, options?: Omit<RequetsOptionType, 'body'>) => {
    return request<TResponse>(url, 'GET', options);
  },
  post: <TResponse>(url: string, body?: any, options?: Omit<RequetsOptionType, 'body'>) => {
    return request<TResponse>(url, 'POST', { ...options, body });
  },
  put: <TResponse>(url: string, body?: any, options?: Omit<RequetsOptionType, 'body'>) => {
    return request<TResponse>(url, 'PUT', { ...options, body });
  },
  delete: <TResponse>(url: string, body?: any, options?: Omit<RequetsOptionType, 'body'>) => {
    return request<TResponse>(url, 'DELETE', { ...options, body });
  },
};
