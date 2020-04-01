import React, { useEffect, useRef } from 'react';
import './style.css';

type ClientPageProps = {

}

const ClientPage: React.FC<ClientPageProps> = () => {
    const imgRef = useRef<HTMLVideoElement>(null);
    useEffect(() => {
        var { current } = imgRef;
        if (current) {
            navigator.getUserMedia({ video: true, audio: false }, stream => {
                console.log(stream)
                current!.srcObject = stream;
                current!.onloadedmetadata = () => {
                    current?.play()
                };
            }, error => {
                console.error('Rejected!', error);
            });
        }
    }, [imgRef]);

    return (
        <div className="App">
            <video ref={imgRef}></video>
        </div>
    );

}

export default ClientPage;
