/*
|-----------------------------------------
| setting up login form
| @author: Jahid Haque <jahid.haque@yahoo.com>
| @copyright: daauk, 2024
|-----------------------------------------
*/

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email({
      message: 'Invalid email address',
    })
    .min(3)
    .max(30),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(3)
    .max(30),
});
export default function LoginForm() {
  const router = useRouter()
  const [error, setError] = useState({
    status: false,
    errFor: '',
    errMsg: '',
  });
  const [process, setProcess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    setProcess(true);

    const request = await fetch('/api/authentication', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    setProcess(false);

    const response = await request.json();
    const { status, data } = response;
    if (status) {
      router.push('/');
    }
    setError({
      ...error,
      status: !response.status,
      errMsg: !status ? data.output.payload.message : '',
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email address" {...field} />
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {error.status && (
          <Alert variant="destructive">
            <AlertCircle className="size-4" />
            <AlertTitle>Error!</AlertTitle>
            <AlertDescription>{error.errMsg}</AlertDescription>
          </Alert>
        )}
        <Button disabled={process} type="submit">
          {process ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Processing...
            </>
          ) : (
            'Login'
          )}
        </Button>
      </form>
    </Form>
  );
}
