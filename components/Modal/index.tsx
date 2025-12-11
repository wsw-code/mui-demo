// components/MuiModal/index.tsx
'use client'

import {
    Modal, Box
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {
    Warning,
    Error,
    Info,
    CheckCircle,
    Close
} from '@mui/icons-material'
import { createPortal } from 'react-dom'
import { ReactNode, useState, useEffect } from 'react'

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
    const [loading, setLoading] = useState(false)
    const {
        title,
        content,
        okText = '确定',
        cancelText = '取消',
        onOk,
        onCancel,
        type = 'confirm',
        icon,
        width = 416,
        centered = false,
        maskClosable = false,
        closable = true
    } = config

    const handleClose = () => {
        setOpen(false)
        onCancel?.()
        setTimeout(() => onDestroy(), 300) // 等待动画完成
    }

    const handleOk = async () => {
        if (onOk) {
            try {
                setLoading(true)
                await onOk()
                setOpen(false)
                setTimeout(() => onDestroy(), 300)
            } catch (error) {
                // 错误处理
            } finally {
                setLoading(false)
            }
        } else {
            setOpen(false)
            setTimeout(() => onDestroy(), 300)
        }
    }

    const modalContent = (
        // <Dialog
        //     open={open}
        //     onClose={maskClosable ? handleClose : undefined}
        //     maxWidth="xs"
        //     fullWidth
        //     sx={{
        //         '& .MuiDialog-paper': {
        //             width,
        //             margin: centered ? 'auto' : undefined,
        //             ...(centered && { alignSelf: 'center' })
        //         }
        //     }}
        // >
        //     <DialogTitle sx={{
        //         display: 'flex',
        //         alignItems: 'center',
        //         gap: 1,
        //         padding: '16px 24px',
        //         borderBottom: '1px solid #f0f0f0'
        //     }}>
        //         {getIcon()}
        //         <Typography variant="h6" component="span">
        //             {title}
        //         </Typography>
        //         {closable && (
        //             <IconButton
        //                 aria-label="close"
        //                 onClick={handleClose}
        //                 sx={{
        //                     marginLeft: 'auto',
        //                     color: 'text.secondary'
        //                 }}
        //                 size="small"
        //             >
        //                 <Close fontSize="small" />
        //             </IconButton>
        //         )}
        //     </DialogTitle>

        //     <DialogContent sx={{ padding: '24px' }}>
        //         <Typography component="div">
        //             {content}
        //         </Typography>
        //     </DialogContent>

        //     <DialogActions sx={{
        //         padding: '8px 24px 16px',
        //         borderTop: '1px solid #f0f0f0'
        //     }}>
        //         <Button
        //             onClick={handleClose}
        //             variant="outlined"
        //             disabled={loading}
        //         >
        //             {cancelText}
        //         </Button>
        //         <Button
        //             onClick={handleOk}
        //             variant="contained"
        //             color={getButtonColor()}
        //             disabled={loading}
        //             startIcon={loading ? <CircularProgress size={16} /> : null}
        //         >
        //             {okText}
        //         </Button>
        //     </DialogActions>
        // </Dialog>

        <Modal
            open={open}
            onClose={() => {
                // onClose?.();
            }}

        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: '#0f212e',
                borderRadius: '10px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                // ...wrapperSxProps
            }}>
                <Box sx={{
                    backgroundColor: '#1a2c38',
                    height: '60px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: "0 30px",
                    color: '#fff',
                    // ...headerSxProps

                }}>
                    <Box>{title}</Box>
                    <CloseIcon sx={{ cursor: 'pointer' }} onClick={() => {
                        // onClose?.()
                    }} />
                </Box>
                <Box sx={{
                    flex: 1,
                    padding: "20px 30px 40px 30px",
                    // ...contentSxProps
                }}>
                    {content}
                </Box>
            </Box>
        </Modal>
    )

    return createPortal(modalContent, document.body)
}

export const ModalApi = {
    show: (config: ModalConfig) => {
        return modalManager.open(config)
    }
}