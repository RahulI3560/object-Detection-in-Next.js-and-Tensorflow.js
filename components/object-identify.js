"use client"
import React, { useEffect, useRef, useState } from 'react'
import Webcam from "react-webcam";
import {load as cocossdload} from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
import {renderPredictions} from "@/utils/render-predictions";
let dectInterval
const ObjectIdentify = () => {
    const[isLoading, setIsLoading]=useState(true);

    const webcamRef = useRef(null);
    const canvasRef = useRef(null);

    const runcoco = async () =>{
        setIsLoading(true);
        const net = await cocossdload()
        setIsLoading(false);

        dectInterval = setInterval(()=>{
           runObjectDectection(net)
        },15)
    }

    async function runObjectDectection(net){
        if(canvasRef.current && webcamRef.current.video?.readyState ===4){
            canvasRef.current.width = webcamRef.current.video.videoWidth;
            canvasRef.current.height = webcamRef.current.video.videoHeight;

            const detectedObjects = await net.detect(webcamRef.current.video,undefined,0.6);

            console.log(detectedObjects);
            const context = canvasRef.current.getContext("2d");
            renderPredictions(detectedObjects,context);
        }
    }

    const showmyvideo=()=>{
        if(webcamRef.current!==null && webcamRef.current.video?.readyState==4){
            const myvideowidth = webcamRef.current.video.videoWidth;
            const myvideoheight = webcamRef.current.video.videoHeight;

            webcamRef.current.video.Width = myvideowidth;
            webcamRef.current.video.height = myvideoheight; 
        }
    };
    useEffect(()=>{
        runcoco();
        showmyvideo();
    },[])
  return (
    <div className='mt-8'>{
        isLoading ? (
            <div className="gradient-text">Loading AI Model.....</div>
        ):
        <div className="relative flex justify-center items-center gradient p-1.5 rounded-md">
            <Webcam ref={webcamRef} className="rounded-md w-full lg:h-[720px]" muted/>
            <canvas ref={canvasRef}
            className="absolute top-0 left-0 z-99999 w-full lg:h-[720px]"/>
        </div>}
    </div>
  )
}
export default ObjectIdentify;
