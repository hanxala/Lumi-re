import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
    return (
        <div className="flex items-center justify-center min-h-[80vh] py-12">
            <SignIn
                appearance={{
                    elements: {
                        formButtonPrimary: 'bg-[#d4af37] hover:bg-[#b8962d] text-sm normal-case',
                        card: 'shadow-2xl border border-white/10 bg-white/5 backdrop-blur-lg',
                    }
                }}
            />
        </div>
    );
}
