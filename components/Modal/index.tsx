// components/MuiModal/index.tsx
'use client'

import { createPortal } from 'react-dom'
import { ReactNode, useState, useEffect } from 'react'
import SparkModal from '@/components/SparkModal'
import Logo from '@/svg/logo'

// 定义接口，完全模仿 Ant Design
interface ModalConfig {
    title?: ReactNode
    content: ReactNode
    okText?: string
    cancelText?: string
    onOk?: () => void | Promise<void>
    onCancel?: () => void
    type?: 'info' | 'success' | 'error' | 'warning' | 'confirm'
    icon?: ReactNode
    width?: number
    centered?: boolean
    maskClosable?: boolean
    closable?: boolean
}

// 全局管理器
class ModalManager {
    private modals: Array<{ id: string; config: ModalConfig }> = []
    private listeners: Set<(modals: any[]) => void> = new Set()

    // 显示模态框（类似 antd 的 Modal.confirm/info/success/error/warning）
    open(config: ModalConfig): string {
        const id = `modal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        this.modals.push({ id, config })
        this.notifyListeners()
        return id
    }

    // 销毁指定模态框
    destroy(id: string) {
        this.modals = this.modals.filter(modal => modal.id !== id)
        this.notifyListeners()
    }

    // 销毁所有模态框
    destroyAll() {
        this.modals = []
        this.notifyListeners()
    }

    // 订阅更新
    subscribe(listener: (modals: any[]) => void) {
        this.listeners.add(listener)
        return () => this.listeners.delete(listener)
    }

    // 获取所有模态框
    getModals() {
        return this.modals
    }

    private notifyListeners() {
        this.listeners.forEach(listener => listener([...this.modals]))
    }
}

export const modalManager = new ModalManager()

// 渲染器组件
export function MuiModalRenderer() {
    const [modals, setModals] = useState(modalManager.getModals())

    useEffect(() => {
        modalManager.subscribe((newModals) => {
            setModals(newModals)
        })
    }, [])

    return (
        <>
            {modals.map(({ id, config }) => (
                <MuiModal
                    key={id}
                    id={id}
                    config={config}
                    onDestroy={() => modalManager.destroy(id)}
                />
            ))}
        </>
    )
}

// 单个模态框组件
function MuiModal({ id, config, onDestroy }: {
    id: string
    config: ModalConfig
    onDestroy: () => void
}) {
    const [open, setOpen] = useState(true)
    const {
        content,
    } = config



    const modalContent = (


        <SparkModal
            open={open}
            onClose={() => {
                setOpen(false);
                setTimeout(() => {
                    modalManager.destroy(id)
                }, 1000)
            }}
            title={<Logo sx={{ width: '80px', height: '40px' }} />}
            wrapperSxProps={{
                width: '100%',
                maxWidth: '630px',
                maxHeight: '716px',
                height: '100%',
                '@keyframes fadeInUp': {
                    '0%': {
                        opacity: 0,
                        transform: 'translateY(30px)',
                    },
                    '100%': {
                        opacity: 1,
                        transform: 'translateY(0)',
                    }
                },

                // 应用动画
                animation: 'fadeInUp 0.25s ease-out forwards',
            }}

        >
            {content}
        </SparkModal>
    )

    return createPortal(modalContent, document.body)
}

export const ModalApi = {
    show: (config: ModalConfig) => {
        return modalManager.open(config)
    },
    destory: (id: string) => {
        modalManager.destroy(id)
    }
}