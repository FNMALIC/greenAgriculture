"use client";

import { useMutation } from '@tanstack/react-query';
import { deleteAccount, DeleteAccountData } from '@/utils/apis/user';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import Cookies from 'js-cookie';
import { useToast } from './use-toast';

export const useDeleteAccount = () => {
  const router = useRouter();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data?: DeleteAccountData) => deleteAccount(data),
    onSuccess: async () => {
      // Clear all authentication tokens
      Cookies.remove('access');
      Cookies.remove('refresh');
      
      // Sign out from NextAuth session
      await signOut({ redirect: false });
      
      // Show success message
      toast({
        title: "Account Deleted",
        description: "Your account has been successfully deleted. We're sorry to see you go!",
      });
      
      // Redirect to home page or login page
      router.push('/');
    },
    onError: (error: any) => {
      console.error('Account deletion failed:', error);
      toast({
        variant: "destructive",
        title: "Deletion Failed",
        description: error?.response?.data?.detail || "Failed to delete account. Please try again.",
      });
    }
  });
};
