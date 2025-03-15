
// This is a simplified simulation of AI food analysis
// In a real app, this would connect to a machine learning model

export type FoodCategory = 'good' | 'okay' | 'bad';

export interface AnalysisResult {
  category: FoodCategory;
  confidence: number;
  recommendations: string[];
}

// Simulates food image analysis with a mock implementation
export const analyzeFoodImage = async (imageFile: File): Promise<AnalysisResult> => {
  // In a real implementation, this would send the image to an ML model
  // For demo purposes, we're randomly selecting a category
  
  return new Promise((resolve) => {
    // Simulating API call with a delay
    setTimeout(() => {
      const categories: FoodCategory[] = ['good', 'okay', 'bad'];
      const randomIndex = Math.floor(Math.random() * 3);
      const category = categories[randomIndex];
      
      const results: Record<FoodCategory, AnalysisResult> = {
        good: {
          category: 'good',
          confidence: 0.85 + Math.random() * 0.15,
          recommendations: [
            'Safe for human consumption',
            'Can be donated to shelters',
            'Deliver within 24 hours',
          ]
        },
        okay: {
          category: 'okay',
          confidence: 0.70 + Math.random() * 0.20,
          recommendations: [
            'Not ideal for direct consumption',
            'Can be processed for animal feed',
            'Consider food recycling options',
          ]
        },
        bad: {
          category: 'bad',
          confidence: 0.75 + Math.random() * 0.25,
          recommendations: [
            'Not suitable for consumption',
            'Send to composting facility',
            'Avoid mixing with recyclable waste',
          ]
        }
      };
      
      resolve(results[category]);
    }, 1500); // Simulated processing time
  });
};
