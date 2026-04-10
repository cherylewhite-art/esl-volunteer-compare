import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Helmet>
        <title>Page Not Found | ESLVolunteerFinder</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900">Page Not Found</h1>
          </div>
          <p className="mt-4 text-sm text-gray-600">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="mt-6 flex flex-col gap-2">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:underline">
              <ArrowRight className="h-3.5 w-3.5" /> Go to Homepage
            </Link>
            <Link href="/countries" className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:underline">
              <ArrowRight className="h-3.5 w-3.5" /> Browse Programs by Country
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
