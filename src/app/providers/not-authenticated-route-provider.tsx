import { useAuth0 } from "@auth0/auth0-react";
import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * A wrapper around routes that can only be accessed if a user is not logged in
 * @param param0
 * @returns
 */
export function NotAuthenticatedRouteProvider({ children }: PropsWithChildren) {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  useEffect(() => {
    /**
     * Checks if a user is  authenticated
     * if  authenticated, redirect to home page
     */
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);
  /**
   * Checks if a user is not authenticated
   * if not authenticated, show children
   */
  return <>{!isAuthenticated && children}</>;
}
