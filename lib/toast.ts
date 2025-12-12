// lib/toast.ts
let toastRef: any = null;

export const toast = {
  // 初始化
  init(ref: any) {
    toastRef = ref;
  },

  // API 方法
  success(message: string) {
    toastRef?.show(message, 'success');
  },

  error(message: string) {
    toastRef?.show(message, 'error');
  },

  warning(message: string) {
    toastRef?.show(message, 'warning');
  },

  info(message: string) {
    toastRef?.show(message, 'info');
  },
};
