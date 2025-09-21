import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadFile {
  id: string;
  name: string;
  status: "uploading" | "processing" | "completed" | "error";
  progress: number;
}

export function UploadZone() {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    const newFiles: UploadFile[] = droppedFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      status: "uploading",
      progress: 0,
    }));

    setFiles(prev => [...prev, ...newFiles]);

    // Simulate upload progress
    newFiles.forEach(file => {
      simulateProgress(file.id);
    });
  }, []);

  const simulateProgress = (fileId: string) => {
    const interval = setInterval(() => {
      setFiles(prev => prev.map(file => {
        if (file.id === fileId) {
          const newProgress = file.progress + Math.random() * 20;
          if (newProgress >= 100) {
            clearInterval(interval);
            return { ...file, progress: 100, status: "processing" };
          }
          return { ...file, progress: newProgress };
        }
        return file;
      }));
    }, 500);

    // Complete processing after upload
    setTimeout(() => {
      setFiles(prev => prev.map(file => 
        file.id === fileId ? { ...file, status: "completed" } : file
      ));
    }, 3000);
  };

  const getStatusIcon = (status: UploadFile["status"]) => {
    switch (status) {
      case "uploading":
      case "processing":
        return <FileText className="h-4 w-4 text-accent animate-pulse" />;
      case "completed":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-destructive" />;
    }
  };

  const getStatusText = (status: UploadFile["status"]) => {
    switch (status) {
      case "uploading":
        return "Uploading...";
      case "processing":
        return "Processing FM data...";
      case "completed":
        return "Ready for analysis";
      case "error":
        return "Upload failed";
    }
  };

  return (
    <div className="space-y-6">
      <Card
        className={cn(
          "border-2 border-dashed transition-colors cursor-pointer",
          isDragOver 
            ? "border-primary bg-primary/5" 
            : "border-border hover:border-primary/50"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <Upload className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">
            Drop your FM HTML files here
          </h3>
          <p className="text-muted-foreground mb-4">
            or click to browse your files
          </p>
          <Button className="bg-gradient-primary">
            Select Files
          </Button>
          <p className="text-xs text-muted-foreground mt-3">
            Supports: HTML exports from Football Manager
          </p>
        </CardContent>
      </Card>

      {files.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <h3 className="font-medium mb-4">Upload Progress</h3>
            <div className="space-y-4">
              {files.map((file) => (
                <div key={file.id} className="flex items-center gap-3">
                  {getStatusIcon(file.status)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {getStatusText(file.status)}
                    </p>
                  </div>
                  <div className="w-24">
                    <Progress 
                      value={file.progress} 
                      className="h-2"
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}