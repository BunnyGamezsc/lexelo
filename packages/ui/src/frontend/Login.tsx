'use client'
import React, {useEffect} from "react";
import { LoginForm } from "#/components/login-form";
import {Button} from "#/ui/button";
import {cn} from "#/lib/utils";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "#/ui/card";
import {Label} from "#/ui/label";
import {Input} from "#/ui/input";

const Login = (props: { loginWithAuth0: any; }) => {
    const {loginWithAuth0} = props;


  return (
    <>
      {/*<LoginForm />*/}
        <div className={cn("flex flex-col gap-6")}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Welcome to Lexelo</CardTitle>
                    <CardDescription>
                        Login with your BunnyGamez Account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                        <div className="grid gap-6">

                            <div className="grid gap-6">
                                <Button onClick={()=>{
                                    loginWithAuth0()
                                }} className="w-full">
                                    Login
                                </Button>
                            </div>
                            <div className="text-center text-sm">
                                Don&apos;t have an account?{" "}
                                <a href="#" className="underline underline-offset-4">
                                    Sign up
                                </a>
                            </div>
                        </div>
                </CardContent>
            </Card>
            <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </div>
        </div>
        {/*<Button type="outline" className="w-full">*/}
        {/*    Login with a BunnyGamez Account*/}
        {/*</Button>*/}
    </>
  );
};

export default Login;
