import { Auth0Provider } from "@auth0/auth0-react";

/**
 * Auth zero provider, wraps auth0 logic around the application
 * Used for authentication and authorization
 * @param param0
 * @returns
 */
export function AuthProvider({ children }: React.PropsWithChildren) {
  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH_DOMAIN!}
      clientId={process.env.REACT_APP_AUTH_ID!}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: process.env.REACT_APP_API_AUDIENCE,
      }}
    >
      {children}
    </Auth0Provider>
  );
}
