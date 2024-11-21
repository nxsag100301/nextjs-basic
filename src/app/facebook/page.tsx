'use client'
import { useRouter } from 'next/navigation'
import { Button } from 'react-bootstrap'

const Facebook = () => {
    const router = useRouter()
    return (
        <div>
            Facebook
            <div>
                <Button variant='primary' onClick={() => router.push('/')}>Back Home</Button>
            </div>
        </div>
    )
}

export default Facebook