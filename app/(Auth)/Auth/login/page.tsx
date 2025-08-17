import { Card } from "@/components/ui/card";
import { GoogleLoginButton } from "./_LoginComponent/login";
import { Button } from "@/components/ui/button";


export default function Home() {
  return (
    <main className="min-h-screen relative flex items-center justify-center bg-background">
      <Button asChild className="">
        <a className=" absolute top-10 right-10" href="/Application">
          Go to application
        </a>
      </Button>
      <div className="max-w-md w-full space-y-8 p-8">
        <Card className="px-5 shadow-2xl">

            <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground">Welcome</h1>
            <p className="mt-2 text-muted-foreground">Sign in to your account</p>
            </div>

            <div className="mt-8">
            <GoogleLoginButton />
            </div>
        </Card>
      </div>
    </main>
  )
}
