"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AxiosError } from "axios";

type ErrorPayload = {
  success: boolean;
  payload: {
    type: string;
    messages: string[];
  };
  issueAt: string;
};

export interface GenericError extends AxiosError {
  data?: ErrorPayload;
}

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: GenericError;
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
    },
  },
});

const QueryWrapper: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryWrapper;
