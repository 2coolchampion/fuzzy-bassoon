import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { EyeIcon } from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react";

const LoginForm = () => {
  const { data: session, status } = useSession();
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  // If user is logged in, show their info and sign out button
  if (status === "authenticated" && session?.user) {
    return (
      <div className="mx-auto flex-col max-w-sm flex space-y-6">
        <h2 className="text-2xl">Welcome back!</h2>
        <div className="flex flex-col items-center space-y-4 p-6 border border-slate-200 rounded-lg">
          {session.user.image && (
            <img
              src={session.user.image}
              alt="Profile"
              className="w-20 h-20 rounded-full"
            />
          )}
          <div className="text-center">
            <p className="font-medium text-lg">{session.user.name}</p>
            <p className="text-slate-500">{session.user.email}</p>
          </div>
          <Button
            onClick={() => signOut()}
            variant="outline"
            className="w-full mt-4"
          >
            Sign Out
          </Button>
        </div>
      </div>
    );
  }

  // If user is not logged in, show login form
  return (
    <>
      <div className="mx-auto flex-col max-w-sm flex space-y-6">
        <h2 className="text-2xl">Welcome</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto space-y-4">
          <div className="flex flex-col jusify-start justify-center space-y-2">
            <Label>Email</Label>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="jamessmith23@gmail.com"
              className="px-2 py-1 rounded-md w-full max-w-lg mt-2 placeholder:text-slate-500 bg-transparent border border-slate-500"
            />{" "}
            <p className="text-xs text-slate-500 w-full">
              It looks like this <b>email isn't registered</b> with us yet.
              Please <b>double-check the email</b> address for any typos. If you
              continue, a{" "}
              <b className="text-green-500">new account will be created</b>{" "}
              using this email.
            </p>
            <div className="flex items-center justify-between w-full">
              <Label>Password</Label>
              <a
                href="/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <input
                type="password"
                {...register("password", { required: true, min: 8 })}
                placeholder="password"
                className="px-2 py-1 rounded-md w-full max-w-lg mt-2 placeholder:text-slate-500 bg-transparent border border-slate-500"
              />
              <div className="absolute inset-y-0 flex items-center top-2 right-3">
                <EyeIcon className="w-5 h-5 text-slate-500" />
              </div>
            </div>
            <p className="text-xs text-slate-500 w-full">
              Password must be at least 8 characters
            </p>
          </div>
          <div className="flex items-center w-full mt-4">
            <Checkbox id="terms1" />
            <Label htmlFor="terms1" className="ml-2">
              Accept terms and conditions
            </Label>
          </div>
          <Button className="w-full mt-4" variant={"outline"} type="submit">
            Login
          </Button>
        </form>
        <div className="flex items-center w-full my-6">
          <hr className="flex-grow border-t border-slate-500" />
          <span className="px-3 text-sm text-slate-600">Or Continue With</span>
          <hr className="flex-grow border-t border-slate-500" />
        </div>
        <div className="flex flex-col w-full items-center">
          <Button className="w-full max-w-xs" onClick={() => signIn("google")}>
            Sign in with Google
          </Button>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
