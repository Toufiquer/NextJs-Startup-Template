/*
|-----------------------------------------
| setting up login form for the app
| @author: Jahid Haque <jahid.haque@yahoo.com>
| @copyright: mealnight, 2023
|-----------------------------------------
*/
"use client";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, AlertCircle } from "lucide-react";
import * as z from "zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { IError, IProcess } from "@/types/general";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";


const formSchema = z.object({
  id: z
    .string({
      required_error: "ID is required",
    })
    .min(11)
    .max(11),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(3)
    .max(10),
  alias: z
    .string({
      required_error: "Alias is required",
    })
    .min(2)
    .max(8),
  source: z
    .string({
      required_error: "Source is required",
    })
    .min(2)
    .max(10),
});

export default function LoginForm({ token }: { token: string }) {

  const [process, setProcess] = useState<IProcess>({
    status: false,
    processFor: null,
  });

  const [error, setError] = useState<IError>({
    status: false,
    errFor: "",
    errMsg: "",
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      password: "",
      alias: "",
      source: "kitpad",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {

    setProcess({
      ...process,
      status: true,
      processFor: "login",
    });

    const request = await fetch("api/authentication", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        id: data.id,
        password: data.password,
        alias: data.alias,
        source: data.source,
      }),
    });

    const response = await request.json();

    console.log("response login form: ", response);

    if (request.status === 200) {
      window.location.href = "/dashboard";
    } else {
      setProcess({
        ...process,
        status: false,
        processFor: "",
      });
      setError({
        ...error,
        status: true,
        errFor: "login",
        errMsg: response.isBoom
          ? "Check your credentials"
          : "Our authentication service is not working at the moment. Please try again later",
      });
    }
  };

  return (
    <section className="flex min-h-screen w-full items-center justify-center">
      <div className="mx-auto flex w-[550px] flex-col p-5">
        <Card>
          <CardHeader>
            <CardTitle>Log in to your account</CardTitle>
            <CardDescription>Manage and Run your store</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ID</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter ID" {...field} />
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
                        <Input type={"password"} placeholder="Enter your password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="alias"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alias</FormLabel>
                      <FormControl>
                        <Input type={"text"} placeholder="Enter your alias" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {error.status && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error!</AlertTitle>
                    <AlertDescription>{error.errMsg}</AlertDescription>
                  </Alert>
                )}
                <Button disabled={process.status} type="submit">
                  {process.status ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
