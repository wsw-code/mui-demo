'use client';

import { useState, useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { toast } from '@/lib/toast';

export default function ToastContainer() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<'success' | 'error' | 'warning' | 'info'>('success');

  // 初始化
  useEffect(() => {
    toast.init({
      show: (msg: string, t: typeof type) => {
        setMessage(msg);
        setType(t);
        setOpen(true);
      },
    });
  }, []);

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={() => setOpen(false)}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={() => setOpen(false)} severity={type}>
        {message}
      </Alert>
    </Snackbar>
  );
}
