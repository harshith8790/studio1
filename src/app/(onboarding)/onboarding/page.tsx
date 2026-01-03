import { OnboardingForm } from "./onboarding-form";
import { Logo } from "@/components/logo";

export default function OnboardingPage() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-secondary">
             <div className="mx-auto grid w-full max-w-lg gap-6">
                <div className="grid gap-2 text-center">
                    <div className="flex justify-center">
                        <Logo />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tighter mt-4">Let's Get Started</h1>
                    <p className="text-balance text-muted-foreground">
                        Tell us a bit about yourself to personalize your experience.
                    </p>
                </div>
                <OnboardingForm />
            </div>
        </div>
    );
}
