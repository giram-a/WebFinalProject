import React, { useState } from 'react'
import { useSignUp } from '@clerk/clerk-react'
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
import { NavLink, Navigate } from 'react-router-dom'
import { REGEXP_ONLY_DIGITS } from 'input-otp'

const Signup = () => {
    const { isLoaded, signUp, setActive } = useSignUp();
    const [password, setPassword] = useState("");
    const [pendingVerification, setPendingVerification] = useState(false);
    const [verificationCode, setVerificationCode] = useState("");
    const [error, setError] = useState("");
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [gender, setGender] = useState('')
    const [emailId, setEmailId] = useState('')


    if (!isLoaded) {
        return (<>Loading ....</>)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isLoaded) {
            return;
        }

        try {
            await signUp.create({
                emailAddress: emailId,
                password: password
            });

            await signUp.prepareVerification({
                strategy: "oauth_google",
                redirectUrl: "",
                actionCompleteRedirectUrl: "",
            })

            await signUp.prepareEmailAddressVerification({
                strategy: "email_code"
            });

            setPendingVerification(true);
        } catch (error) {
            console.log(JSON.stringify(error, null, 2));
            setError(error.errors[0].message)
        }
    }

    const onCodeVerification = async (e) => {
        e.preventDefault();
        if (!isLoaded) {
            return;
        }

        try {
            const completeSignup = await signUp.attemptEmailAddressVerification({
                code: verificationCode
            })

            if (completeSignup.status !== "complete") {
                console.log("Signup not completed", completeSignup);
            }

            if (completeSignup.status === "complete") {
                await setActive({ session: completeSignup.createdSessionId });
                //redirect to dashboard
            }

        } catch (error) {
            console.log("Error in OTP verification");
            setError(error.errors[0].message)
        }
    }

    const handleSub = (e) => {
        e.preventDefault()
        console.log(verificationCode);
    }

    const handleOTPComplete = (value) => {
        setVerificationCode(value);
    };

    return (
        <div className="flex h-screen w-full items-center justify-center px-4">
            {pendingVerification ?
                (<Card className="w-full max-w-md mx-auto">
                    <CardHeader>
                        <CardTitle>OTP Validation</CardTitle>
                        <CardDescription>Enter the 6-digit code sent to your email <span className='flex justify-start gap-2 underline text-blue-950 hover:cursor-not-allowed'>{emailId}<Pencil className='hover:cursor-pointer' width={12} onClick={() => setPendingVerification(false)} /></span></CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form action="" onSubmit={handleSub}>
                            <div className="flex justify-center my-4">
                                <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS} value={verificationCode} onChange={handleOTPComplete}>
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

                            <Button type="submit" className="w-full mt-3">Validate OTP</Button>
                        </form>
                    </CardContent>
                </Card>)
                :
                (<Card className="w-full max-w-md mx-auto">
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
                                            variant={"outline"}
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
                            <Button type="submit" className="w-full">Sign Up</Button>
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
                        <Button variant="outline" type="button" className="w-full mt-4">
                            Sign up with Google
                        </Button>
                        <div className="mt-4 text-center text-sm">
                            Already have an account?{" "}
                            <NavLink to={"/"} className="underline">
                                Sign In
                            </NavLink>
                        </div>
                    </CardContent>
                </Card>)}
        </div>
    )
}

export default Signup
