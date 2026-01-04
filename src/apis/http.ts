/* eslint-disable @typescript-eslint/no-explicit-any */
import { ENV } from '@/configs/env';
import { AppStorage } from '@/lib/storage';
import { redirect } from 'next/navigation';

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

export const isClient = () => typeof window !== 'undefined';

const request = async <TResponse>(url: string, method: RequestMethod, options?: RequetsOptionType) => {
  let body: FormData | string | undefined = undefined;
  if (options?.body instanceof FormData) {
    body = options.body;
  } else if (options?.body) {
    body = JSON.stringify(options.body);
  }

  let sessionToken: string | null = null;
  if (isClient()) {
    sessionToken = AppStorage.getSessionToken();
  }

  const baseHeader = body instanceof FormData ? {} : ({ 'Content-Type': 'application/json' } as HeadersInit);
  const headers: HeadersInit = {
    ...baseHeader,
    Authorization: sessionToken ? `Bearer ${sessionToken}` : '',
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
    if (response.status === 401) {
      if (isClient()) {
        //logout from client
        try {
          await fetch(`${window.location.origin}/api/logout`, {
            method: 'POST',
            body: JSON.stringify({ force: true }),
            headers: { 'Content-Type': 'application/json' },
          });
        } catch (error) {
          console.log(error);
        } finally {
          AppStorage.clearSession();
          window.location.href = '/login';
        }
      } else {
        //logout from server: chuyển đến trang logout, vì chỉ có client mới logout đc
        const sessionToken = (options?.headers as any)?.Authorization?.split(' ')[1] || '';
        redirect(`/logout?sessionToken=${sessionToken}`);
      }
    }

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
