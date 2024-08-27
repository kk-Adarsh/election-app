"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ButtonLoading } from "../ui/loading-button";
import axios, { AxiosError } from "axios";
import { PasswordInput } from "../ui/password-input";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(12, { message: "Username must be at most 12 characters." }),
  password: z
    .string()
    .min(2, {
      message: "Password must be at least 4 characters.",
    })
    .max(16, { message: "Pawwoed must be at most 16 characters." }),
});

const LoginForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmitting(true);
    try {
      const { data } = await axios.post("/api/users/login", values);
      localStorage.setItem("permissions", JSON.stringify(data.permissions));
      toast({
        title: "Logged In",
        description: "Welcome to Voting Portal",
        duration: 3000,
      });
      router.push("/vote");
    } catch (error: unknown) {
      let errorMessage = "An unknown error occurred";
      if (error instanceof AxiosError && error.response) {
        errorMessage = error.response.data.error;
      }
      toast({
        title: "Error",
        description: errorMessage,
        duration: 3000,
        variant: "destructive",
      });
      console.log(error);
    } finally {
      setSubmitting(false);
      form.reset();
    }
  }
  return (
    <Card className="min-w-80">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="voter" {...field} />
                  </FormControl>
                  <FormDescription>This is your unique name.</FormDescription>
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
                    <PasswordInput placeholder="e.g: abc@123" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ButtonLoading
              className="w-full"
              type="submit"
              disabled={submitting}
              isLoading={submitting}
            >
              Login
            </ButtonLoading>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
