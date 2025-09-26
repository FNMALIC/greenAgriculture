import instance from '../api';

export interface DeleteAccountData {
  reason?: string;
  feedback?: string;
}

/**
 * Delete the currently authenticated user account
 * This calls the Djoser /users/me/ endpoint with DELETE method
 */
export const deleteAccount = async (data?: DeleteAccountData) => {
  const response = await instance.delete('auth/users/me/', {
    data: data // Send optional reason/feedback in request body
  });
  return response.data;
};

/**
 * Get current user profile
 */
export const getCurrentUser = async () => {
  const response = await instance.get('auth/users/me/');
  return response.data;
};
