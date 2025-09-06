"use client";

import { Camera, FileUp, X } from "lucide-react";
import { useRef, useState, useCallback, type ChangeEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface ImageUploaderProps {
  onImageSelect: (imageDataUrl: string | null) => void;
  image: string | null;
}

export function ImageUploader({ onImageSelect, image }: ImageUploaderProps) {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const stopCamera = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraOn(false);
    }
  }, []);

  const startCamera = useCallback(async () => {
    stopCamera(); // Ensure any existing camera stream is stopped first
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment', width: 1280, height: 720 } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setIsCameraOn(true);
      }
    } catch (err) {
      console.error("Error accessing camera: ", err);
      toast({ variant: 'destructive', title: 'Camera Error', description: 'Could not access the camera. Please check permissions.'});
    }
  }, [toast, stopCamera]);


  useEffect(() => {
    // Cleanup camera on component unmount
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  const handleCapture = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg");
        onImageSelect(dataUrl);
        stopCamera();
      }
    }
  }, [onImageSelect, stopCamera]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onImageSelect(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleTabChange = (value: string) => {
    if(value === 'camera') {
      startCamera();
    } else {
      stopCamera();
    }
  }
  
  const clearImage = () => {
    onImageSelect(null);
    stopCamera();
  }

  return (
    <div className="w-full">
      {image ? (
        <div className="relative group w-full aspect-video rounded-lg overflow-hidden border border-dashed bg-muted/30">
          <Image src={image} alt="Selected pet" layout="fill" objectFit="contain" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button variant="destructive" size="icon" onClick={clearImage}>
              <X className="h-5 w-5" />
              <span className="sr-only">Remove image</span>
            </Button>
          </div>
        </div>
      ) : (
        <Tabs defaultValue="upload" className="w-full" onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload"><FileUp className="mr-2 h-4 w-4"/> Upload File</TabsTrigger>
            <TabsTrigger value="camera"><Camera className="mr-2 h-4 w-4"/> Use Camera</TabsTrigger>
          </TabsList>
          <TabsContent value="upload">
            <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-muted/50 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <FileUp className="w-8 h-8 mb-4 text-muted-foreground" />
                <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-muted-foreground">Any file type</p>
              </div>
              <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
            </label>
          </TabsContent>
          <TabsContent value="camera">
            <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center">
              <video ref={videoRef} autoPlay playsInline muted className={cn("w-full h-full object-cover", { 'hidden': !isCameraOn })}></video>
              {!isCameraOn && (
                <div className="text-center text-background/70">
                  <Camera className="w-12 h-12 mx-auto" />
                  <p>Camera is off</p>
                </div>
              )}
              {isCameraOn && (
                <div className="absolute bottom-4 flex gap-4">
                  <Button onClick={handleCapture}>Capture Photo</Button>
                  <Button variant="secondary" onClick={stopCamera}><X className="h-4 w-4 mr-2" /> Stop Camera</Button>
                </div>
              )}
            </div>
            <canvas ref={canvasRef} className="hidden"></canvas>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
