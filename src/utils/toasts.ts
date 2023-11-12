import { toast, ToastOptions } from 'react-toastify';

const toastConfig: ToastOptions = {
  position: 'bottom-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
};

export const toastSuccess = (message: string) => {
  toast.success(message, toastConfig);
};

export const toastError = (message: string) => {
  toast.error(message, toastConfig);
};
