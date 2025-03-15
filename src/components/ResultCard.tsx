
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle2, AlertTriangle, XCircle, RefreshCw, Share2 } from 'lucide-react';
import type { AnalysisResult, FoodCategory } from '@/utils/imageAnalysis';
import { useToast } from '@/components/ui/use-toast';

interface ResultCardProps {
  result: AnalysisResult;
  onReset: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ result, onReset }) => {
  const { toast } = useToast();
  
  const getCategoryIcon = (category: FoodCategory) => {
    switch (category) {
      case 'good':
        return <CheckCircle2 className="h-5 w-5 text-reserve-green" />;
      case 'okay':
        return <AlertTriangle className="h-5 w-5 text-reserve-yellow" />;
      case 'bad':
        return <XCircle className="h-5 w-5 text-reserve-red" />;
    }
  };
  
  const getCategoryTitle = (category: FoodCategory) => {
    switch (category) {
      case 'good':
        return 'Good Condition';
      case 'okay':
        return 'Acceptable Condition';
      case 'bad':
        return 'Poor Condition';
    }
  };
  
  const getDestination = (category: FoodCategory) => {
    switch (category) {
      case 'good':
        return 'Shelters, Food Banks';
      case 'okay':
        return 'Food Processors, Animal Feed';
      case 'bad':
        return 'Composting Facilities';
    }
  };
  
  const handleShare = () => {
    toast({
      title: "Notification Sent",
      description: `Alert sent to ${getDestination(result.category)}`,
    });
  };

  return (
    <Card className="overflow-hidden mb-6">
      <div className={`p-4 category-${result.category}`}>
        <div className="flex items-center gap-2">
          {getCategoryIcon(result.category)}
          <h3 className="font-medium">{getCategoryTitle(result.category)}</h3>
        </div>
        <div className="text-sm mt-1">
          Confidence: {Math.round(result.confidence * 100)}%
        </div>
      </div>
      
      <div className="p-4">
        <h4 className="font-medium mb-2">Recommendations</h4>
        <ul className="space-y-2 mb-4">
          {result.recommendations.map((recommendation, index) => (
            <li key={index} className="text-sm flex items-start gap-2">
              <div className="min-w-4 h-4 rounded-full bg-muted mt-0.5" />
              <span>{recommendation}</span>
            </li>
          ))}
        </ul>
        
        <div className="border-t pt-4">
          <h4 className="font-medium mb-2">Suggested Destination</h4>
          <p className="text-sm mb-4">{getDestination(result.category)}</p>
          
          <div className="flex gap-3">
            <Button variant="outline" onClick={onReset} className="flex-1">
              <RefreshCw className="h-4 w-4 mr-2" />
              New Scan
            </Button>
            <Button onClick={handleShare} className="flex-1">
              <Share2 className="h-4 w-4 mr-2" />
              Notify
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ResultCard;
