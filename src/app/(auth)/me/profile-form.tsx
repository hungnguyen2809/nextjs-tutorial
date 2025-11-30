'use client';

import { accountApi } from '@/apis/apiAccount';
import { HttpError } from '@/apis/http';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AccountResType, UpdateMeBody, UpdateMeBodyType } from '@/schemas/account.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

function ProfileForm({ profile }: { profile?: AccountResType }) {
  const router = useRouter();
  const form = useForm<UpdateMeBodyType>({
    resolver: zodResolver(UpdateMeBody),
    defaultValues: {
      name: profile?.data.name || '',
    },
  });

  const onSubmitForm = async (values: UpdateMeBodyType) => {
    try {
      await accountApi.updateMe(values);

      toast.success('Updated success');
      router.refresh(); // để triger render lại current page form server compoment
    } catch (error) {
      if (error instanceof HttpError) {
        if (error.status == 422) {
          const errors = (error?.data?.errors as { field: string; message: string }[]) || [];
          errors.forEach((error) => {
            if (error.field === 'name') {
              form.setError(error.field, { type: 'server', message: error.message });
            }
          });
        } else {
          toast.error(error.message || 'Update failed');
        }
      } else {
        alert(JSON.stringify(error));
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-4 w-[500px] border p-6 rounded-2xl shadow">
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input readOnly placeholder="Email" value={profile?.data.email} />
          </FormControl>
          <FormMessage />
        </FormItem>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Họ tên</FormLabel>
              <FormControl>
                <Input placeholder="Nhập họ tên" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full mt-8" type="submit">
          Cập nhật
        </Button>
      </form>
    </Form>
  );
}

export default ProfileForm;
