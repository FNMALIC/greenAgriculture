import { useMutation } from '@tanstack/react-query';

import { activate } from '@/utils/apis/auth';
import React from 'react';

export const useActivation = () => {
  const [isSuccess, setIsSuccess] = React.useState(false);
  const { mutate: activationMutate, isPending: isActivating } = useMutation({
    mutationFn: activate,
    onSuccess: () => {
      setIsSuccess(true); 
    },
    onError: (error) => {
      console.error("Error occurred during account activation:", error);
    },
  });

  const activation = async (verifyUser) => {
    await activationMutate(verifyUser);
  };

  return {
    isSuccess,
    activation,
  };
};