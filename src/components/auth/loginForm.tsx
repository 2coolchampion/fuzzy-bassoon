"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { EyeIcon, EyeOffIcon, Shield, MoreHorizontalIcon } from "lucide-react";

export default function LoginForm() {
  // 1. reroute upon succesfull login (do it in the loin form component itself)
  // 2. Reset form if it's unsuccesfull, & display error

  //  implement react-hook-form and do a schema check (ilb/forSchema type)
  // const form = useForm<z.infer<typeof FormSchema>>({
  //   mode: "onChange",
  //   resolver: zodResolver(FormSchema),
  //   defaultValues: { email: "", password: "" },
  // });

  // add a loading state to submit button

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Welcome Back
        </CardTitle>
        <CardDescription className="text-center">
          Please enter your details to sign in
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">Remember me</Label>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button className="w-full">Sign In</Button>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <Button variant="outline">
            <Shield className="h-5 w-5 mr-2" />
            Google
          </Button>
          <Button variant="outline">
            <svg
              className="h-5 w-5 mr-2"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M4.5 4.5c0-1.65685 1.34315-3 3-3h9c1.6569 0 3 1.34315 3 3v15c0 1.6569-1.3431 3-3 3h-9c-1.65685 0-3-1.3431-3-3v-15zm10.5 14v-4.5c0-.8284-.6716-1.5-1.5-1.5h-3c-.82843 0-1.5.6716-1.5 1.5v4.5h6zm-3-12c.82843 0 1.5.67157 1.5 1.5s-.67157 1.5-1.5 1.5-1.5-.67157-1.5-1.5.67157-1.5 1.5-1.5z" />
            </svg>
            Notion
          </Button>
          <Button variant="outline">
            <MoreHorizontalIcon className="h-5 w-5 mr-2" />
            Other
          </Button>
        </div>
        <p className="text-sm text-center">
          Don't have an account?{" "}
          <Link href="/create-account" className="text-primary hover:underline">
            Create an account
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
