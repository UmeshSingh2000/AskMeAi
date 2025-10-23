"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from "sonner"

const LoginForm = () => {
    const [isLogedIn, setIslogedIn] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: ""
    });

    // ✅ Access localStorage only after client-side mount
    useEffect(() => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("token");
            if (token) setIslogedIn(true);
        }
    }, []);

    const handleToggleRegister = () => {
        setIsRegister(prev => !prev);
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!userData.email || !userData.password || (isRegister && !userData.name)) {
                toast.error("Please fill all the fields");
                return;
            }

            const endpoint = isRegister ? '/user/register' : '/user/login';
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, userData);

            if (response.status === 200) {
                toast.success("Success: " + response.data.message);

                if (isRegister) {
                    const loginResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, {
                        email: userData.email,
                        password: userData.password
                    });
                    if (loginResponse.status === 200) {
                        toast.success("Logged in successfully after registration!");
                        localStorage.setItem("token", loginResponse.data.token);
                        setIslogedIn(true);
                        return;
                    }
                }

                localStorage.setItem("token", response.data.token);
                setIslogedIn(true);
                window.location.reload()
            }
        } catch (error) {
            console.error("Error during form submission:", error);
            toast.error("An error occurred. Please try again.");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIslogedIn(false);
        toast("Logged out successfully!");
    };

    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button className="cursor-pointer" variant="outline" onClick={isLogedIn ? handleLogout : undefined}>
                        {isLogedIn ? "Logout" : "Login"}
                    </Button>
                </DialogTrigger>

                {!isLogedIn && (
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold">
                                {isRegister ? "Register" : "Login"}
                            </DialogTitle>
                            <DialogDescription className="text-sm text-gray-600">
                                {isRegister
                                    ? "Please enter your details to register."
                                    : "Please enter your credentials to login."
                                }
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-4 mt-4">
                            {isRegister && (
                                <div className="grid gap-2">
                                    <Label htmlFor="name-1">Name</Label>
                                    <Input
                                        value={userData.name}
                                        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                                        id="name-1" name="name" placeholder="Enter your name" />
                                </div>
                            )}
                            <div className="grid gap-2">
                                <Label htmlFor="email-1">Email</Label>
                                <Input
                                    value={userData.email}
                                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                    id="email-1" name="email" placeholder="Enter your email" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password-1">Password</Label>
                                <Input
                                    value={userData.password}
                                    onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                                    id="password-1" name="password" type="password" />
                            </div>
                        </div>

                        {!isRegister && (
                            <div className="mt-4 text-center">
                                <Button variant="link" size="sm" type="button" onClick={handleToggleRegister}>
                                    Don't have an account? Register
                                </Button>
                            </div>
                        )}

                        <DialogFooter className="mt-4 flex justify-end gap-2">
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button onClick={handleFormSubmit}>
                                {isRegister ? "Register" : "Login"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                )}
            </form>
        </Dialog>
    );
};

export default LoginForm;
