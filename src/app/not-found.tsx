import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function NotFound() {
    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-brand-black text-white p-4 text-center">
            <h2 className="text-6xl font-bold text-architectural mb-4">404</h2>
            <p className="text-xl mb-8">Page Not Found</p>
            <p className="text-white/60 mb-8 max-w-md">
                The page you are looking for does not exist or has been moved.
            </p>
            <Link href="/">
                <Button className="bg-white text-black hover:bg-gray-200">
                    Return Home
                </Button>
            </Link>
        </div>
    )
}
