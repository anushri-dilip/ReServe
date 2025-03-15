
import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, User } from 'lucide-react';
import { getImages, type ImageItem } from '@/utils/imageService';
import { format } from 'date-fns';
import { useToast } from './ui/use-toast';

const ImageGallery: React.FC = () => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'good' | 'okay' | 'bad'>('all');
  const { toast } = useToast();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = await getImages();
        setImages(data);
      } catch (error) {
        console.error('Failed to fetch images:', error);
        toast({
          title: "Error",
          description: "Failed to load food images",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [toast]);

  const filteredImages = activeTab === 'all' 
    ? images 
    : images.filter(img => img.category === activeTab);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'good':
        return 'bg-reserve-green text-white';
      case 'okay':
        return 'bg-reserve-yellow text-black';
      case 'bad':
        return 'bg-reserve-red text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center py-12">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-screen-lg mx-auto px-4 animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Available Food</h2>
        <p className="text-muted-foreground">
          View and manage food items uploaded by providers
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={(value) => setActiveTab(value as any)}>
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="good">Good</TabsTrigger>
          <TabsTrigger value="okay">Okay</TabsTrigger>
          <TabsTrigger value="bad">Bad</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredImages.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="aspect-video relative">
                  <img 
                    src={item.imageUrl} 
                    alt="Food item" 
                    className="w-full h-full object-cover"
                  />
                  <Badge className={`absolute top-2 right-2 ${getCategoryColor(item.category)}`}>
                    {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                  </Badge>
                </div>
                <div className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <User className="h-4 w-4 mr-1" />
                      <span>{item.uploadedBy}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{item.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{format(item.uploadDate, 'MMM d, h:mm a')}</span>
                    </div>
                    {item.destination && (
                      <div className="mt-2">
                        <Badge variant="outline" className="bg-muted/50">
                          Assigned to: {item.destination}
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          {filteredImages.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No food items available in this category
            </div>
          )}
        </TabsContent>

        <TabsContent value="good" className="mt-0">
          {/* Content will be rendered through the filteredImages */}
        </TabsContent>
        
        <TabsContent value="okay" className="mt-0">
          {/* Content will be rendered through the filteredImages */}
        </TabsContent>
        
        <TabsContent value="bad" className="mt-0">
          {/* Content will be rendered through the filteredImages */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ImageGallery;
