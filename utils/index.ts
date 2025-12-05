

export const isDev = process.env.NODE_ENV === 'development'

export const getPath = (path: string) => {
    const preUrl = isDev ? 'http://localhost:3000' : 'https://mui-demo-theta.vercel.app'
    return `${preUrl}${path}`
}