// ToastService.ts
import { toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastOptions: ToastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "colored",
};

const ToastService = {
  success: (message: string) => toast.success(message, toastOptions),
  error: (message: string) => toast.error(message, toastOptions),
  info: (message: string) => toast.info(message, toastOptions),
  warning: (message: string) => toast.warning(message, toastOptions),
};

export default ToastService;
