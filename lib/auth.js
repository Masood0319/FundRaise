import { apiRequest } from "@/lib/apiClient";
import { showToast } from "@/lib/toast";

export async function logoutUser({ redirect = true, toast = true, router } = {}) {
  try {
    await apiRequest("auth/logout", { method: "GET" });
  } catch (_) {
    // Even if the API fails, proceed with local logout to keep UX consistent.
  }

  try {
    localStorage.removeItem("token");
  } catch (_) {}

  if (toast) {
    showToast("You have been logged out");
  }

  if (redirect) {
    if (router?.push) {
      router.push("/login");
    } else if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  }
}
