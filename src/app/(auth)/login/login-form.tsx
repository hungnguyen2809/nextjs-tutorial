'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ENV } from '@/configs/env';
import { useAppContext } from '@/contexts/app-ctx';
import { LoginBody, LoginBodyType } from '@/schemas/auth.schema';

function LoginForm() {
  const appCtx = useAppContext();
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmitForm = async (values: LoginBodyType) => {
    const response = await fetch(`${ENV.NEXT_PUBLIC_API_ENDPOINT}/auth/login`, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();
    if (!response.ok) {
      if (response.status == 422) {
        const errors = (result.errors as { field: string; message: string }[]) || [];
        errors.forEach((error) => {
          if (error.field === 'email') {
            form.setError('email', { type: 'server', message: error.message });
          }
          if (error.field === 'password') {
            form.setError('password', { type: 'server', message: error.message });
          }
        });
      } else {
        toast.error(result.message || 'Login failed');
      }
    } else {
      toast.success('Login success');

      //set token in context for client
      appCtx.setSesstionToken(result.data.token);

      //set token in cookie for server
      fetch(`${window.location.origin}/api/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: result.data.token }),
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-4 w-[500px] border p-6 rounded-2xl shadow">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Nhập email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mật khẩu</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Nhập mật khẩu" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full mt-8" type="submit">
          Đăng nhập
        </Button>
      </form>
    </Form>
  );
}

export default LoginForm;
