"use client";

import { useSession, signIn } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DeleteAccountDialog } from "@/components/DeleteAccountDialog";
import { 
  Trash2, 
  AlertTriangle, 
  User,
  LogIn,
  Shield,
  Info
} from "lucide-react";

export default function DeleteAccountPage() {
  const { data: session, status } = useSession();

  // Loading state
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Not authenticated state
  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-red-600" />
              </div>
              <CardTitle className="text-xl text-gray-900">
                Authentication Required
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-gray-600">
                You need to be signed in to delete your account. Please sign in to continue.
              </p>
              
              <div className="space-y-3">
                <Button 
                  onClick={() => signIn()}
                  className="w-full bg-[#28B4A3] hover:bg-[#0D8B7C] text-white"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => window.history.back()}
                  className="w-full"
                >
                  Go Back
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Authenticated state - show account deletion interface
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <Trash2 className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Delete Account</h1>
          <p className="text-gray-600 mt-2">
            We're sorry to see you go. Manage your account deletion below.
          </p>
        </div>

        {/* Current User Info */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Current Account
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-[#28B4A3] rounded-full flex items-center justify-center text-white font-medium">
                {session.user?.name ? session.user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{session.user?.name || 'User'}</p>
                <p className="text-sm text-gray-600">{session.user?.email}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Account ID: {session.user?.id}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Information Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5 text-blue-600" />
              Before You Continue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Account Deletion Process</h4>
                <ul className="text-sm text-blue-800 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>You'll be asked to provide a reason for leaving (helps us improve)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>You'll need to confirm by typing a specific phrase</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Your account and all associated data will be permanently deleted</span>
                  </li>
                </ul>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h4 className="font-medium text-amber-900 mb-2">Alternative Options</h4>
                <p className="text-sm text-amber-800 mb-3">
                  Instead of deleting your account, you might consider:
                </p>
                <ul className="text-sm text-amber-800 space-y-1">
                  <li>• Temporarily deactivating your account</li>
                  <li>• Updating your privacy settings</li>
                  <li>• Contacting support for assistance</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              Danger Zone
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <div className="text-center space-y-4">
                <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Trash2 className="h-6 w-6 text-red-600" />
                </div>
                
                <div>
                  <h3 className="font-semibold text-red-900 text-lg">Permanently Delete Account</h3>
                  <p className="text-sm text-red-700 mt-2">
                    This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
                  </p>
                </div>

                <div className="pt-2">
                  <DeleteAccountDialog 
                    trigger={
                      <Button 
                        variant="destructive" 
                        size="lg"
                        className="bg-red-600 hover:bg-red-700 text-white font-medium"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete My Account
                      </Button>
                    }
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Need help? Contact our support team before deleting your account.
          </p>
        </div>
      </div>
    </div>
  );
}
