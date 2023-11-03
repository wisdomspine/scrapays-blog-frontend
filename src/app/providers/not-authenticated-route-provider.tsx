import { useAuth0 } from "@auth0/auth0-react";
import { useScreenLoader } from "app/providers/screen-loader-provider";
import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * A wrapper around routes that can only be accessed if a user is not logged in
 * @param param0
 * @returns
 */
export function NotAuthenticatedRouteProvider({ children }: PropsWithChildren) {
  const { isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();
  const { start, stop } = useScreenLoader();
  useEffect(() => {
    /**
     * Checks if a user is  authenticated
     * if  authenticated, redirect to home page
     */
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  // shows and hide the screen loader
  useEffect(() => {
    if (!isLoading) {
      start();
    } else {
      stop();
    }
  }, [isLoading]);
  /**
   * Checks if a user is not authenticated
   * if not authenticated, show children
   * Note: the loading must be false
   */
  return <>{!isAuthenticated && !isLoading && children}</>;
}
