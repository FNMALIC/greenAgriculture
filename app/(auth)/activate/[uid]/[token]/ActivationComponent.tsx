"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

import { useActivation } from "@/hooks/use-verify";

interface Props {
    code?: { uid: string; token: string }
}

export default function ActivationComponent({ code }: Props) {
    const router = useRouter();
    const { activation } = useActivation();
    const activationAttempted = useRef(false);
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (activationAttempted.current) return;

        activationAttempted.current = true;

        activation({ code })
            .then(() => {
                setStatus('success');
                setMessage('Your account has been successfully activated!');

            })
            .catch((error) => {
                setStatus('error');
                setMessage('Account activation failed. The link may be expired or invalid.');
                console.log(error.data?.detail);
                console.log(error.status);
                console.log(error);
            });
    }, [activation, code, router]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full mx-4">
                <div className="bg-white rounded-lg shadow-lg p-8 text-center">

                    {/* Status Icon */}
                    <div className="mb-6">
                        {status === 'loading' && (
                            <Loader2 className="h-16 w-16 animate-spin  mx-auto" />
                        )}
                        {status === 'success' && (
                            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                        )}
                        {status === 'error' && (
                            <XCircle className="h-16 w-16 text-red-500 mx-auto" />
                        )}
                    </div>


                    {/* Message */}
                    <p className="text- -earth mb-6 font-fredoka">
                        {status === 'loading' && 'Please wait while we activate your account and prepare your community access.'}
                        {message}
                    </p>

                    {/* Additional Info */}
                    {status === 'success' && (
                        <div className="bg- -beige/20 rounded-lg p-4 mb-4">
                            <p className="text-sm text- -earth font-fredoka">
                                you can know login in your account.
                            </p>
                        </div>
                    )}

                    {status === 'error' && (
                        <div className="space-y-3">
                            <button
                                onClick={() => router.push('/login')}
                                className="w-full bg- -orange hover:bg-orange-600 text-white font-fredoka font-medium py-2 px-4 rounded-md transition-colors"
                            >
                              An error occurred during the activation of your account , please try again or contact service if error persist
                            </button>

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
