import React, { useEffect, useState } from "react";

const AlertMessage = ({
  type = "success",
  message,
  duration = 3000,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // On informe le parent que l'alerte doit disparaître
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div
        className={`alert ${type === "success" ? "alert-success" : "alert-error"} shadow-lg w-fit`}
      >
        <span>{message}</span>
      </div>
    </div>
  );
};

export default AlertMessage;
