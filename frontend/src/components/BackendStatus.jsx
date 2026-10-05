import { useEffect, useState } from "react";
import { checkBackendHealth } from "../utils/api";

function BackendStatus() {
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    let active = true;

    const checkStatus = async () => {
      try {
        await checkBackendHealth();

        if (active) {
          setStatus("connected");
        }
      } catch {
        if (active) {
          setStatus("offline");
        }
      }
    };

    checkStatus();

    return () => {
      active = false;
    };
  }, []);

  if (status === "checking") {
    return (
      <div className="backend-status checking">
        Connecting to backend...
      </div>
    );
  }

  if (status === "connected") {
    return (
      <div className="backend-status connected">
        Backend Connected
      </div>
    );
  }

  return (
    <div className="backend-status offline">
      Backend Unavailable
    </div>
  );
}

export default BackendStatus;