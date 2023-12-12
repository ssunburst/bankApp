'use client'

import {useState} from 'react'
import Link from 'next/link';

export default function GridPage({title, subtitle, link, items, resultsPerPage}) {
    return (
    <div className="flex flex-col items-center gap-4">
        <h2 className="flex-1 text-center text-2xl">{title}</h2>
        <h3 className="flex-1 text-center text-4xl">{subtitle}</h3>
        {items && <Grid items={ items } resultsPerPage={resultsPerPage} link={link}/>}
    </div>
    );
}

function Grid({items, resultsPerPage, link}) {
    const [currentPage, setCurrentPage] = useState(0);
    const displayItems = items.slice(currentPage*resultsPerPage, Math.min((currentPage+1)*resultsPerPage, items.length));
    
    function handleMore() {
        setCurrentPage(cp => cp + 1);
    }

    function handleLess() {
        setCurrentPage(cp => cp - 1);
    }

    return (
        <>
            <div className="grid grid-cols-3 gap-16 mt-4"> 
                {
                    displayItems.map(item => (
                        <Link href={`${link}/${item.id}`} key={item.id} className="flex flex-col grow justify-center text-center bg-green-500 py-5 px-10 rounded-md">
                            {Object.entries(item).map(([key, value]) => (
                                <p key={key} className="text-gray-50">{key=="balance"? "$" : ""}{value}</p>
                            ))}
                        </Link>
                    ))
                }
                {items.length > (currentPage+1) * resultsPerPage && (
                    <div className="flex flex-col justify-center text-center bg-green-500 p-6 rounded-md" onClick={handleMore}>
                        <p>Más...</p>
                    </div>
                )}
            </div>
            {currentPage > 0 && (
                <div className="text-gray-50 max-w-min bg-green-500 p-5 rounded-md" onClick={handleLess}>
                    Volver
                </div>
            )}
        </>
    );
}