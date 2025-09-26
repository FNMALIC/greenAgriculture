"use client";

import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Trash2, AlertTriangle } from 'lucide-react';
import { useDeleteAccount } from '@/hooks/useDeleteAccount';

interface DeleteAccountDialogProps {
  trigger?: React.ReactNode;
}

const DELETE_REASONS = [
  { value: 'no_longer_needed', label: "I no longer need this service" },
  { value: 'too_expensive', label: "It's too expensive" },
  { value: 'found_alternative', label: "I found a better alternative" },
  { value: 'privacy_concerns', label: "Privacy concerns" },
  { value: 'technical_issues', label: "Technical issues" },
  { value: 'poor_support', label: "Poor customer support" },
  { value: 'other', label: "Other" }
];

export function DeleteAccountDialog({ trigger }: DeleteAccountDialogProps) {
  const [step, setStep] = useState<'reason' | 'confirm'>('reason');
  const [reason, setReason] = useState('');
  const [feedback, setFeedback] = useState('');
  const [confirmText, setConfirmText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  
  const deleteAccountMutation = useDeleteAccount();

  const handleStepOne = () => {
    if (reason) {
      setStep('confirm');
    }
  };

  const handleDeleteAccount = () => {
    if (confirmText.toLowerCase() === 'delete my account') {
      deleteAccountMutation.mutate({ reason, feedback });
      setIsOpen(false);
    }
  };

  const resetDialog = () => {
    setStep('reason');
    setReason('');
    setFeedback('');
    setConfirmText('');
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) resetDialog();
    }}>
      <AlertDialogTrigger asChild>
        {trigger || (
          <Button variant="destructive" className="flex items-center gap-2">
            <Trash2 className="h-4 w-4" />
            Delete Account
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-md">
        {step === 'reason' && (
          <>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Why are you leaving?
              </AlertDialogTitle>
              <AlertDialogDescription>
                We'd love to know what we could improve. Your feedback helps us serve others better.
              </AlertDialogDescription>
            </AlertDialogHeader>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reason">Reason for leaving *</Label>
                <Select value={reason} onValueChange={setReason}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a reason" />
                  </SelectTrigger>
                  <SelectContent>
                    {DELETE_REASONS.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="feedback">Additional feedback (optional)</Label>
                <Textarea
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Tell us more about your experience..."
                  className="resize-none"
                  rows={3}
                />
              </div>
            </div>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button 
                onClick={handleStepOne} 
                disabled={!reason}
                variant="secondary"
              >
                Continue
              </Button>
            </AlertDialogFooter>
          </>
        )}

        {step === 'confirm' && (
          <>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2 text-red-600">
                <AlertTriangle className="h-5 w-5" />
                Confirm Account Deletion
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account and remove all associated data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            
            <div className="space-y-4">
              <div className="rounded-lg bg-red-50 border border-red-200 p-4">
                <h4 className="font-medium text-red-800 mb-2">What will be deleted:</h4>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• Your profile and personal information</li>
                  <li>• All your posts and comments</li>
                  <li>• Your account settings and preferences</li>
                  <li>• Any uploaded files or media</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm">
                  Type <strong>"delete my account"</strong> to confirm
                </Label>
                <Input
                  id="confirm"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  placeholder="delete my account"
                  className="font-mono"
                />
              </div>
            </div>

            <AlertDialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setStep('reason')}
              >
                Back
              </Button>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteAccount}
                disabled={confirmText.toLowerCase() !== 'delete my account' || deleteAccountMutation.isPending}
                className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
              >
                {deleteAccountMutation.isPending ? "Deleting..." : "Delete Account"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
