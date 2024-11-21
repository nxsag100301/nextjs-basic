import Link from 'next/link'

const AppPage = () => {
    return (
        <div className='list-page'>
            <ul>
                <li>
                    <Link href='/facebook'>Facebook</Link>
                </li>
                <li>
                    <Link href='/youtube'>Youtube</Link>
                </li>
                <li>
                    <Link href='/tiktok'>Tiktok</Link>
                </li>
            </ul>
        </div>
    )
}

export default AppPage