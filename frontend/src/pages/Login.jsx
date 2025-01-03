import { useAuth, useSignIn, useUser } from '@clerk/clerk-react'
import React, { useState, useEffect } from 'react'
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
import { NavLink, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { createUser, setUserMetaData } from '@/api/userApi'
import useUserStore from '@/features/user/userStore'

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoaded, signIn, setActive } = useSignIn();
  const { getToken } = useAuth()
  const { isSignedIn, user } = useUser()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { fetchUser } = useUserStore();
  useEffect(() => {
    if (isSignedIn && user) {
      const queryParams = new URLSearchParams(location.search);
      const role = queryParams.get('role');
      const type = queryParams.get('type');

      if (type === "GOOGLE_SIGNUP") {
        (async () => {
          let token = await getToken();
          const res = await setUserMetaData(user.id, { role }, token);
          const userData = { userId: user.id, firstName: user.firstName, lastName: user.lastName, emailAddress: user.emailAddresses[0].emailAddress, role: role || "JOB_SEEKER" }
          await createUser(userData, token);
          if (res.status) {
            await user.reload();
            routeUser();
          }
        })();
      } else {
        (async () => {
          await user.reload();
          routeUser();
        })()
      }
    }
  }, [isSignedIn, location.search]);

  if (!isLoaded) {
    return (<>Loading ....</>)
  }

  function routeUser() {
    setUserState(user);
    const roleToRouteMap = {
      ADMIN: '/admin',
      EMPLOYER: '/employer',
      JOB_SEEKER: '/jobseeker',
    };

    const route = roleToRouteMap[user.publicMetadata.role];
    if (route) {
      navigate(route, { replace: true });
    }
  }

  async function setUserState(u) {
    const token = await getToken();
    fetchUser({ id: u.id, token })
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
        redirectUrl: '/login'
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
