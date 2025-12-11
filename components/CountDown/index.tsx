// components/CountdownCircle.jsx
import { Box, Typography, keyframes } from '@mui/material'
import { useState, useEffect, useRef } from 'react'

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`



interface CountdownCircleProps {
    seconds: number
    size?: number
    onComplete?: () => void
    showWarning?: boolean
    warningSeconds?: number,
    color?: string
}

export default function CountdownCircle({
    seconds,
    size = 200,
    onComplete,
    showWarning = true,
    color = '#fff',
    warningSeconds = 10
}: CountdownCircleProps) {
    const [timeLeft, setTimeLeft] = useState(seconds)
    const intervalRef = useRef<NodeJS.Timeout>(null)
    const strokeWidth = size * 0.1
    const radius = (size - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius
    const strokeDashoffset = circumference - (timeLeft / seconds) * circumference

    // 警告状态
    const isWarning = showWarning && timeLeft <= warningSeconds
    const isCritical = timeLeft <= 5

    useEffect(() => {
        if (timeLeft <= 0) {
            intervalRef.current && clearInterval(intervalRef.current)
            onComplete?.()
            return
        }

        intervalRef.current = setInterval(() => {
            setTimeLeft((prev) => prev - 1)
        }, 1000)

        return () => {
            intervalRef.current && clearInterval(intervalRef.current)
        }
    }, [timeLeft, onComplete])

    // 重置计时器
    useEffect(() => {
        setTimeLeft(seconds)
    }, [seconds])

    // 格式化时间显示
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    return (
        <Box
            sx={{
                position: 'relative',
                width: size,
                height: size,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {/* 背景圆环 */}
            <Box
                sx={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    // backgroundColor: 'rgba(0,0,0,0.1)',
                    // boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                }}
            />

            {/* 外圈光环效果 */}
            {/* {isCritical && (
                <Box
                    sx={{
                        position: 'absolute',
                        width: size + 20,
                        height: size + 20,
                        borderRadius: '50%',
                        border: `3px solid ${isWarning ? '#ff4757' : color}`,
                        animation: `${pulse} 0.5s ease-in-out infinite`,
                        filter: 'blur(2px)',
                        opacity: 0.6,
                    }}
                />
            )} */}

            {/* SVG 进度圆环 */}
            <svg
                width={size}
                height={size}
                style={{
                    position: 'absolute',
                    transform: 'rotate(-90deg)',
                }}
            >
                {/* 背景圆环 */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="rgba(0,0,0,0.1)"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                />

                {/* 进度圆环 */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={isWarning ? '#ff4757' : color}
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    style={{
                        transition: 'stroke-dashoffset 1s linear',
                        filter: isCritical ? 'drop-shadow(0 0 8px rgba(255,71,87,0.8))' : 'none',
                    }}
                />
            </svg>

            {/* 中间数字 */}
            <Box
                sx={{
                    position: 'relative',
                    zIndex: 2,
                    textAlign: 'center',
                    animation: isCritical ? `${pulse} 1s ease-in-out infinite` : 'none',
                }}
            >
                <Typography
                    variant="h1"
                    component="div"
                    sx={{
                        fontSize: size * 0.3,
                        fontWeight: 900,
                        color: isWarning ? '#ff4757' : color,
                        textShadow: isCritical
                            ? '0 0 20px rgba(255,71,87,0.8)'
                            : '0 4px 8px rgba(0,0,0,0.2)',
                        lineHeight: 1,
                    }}
                >
                    {formatTime(timeLeft)}
                </Typography>


            </Box>

            {/* 闪烁的紧急提示 */}
            {/* {isCritical && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: -40,
                        left: 0,
                        right: 0,
                        textAlign: 'center',
                        animation: `${pulse} 0.5s ease-in-out infinite`,
                    }}
                >
                </Box>
            )} */}
        </Box>
    )
}