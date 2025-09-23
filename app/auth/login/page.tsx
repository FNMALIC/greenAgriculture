import { Metadata } from "next";
import Link from "next/link";
import { UserAuthForm } from "@/components/admin/user-auth-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using shadcn/ui.",
};

export default function AuthenticationPage() {
  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-1 lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
              Admin Login
            </CardTitle>
          </CardHeader>
          <CardContent>
            <UserAuthForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}