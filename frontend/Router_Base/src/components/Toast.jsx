import { useEffect } from "react";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";

const Toast = ({ message, type = "success", onClose }) => {
  const colors = {
    success: "text-success-500",
    error: "text-error-500",
    info: "text-info-500",
    warning: "text-warning-500",
  };

  const icons = {
    success: <CheckCircle size={20} />,
    error: <AlertCircle size={20} />,
    info: <Info size={20} />,
    warning: <AlertTriangle size={20} />,
  };

  useEffect(() => {
    const timer = setTimeout(onClose, 10000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-5 right-5 bg-gray-200  flex items-center gap-3 shadow-lg shadow-gray-500 border  rounded-lg p-4 min-w-[250px] animate-slideIn ${colors[type]}`}
    >
      {icons[type]}
      <span className="text-sm text-black">{message}</span>
      <button
        onClick={onClose}
        className="ml-auto opacity-80 hover:opacity-100  cursor-pointer"
      >
        <X size={18} />
      </button>
    </div>
  );
};

export default Toast;
