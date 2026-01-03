import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Logo } from "@/components/logo"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-secondary">
        <Card className="mx-auto max-w-sm">
            <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                    <Logo />
                </div>
                <CardTitle className="text-2xl">Sign Up</CardTitle>
                <CardDescription>
                Enter your information to create an account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" />
                    </div>
                    <Button type="submit" className="w-full" asChild>
                      <Link href="/onboarding">Create an account</Link>
                    </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link href="/" className="underline">
                    Login
                </Link>
                </div>
            </CardContent>
        </Card>
    </div>
  )
}
