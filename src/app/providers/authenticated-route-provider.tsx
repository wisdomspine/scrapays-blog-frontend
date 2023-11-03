import { useAuth0 } from "@auth0/auth0-react";
import { useScreenLoader } from "app/providers/screen-loader-provider";
import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * A wrapper around routes that can only be accessed if a user is logged in
 * @param param0
 * @returns
 */
export function AuthenticatedRouteProvider({ children }: PropsWithChildren) {
  const { isAuthenticated, isLoading } = useAuth0();
  const { start, stop } = useScreenLoader();
  const navigate = useNavigate();
  useEffect(() => {
    /**
     * Checks if a user is not authenticated
     * if not authenticated, redirect to login page
     */
    if (!isAuthenticated && !isLoading) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  // shows and hide the screen loader
  useEffect(() => {
    if (isLoading) {
      start();
    } else {
      stop();
    }
  }, [isLoading, start, stop]);
  /**
   * Checks if a user is authenticated
   * if authenticated, show children
   */
  return <>{isAuthenticated && children}</>;
}
