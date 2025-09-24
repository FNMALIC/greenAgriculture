"use client"
import {QueryClientProvider,QueryClient} from "@tanstack/react-query"
import {ReactQueryDevtools} from "@tanstack/react-query-devtools"
import { ReactNode, useState } from "react"
// imp from "@/hooks/use-tokens";
// import { useAuthToken } from "@/hooks/use-tokens"
// import { useRouter } from "next/navigation";
// import axios from "axios"
import React from 'react'

export default function TanstackProvider({children}:{children:ReactNode}) {
  // const { refreshToken } = useAuthToken()
  const [queryClient] = useState(()=> new QueryClient())
  // const { refreshToken, setAuthToken } = useTokens();
  // const [refreshingToken, setRefreshingToken] = useState(false);

    return (
    <QueryClientProvider client={queryClient}>
{children}
<ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>

    )
}
