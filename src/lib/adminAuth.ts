import { useEffect, useState } from "react";

export const ADMIN_CRED_KEY = "vabt_admin_credentials_v1";
export const ADMIN_SESSION_KEY = "vabt_admin_authenticated";
export const ADMIN_AUTH_EVENT = "vabt_admin_auth_changed";

export const isAdminLoggedIn = (): boolean => {
  try {
    return sessionStorage.getItem(ADMIN_SESSION_KEY) === "true";
  } catch {
    return false;
  }
};

export const setAdminLoggedIn = (loggedIn: boolean): void => {
  try {
    if (loggedIn) {
      sessionStorage.setItem(ADMIN_SESSION_KEY, "true");
    } else {
      sessionStorage.removeItem(ADMIN_SESSION_KEY);
    }
    window.dispatchEvent(new Event(ADMIN_AUTH_EVENT));
  } catch {
    // Ignore storage errors in restricted browsing contexts
  }
};

export const useAdminLoggedIn = (): boolean => {
  const [loggedIn, setLoggedIn] = useState<boolean>(isAdminLoggedIn);

  useEffect(() => {
    const sync = () => setLoggedIn(isAdminLoggedIn());
    window.addEventListener(ADMIN_AUTH_EVENT, sync);
    window.addEventListener("focus", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(ADMIN_AUTH_EVENT, sync);
      window.removeEventListener("focus", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return loggedIn;
};
