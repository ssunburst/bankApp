import Link from 'next/link';

function Navbar() {
    return (
        <nav className="flex flex-row bg-green-500 p-4">
            <Link href="/">
                <h1 className="text-gray-100 text-4xl">NCR</h1>
            </Link>
        </nav>
    );
}

export default Navbar;