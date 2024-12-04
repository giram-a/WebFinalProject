import React, { useState } from 'react'
import { useAuth, useSignUp, useUser } from '@clerk/clerk-react'
import { Button } from "@/components/ui/button"
import { CalendarIcon, Pencil } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { REGEXP_ONLY_DIGITS } from 'input-otp'
import { createUser, setUserMetaData } from '@/api/userApi'
import { Separator } from '@/components/ui/separator'

const Signup = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isLoaded, signUp, setActive } = useSignUp();
    const { isLoaded: isUserLoaded, user } = useUser();
    const { getToken } = useAuth();
    const [password, setPassword] = useState("");
    const [pendingVerification, setPendingVerification] = useState(false);
    const [verificationCode, setVerificationCode] = useState("");
    const [error, setError] = useState("");
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('');
    const [emailId, setEmailId] = useState('');

    if (isUserLoaded && user) {
        (async () => {
            let token = await getToken();
            const res = await setUserMetaData(user.id, {
                dateOfBirth: dateOfBirth,
                gender: gender,
                role: location.state?.userType || "JOB_SEEKER",
            }, token)
            const userData = { userId: user.id, firstName, lastName, dateOfBirth: dateOfBirth.toString(), gender, emailAddress: emailId, password, role: location.state?.userType || "JOB_SEEKER" }
            await createUser(userData, token);
            if (res.status) {
                navigate("/", { replace: true });
            }
            return;
        })()
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isLoaded) return;

        try {
            await signUp.create({
                emailAddress: emailId,
                password: password,
                firstName: firstName,
                lastName: lastName
            });

            await signUp.prepareEmailAddressVerification({
                strategy: "email_code",
            });

            setPendingVerification(true);
        } catch (error) {
            console.error(error);
            setError(error.errors?.[0]?.message || "An error occurred");
        }
    };

    const onCodeVerification = async (e) => {
        e.preventDefault();
        if (!isLoaded) return;

        try {
            const completeSignup = await signUp.attemptEmailAddressVerification({
                code: verificationCode,
            });

            if (completeSignup.status === "complete") {
                await setActive({ session: completeSignup.createdSessionId });
                console.log("Signup completed");
            } else {
                console.log("Signup not completed", completeSignup);
            }
        } catch (error) {
            console.error("Error in OTP verification", error);
            setError(error.errors?.[0]?.message || "An error occurred");
        }
    };

    const handleOTPComplete = (value) => {
        setVerificationCode(value);
    };

    const handleGoogleSignUp = async () => {
        try {
            const role = location.state?.userType || "JOB_SEEKER"
            const { createdSessionId } = await signUp.authenticateWithRedirect({
                strategy: 'oauth_google',
                redirectUrl: '/login',
                redirectUrlComplete: `/login?type=GOOGLE_SIGNUP&role=${role}`
            });

            if (createdSessionId) {
                await setActive({ session: createdSessionId });
                console.log("Google signup completed");
            }
        } catch (error) {
            console.error("Google sign up error:", error);
            setError(error.errors?.[0]?.message);
        }
    }

    const handleGoogleSignUpEmployer = async () => {
        try {
            const role = "EMPLOYER"
            const { createdSessionId } = await signUp.authenticateWithRedirect({
                strategy: 'oauth_google',
                redirectUrl: '/login',
                redirectUrlComplete: `/login?type=GOOGLE_SIGNUP&role=${role}`
            });

            if (createdSessionId) {
                await setActive({ session: createdSessionId });
                console.log("Google signup completed");
            }
        } catch (error) {
            console.error("Google sign up error:", error);
            setError(error.errors?.[0]?.message);
        }
    }

    return (
        <div className="flex h-screen w-full items-center justify-center px-4">
            {pendingVerification ? (
                <Card className="w-full max-w-md mx-auto">
                    <CardHeader>
                        <CardTitle>OTP Validation</CardTitle>
                        <CardDescription>
                            Enter the 6-digit code sent to your email{" "}
                            <span className="flex justify-start gap-2 underline text-blue-950">
                                {emailId}
                                <Pencil
                                    className="hover:cursor-pointer"
                                    width={12}
                                    onClick={() => setPendingVerification(false)}
                                />
                            </span>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={onCodeVerification}>
                            <div className="flex justify-center my-4">
                                <InputOTP
                                    maxLength={6}
                                    pattern={REGEXP_ONLY_DIGITS}
                                    value={verificationCode}
                                    onChange={handleOTPComplete}
                                >
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                    </InputOTPGroup>
                                    <InputOTPSeparator />
                                    <InputOTPGroup>
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
                            </div>
                            <Button type="submit" className="w-full mt-3">
                                Validate OTP
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            ) : (
                <Card className="w-full max-w-md mx-auto">
                    <CardHeader>
                        <CardTitle>Sign Up</CardTitle>
                        <CardDescription>Create your account to get started.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input
                                        id="firstName"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input
                                        id="lastName"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !dateOfBirth && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon />
                                            {dateOfBirth ? format(dateOfBirth, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={dateOfBirth}
                                            onSelect={setDateOfBirth}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="gender">Gender</Label>
                                <Select value={gender} onValueChange={setGender}>
                                    <SelectTrigger id="gender">
                                        <SelectValue placeholder="Select gender" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="male">Male</SelectItem>
                                        <SelectItem value="female">Female</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="emailId">Email</Label>
                                <Input
                                    id="emailId"
                                    type="email"
                                    value={emailId}
                                    onChange={(e) => setEmailId(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <p className='mt-2 text-red-500'>{error}</p>
                            <Button type="submit" className="w-full">
                                Sign Up
                            </Button>
                        </form>
                        <div className="relative mt-3">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                    Or continue with
                                </span>
                            </div>
                        </div>
                        <Button variant="outline" className="w-full mt-3" onClick={handleGoogleSignUp}>
                            Google
                        </Button>
                        <Separator className="mt-3" />
                        <Button variant="outline" className="w-full mt-3" onClick={handleGoogleSignUpEmployer}>
                            Are you Employer? Signup with Google
                        </Button>
                        <div className="flex w-full justify-center mt-3 text-sm">
                            <span className="text-muted-foreground mr-2">
                                Already have an account?
                            </span>
                            <NavLink className="text-blue-950 underline" to="/sign-in">
                                Login
                            </NavLink>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default Signup;
