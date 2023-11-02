import { Auth0Provider } from "@auth0/auth0-react";

export function AuthProvider({ children }: React.PropsWithChildren) {
  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH_DOMAIN!}
      clientId={process.env.REACT_APP_AUTH_ID!}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      {children}
    </Auth0Provider>
  );
}
