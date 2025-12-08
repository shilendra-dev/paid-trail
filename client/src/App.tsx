import { useEffect, useState } from "react";
import { usePlaidLink } from "react-plaid-link";
import api from "./lib/axios";

export default function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchLinkToken = async () => {
      console.log("Fetching link token...");
      try {
        const response = await api.get("/plaid/create_link_token");
        console.log("Link token response:", response.data);
        setToken(response.data.link_token);
      } catch (error) {
        console.error("Error fetching link token:", error);
      }
    };

    fetchLinkToken();
  }, []);

  const { open, ready } = usePlaidLink({
    token: token || "",
    onSuccess: (public_token) =>
      api.post("/api/set_access_token", { public_token }),
  });

  return (
    <button onClick={open} disabled={!ready || !token}>
      Link Account
    </button>
  );
}
