'use client';

import { authApi } from '@/apis/apiAuth';
import { HttpError, clientSessionToken } from '@/apis/http';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoginBody, LoginBodyType } from '@/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

function LoginForm() {
  const router = useRouter();
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmitForm = async (values: LoginBodyType) => {
    try {
      const { data } = await authApi.login(values);

      //set token in context for client
      clientSessionToken.value = data.data.token;
      clientSessionToken.expriesAt = new Date(data.data.expiresAt);

      //set token in cookie for server
      await authApi.auth(clientSessionToken.value, data.data.expiresAt);

      toast.success('Login success');
      router.push('/');
      router.refresh();
    } catch (error) {
      if (error instanceof HttpError) {
        if (error.status == 422) {
          const errors = (error?.data?.errors as { field: string; message: string }[]) || [];
          errors.forEach((error) => {
            if (error.field === 'email') {
              form.setError('email', { type: 'server', message: error.message });
            }
            if (error.field === 'password') {
              form.setError('password', { type: 'server', message: error.message });
            }
          });
        } else {
          toast.error(error.message || 'Login failed');
        }
      } else {
        alert(JSON.stringify(error));
      }
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
