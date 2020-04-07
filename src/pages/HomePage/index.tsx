import React, { useEffect, useState, useRef } from 'react';
import './style.css';

import StreamPage from '../StreamPage';
import ClientPage from '../ClientPage';

import io from 'socket.io-client';

type HomePageProps = {

}

const HomePage: React.FC<HomePageProps> = () => {

    const [selected, setSelected] = useState<any | null>(null);
    return (
        <>
            {selected == null ?
                <>
                    <button onClick={() => { setSelected(<StreamPage />) }} >Stremar</button>
                    <button onClick={() => { setSelected(<ClientPage />) }} >Assistir</button>
                </>
                :
                selected
            }
        </>
    );

}

export default HomePage;
