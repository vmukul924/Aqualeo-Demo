import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Handles two jobs for a single-page-app:
// 1. When navigating to a URL with a #hash (e.g. from another page to "/#services"),
//    scroll the matching element into view once it's mounted.
// 2. When navigating to a plain route with no hash, scroll to the top —
//    otherwise React Router keeps the old scroll position, which feels broken.
export default function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // small delay so the target element exists after route/section render
      const id = hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
}
