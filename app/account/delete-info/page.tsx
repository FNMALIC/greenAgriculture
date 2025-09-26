import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  Trash2, 
  AlertTriangle, 
  Info,
  ExternalLink,
  Shield
} from "lucide-react";

export default function DeleteAccountInfoPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <Info className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Account Deletion Information</h1>
          <p className="text-gray-600 mt-2">
            Learn how to delete your CropLink account permanently
          </p>
        </div>

        {/* Main Info Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              How to Delete Your Account
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-medium text-blue-900 mb-3">Step-by-Step Process:</h3>
              <ol className="space-y-2 text-sm text-blue-800">
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 bg-blue-600 text-white rounded-full text-xs flex items-center justify-center font-medium flex-shrink-0 mt-0.5">1</span>
                  <span>Click the "Delete Account" button below to access the deletion page</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 bg-blue-600 text-white rounded-full text-xs flex items-center justify-center font-medium flex-shrink-0 mt-0.5">2</span>
                  <span>Sign in to your account if you're not already logged in</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 bg-blue-600 text-white rounded-full text-xs flex items-center justify-center font-medium flex-shrink-0 mt-0.5">3</span>
                  <span>Select a reason for leaving (helps us improve our service)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 bg-blue-600 text-white rounded-full text-xs flex items-center justify-center font-medium flex-shrink-0 mt-0.5">4</span>
                  <span>Provide optional feedback about your experience</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 bg-blue-600 text-white rounded-full text-xs flex items-center justify-center font-medium flex-shrink-0 mt-0.5">5</span>
                  <span>Confirm deletion by typing "delete my account" exactly as shown</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 bg-blue-600 text-white rounded-full text-xs flex items-center justify-center font-medium flex-shrink-0 mt-0.5">6</span>
                  <span>Your account will be permanently deleted from our servers</span>
                </li>
              </ol>
            </div>

            <div className="text-center pt-4">
              <Link href="/account/delete">
                <Button 
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Account
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Warning Card */}
        <Card className="border-amber-200 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-700">
              <AlertTriangle className="h-5 w-5" />
              Important Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h4 className="font-medium text-amber-900 mb-2">What happens when you delete your account:</h4>
              <ul className="text-sm text-amber-800 space-y-1">
                <li>• Your profile and personal information will be permanently removed</li>
                <li>• All your posts, comments, and interactions will be deleted</li>
                <li>• Your account settings and preferences will be lost</li>
                <li>• Any uploaded files or media will be removed from our servers</li>
                <li>• This action cannot be undone</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Alternatives Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5 text-green-600" />
              Consider These Alternatives
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-800 mb-3">
                Before permanently deleting your account, you might want to consider:
              </p>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• <strong>Temporarily deactivating</strong> your account instead</li>
                <li>• <strong>Updating your privacy settings</strong> to limit data sharing</li>
                <li>• <strong>Contacting our support team</strong> to resolve any issues</li>
                <li>• <strong>Taking a break</strong> and returning when you're ready</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <div className="text-center">
          <p className="text-sm text-gray-500">
            Need help with something else? 
            <a href="mailto:support@croplink.org" className="text-blue-600 hover:text-blue-800 ml-1">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
