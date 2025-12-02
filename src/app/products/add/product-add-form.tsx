'use client';

import { apiProduct } from '@/apis/apiProduct';
import { HttpError } from '@/apis/http';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CreateProductBody, CreateProductBodyType } from '@/schemas/product.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

function ProductAddForm() {
  const [file, setFile] = useState<File | null>(null);

  const form = useForm<CreateProductBodyType>({
    resolver: zodResolver(CreateProductBody),
    defaultValues: {
      name: '',
      price: 0,
      image: '',
      description: '',
    },
  });

  const onSubmitForm = async (values: CreateProductBodyType) => {
    try {
      console.log(values);
      await apiProduct.create(values);

      toast.success('Created success');
    } catch (error) {
      if (error instanceof HttpError) {
        if (error.status == 422) {
          const errors = (error?.data?.errors as { field: keyof CreateProductBodyType; message: string }[]) || [];
          errors.forEach((error) => {
            form.setError(error.field, { type: 'server', message: error.message });
          });
        } else {
          toast.error(error.message || 'Created failed');
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Tên" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Giá</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Giá" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mô tả</FormLabel>
              <FormControl>
                <Textarea placeholder="Mô tả" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hình ảnh</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="Mô tả"
                  onChange={(ev) => {
                    const _file = ev.currentTarget.files?.[0];
                    if (_file) {
                      setFile(_file);
                      field.onChange('http://localhost:3000/' + _file.name);
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {file ? (
          <div>
            <Image src={URL.createObjectURL(file)} alt={'preview'} width={128} height={128} className="object-cover" />

            <Button
              size={'sm'}
              variant={'destructive'}
              onClick={() => {
                setFile(null);
                form.setValue('image', '');
              }}
            >
              Xóa
            </Button>
          </div>
        ) : null}

        <Button className="w-full mt-8" type="submit">
          Tạo mới
        </Button>
      </form>
    </Form>
  );
}

export default ProductAddForm;
