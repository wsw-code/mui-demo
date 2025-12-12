// components/MuiModal/index.tsx
'use client';

import { createPortal } from 'react-dom';
import { ReactNode, useState, useEffect } from 'react';
import SparkModal from '@/components/SparkModal';
import Logo from '@/svg/logo';

interface ModalConfig {
  title?: ReactNode;
  content: ReactNode;
  okText?: string;
  cancelText?: string;
  onOk?: () => void | Promise<void>;
  onCancel?: () => void;
  width?: number;
  centered?: boolean;
  maskClosable?: boolean;
  closable?: boolean;
}

/**全局管理器 */
class ModalManager {
  private modals: Array<{ id: string; config: ModalConfig }> = [];
  private listeners: Set<(modals: any[]) => void> = new Set();

  open(config: ModalConfig): string {
    const id = `modal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    this.modals.push({ id, config });
    this.notifyListeners();
    return id;
  }

  destroy(id: string) {
    this.modals = this.modals.filter((modal) => modal.id !== id);
    this.notifyListeners();
  }

  destroyAll() {
    this.modals = [];
    this.notifyListeners();
  }

  subscribe(listener: (modals: any[]) => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  getModals() {
    return this.modals;
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener([...this.modals]));
  }
}

export const modalManager = new ModalManager();

// 渲染器组件
export function MuiModalRenderer() {
  const [modals, setModals] = useState(modalManager.getModals());

  useEffect(() => {
    modalManager.subscribe((newModals) => {
      setModals(newModals);
    });
  }, []);

  return (
    <>
      {modals.map(({ id, config }) => (
        <MuiModal key={id} id={id} config={config} onDestroy={() => modalManager.destroy(id)} />
      ))}
    </>
  );
}

// 单个模态框组件
function MuiModal({
  id,
  config,
  onDestroy,
}: {
  id: string;
  config: ModalConfig;
  onDestroy: () => void;
}) {
  const [open, setOpen] = useState(true);
  const { content } = config;

  const modalContent = (
    <SparkModal
      open={open}
      onClose={() => {
        setOpen(false);
        setTimeout(() => {
          modalManager.destroy(id);
        }, 1000);
      }}
      title={<Logo sx={{ width: '80px', height: '40px' }} />}
      wrapperSxProps={{
        width: '100%',
        maxWidth: '630px',
        maxHeight: ['100%', '716px'],
        height: '100%',
        '@keyframes fadeInUp': {
          '0%': {
            opacity: 0,
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
        animation: 'fadeInUp 0.25s ease-out forwards',
      }}
    >
      {content}
    </SparkModal>
  );
  return createPortal(modalContent, document.body);
}

export const ModalApi = {
  show: (config: ModalConfig) => {
    return modalManager.open(config);
  },
  destory: (id: string) => {
    modalManager.destroy(id);
  },
};
