"use client";

import ReduxProviders from "@/utils/ReduxProviders";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      <ReduxProviders>{children}</ReduxProviders>
    </GoogleOAuthProvider>
  );
}
