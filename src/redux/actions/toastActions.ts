export const SHOW_TOAST = 'SHOW_TOAST';
export const HIDE_TOAST = 'HIDE_TOAST';

export const showToast = (toastType:any, message:any) => ({
    type: SHOW_TOAST,
    payload: { toastType, message },
});

export const hideToast = () => ({
    type: HIDE_TOAST,
});
