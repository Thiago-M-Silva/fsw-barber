import { DialogContent, DialogTitle, DialogDescription } from "@radix-ui/react-dialog";
import { signIn } from "next-auth/react";
import { Button } from "./ui/button";
import { DialogHeader } from "./ui/dialog";
import Image from "next/image";

const SignInDialog = () => {
    const handleLoginWithGoogleClick = () => signIn("google")

    return (
        <>
            <DialogHeader>
                <DialogTitle>Faça login na plataforma</DialogTitle>
                <DialogDescription>
                    Conecte-se usando sua conta do google
                </DialogDescription>
            </DialogHeader>
            <Button onClick={handleLoginWithGoogleClick} variant="outline" className="gap-1 font-bold">
                {/* exportar o icone do google para public > icons */}
                <Image src="a" alt="login com o google" width={18} height={18} />
                Google
            </Button>

        </>
    );
}

export default SignInDialog;