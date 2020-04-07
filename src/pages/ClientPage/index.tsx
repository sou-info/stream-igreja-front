import React, { useEffect, useState, useRef } from 'react';
import './style.css';

import io from 'socket.io-client';

type ClientPageProps = {

}

const ClientPage: React.FC<ClientPageProps> = () => {
    const imageRef = useRef<HTMLImageElement>(null);
    const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);


    useEffect(() => {
        var socketConn = io('http://localhost:8080/stream');
        socketConn.on("get-frame", (frame: string) => {
            var image = imageRef?.current;
            if (image) {
                image!.src = frame;
            }
        });
    }, []);

    return (
        <img ref={imageRef} style={{ height: 420, width: 540, borderRadius: 50 }} />
    );

}

export default ClientPage;
