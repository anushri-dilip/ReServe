
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Camera, Upload, Loader2 } from 'lucide-react';
import { analyzeFoodImage, type AnalysisResult } from '@/utils/imageAnalysis';
import { saveImageAnalysis } from '@/utils/imageService';
import ResultCard from './ResultCard';
import { useToast } from '@/components/ui/use-toast';

const FoodAnalyzer: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
      
      // Reset previous results
      setResult(null);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleAnalyze = async () => {
    if (!file) {
      toast({
        title: "No image selected",
        description: "Please select a food image to analyze",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      const analysisResult = await analyzeFoodImage(file);
      setResult(analysisResult);
      
      // Save the image to our service when analysis is complete
      if (image) {
        await saveImageAnalysis(
          image, 
          analysisResult.category,
          "Your Restaurant Name" // This should come from user profile in real app
        );
      }
      
      toast({
        title: "Analysis Complete",
        description: `Food categorized as ${analysisResult.category.toUpperCase()}`,
      });
    } catch (error) {
      console.error('Error analyzing image:', error);
      toast({
        title: "Analysis Failed",
        description: "There was a problem analyzing the image",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setImage(null);
    setFile(null);
    setResult(null);
  };

  return (
    <div className="w-full max-w-md mx-auto px-4">
      <div className="text-center mb-6 animate-fade-in">
        <h2 className="text-2xl font-bold mb-2">Food Analysis</h2>
        <p className="text-muted-foreground">
          Take or upload a photo of food to analyze its condition
        </p>
      </div>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      
      {!image ? (
        <Card className="p-6 mb-6 border-dashed border-2 animate-fade-in">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Camera className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-medium mb-2">Take or upload a photo</h3>
            <p className="text-sm text-muted-foreground mb-4">
              We'll analyze the food condition and suggest the best route
            </p>
            <div className="flex gap-3">
              <Button variant="outline" onClick={triggerFileInput}>
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </Button>
              <Button onClick={triggerFileInput}>
                <Camera className="h-4 w-4 mr-2" />
                Camera
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <div className="animate-fade-in">
          <Card className="p-4 mb-6 overflow-hidden">
            <div className="relative aspect-square rounded-md overflow-hidden mb-4">
              <img 
                src={image} 
                alt="Food to analyze" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {!result && (
              <Button 
                className="w-full"
                onClick={handleAnalyze}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  'Analyze Food Condition'
                )}
              </Button>
            )}
          </Card>
          
          {result && (
            <div className="animate-scale-in">
              <ResultCard result={result} onReset={resetAnalysis} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FoodAnalyzer;
