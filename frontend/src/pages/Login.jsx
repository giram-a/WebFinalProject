import { useSignIn, useUser } from '@clerk/clerk-react'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { NavLink, Navigate } from 'react-router-dom'

const Login = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const { isSignedIn, user } = useUser()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!isLoaded) {
    return (<>Loading ....</>)
  }

  if (isSignedIn) {
    // return <Navigate to="/admin/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignin = await signIn.create({
        identifier: email,
        password
      });

      if (completeSignin.status !== "complete") {
        console.log("signin not completed", completeSignin);
      }

      if (completeSignin.status === "complete") {
        await setActive({ session: completeSignin.createdSessionId });
        console.log(completeSignin.userData);
        return <Navigate to="/admin/dashboard" replace state={{ from: location }} />;
      }

    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
      setError(error.errors[0].message)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      const result = await signIn.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: '/'
      });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        console.log('Google sign in successful');

      } else {
        console.log('Google sign in failed');
      }
    } catch (err) {
      console.error('Error:', err.message);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} >
            <div className="grid gap-4">

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="user@northeastern.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </form>
          <Button onClick={handleGoogleSignIn} variant="outline" className="w-full mt-2">
            Login with Google
          </Button>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <NavLink to={"/signup"} state={{ userType: "JOB_SEEKER" }} className="underline">
              Sign up
            </NavLink>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login
