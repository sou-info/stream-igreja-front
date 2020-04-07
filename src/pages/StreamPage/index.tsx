import React, { useEffect, useRef, useState } from 'react';
import './style.css';
import io from 'socket.io-client';

type StreamPageProps = {

}

const StreamPage: React.FC<StreamPageProps> = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvaRef = useRef<HTMLCanvasElement>(null);
    const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);
    const [streaming, setStreming] = useState(false);
    var streamingIntervalId: any = null;

    function toogleVideo() {
        var video = videoRef?.current;
        if (video) {
            navigator.getUserMedia({ video: true, audio: false }, stream => {
                video!.srcObject = stream;
                video!.onloadedmetadata = () => {
                    video?.play()
                };
                setStreming(true);
            }, error => {
                setStreming(false);
            });
        }
    }


    function canvaConfig() {
        var canvas = canvaRef?.current;
        if (canvas) {
            canvas.width = 540
            canvas.height = 420
        }
    }

    function streamVideo() {
        var canvas = canvaRef?.current;
        var video = videoRef?.current;
        if (video && canvas && streaming) {
            const context = canvas!.getContext("2d");
            context!.drawImage(video, 0, 0, canvas.width, canvas.height);
            socket?.emit("send-frame", { frame: canvas!.toDataURL("image/webp") })
        }
        if (!streaming) {
            clearInterval(streamingIntervalId);
        }
    }

    useEffect(toogleVideo, [videoRef]);
    useEffect(canvaConfig, [canvaRef]);
    useEffect(() => { setSocket(io('http://localhost:8080/stream')) }, [])
    useEffect(() => {
        streamingIntervalId = setInterval(
            () => streamVideo(),
            1000 / 15 //frames per seconds
        );
    }, [canvaRef, videoRef, streaming]);

    return (
        <div className="App">
            <video style={{ height: 420, width: 540 }} ref={videoRef}></video>
            <canvas style={{ display: "none" }} ref={canvaRef}></canvas>
        </div>
    );

}

export default StreamPage;
