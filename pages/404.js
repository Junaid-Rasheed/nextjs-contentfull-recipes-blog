import React from 'react'
import Link from 'next/link'
function NotFound() {
    return (
        <div>
            <h3>Oops ! This Page doesn't exist</h3>
            <h4>Redirect back to <Link href='/'>Main Page</Link></h4>
        </div>
    )
}

export default NotFound
