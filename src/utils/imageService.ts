
// Simulated image database service
// In a real app, this would connect to an actual backend

export interface ImageItem {
  id: string;
  imageUrl: string;
  category: 'good' | 'okay' | 'bad';
  uploadDate: Date;
  uploadedBy: string;
  location?: string;
  destination?: string;
}

// Mock database of uploaded images
const mockImageDatabase: ImageItem[] = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
    category: 'good',
    uploadDate: new Date(Date.now() - 3600000 * 24),
    uploadedBy: 'Sunny Bakery',
    location: '123 Main St',
    destination: 'Hope Shelter',
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38',
    category: 'good',
    uploadDate: new Date(Date.now() - 3600000 * 48),
    uploadedBy: 'Green Restaurant',
    location: '456 Oak Ave',
  },
  {
    id: '3',
    imageUrl: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187',
    category: 'okay',
    uploadDate: new Date(Date.now() - 3600000 * 12),
    uploadedBy: 'Fresh Cafe',
    location: '789 Pine St',
  },
  {
    id: '4',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
    category: 'bad',
    uploadDate: new Date(Date.now() - 3600000 * 36),
    uploadedBy: 'City Diner',
    location: '101 Elm Blvd',
  },
];

export const getImages = (): Promise<ImageItem[]> => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      resolve(mockImageDatabase);
    }, 500);
  });
};

export const saveImageAnalysis = (
  imageUrl: string,
  category: 'good' | 'okay' | 'bad',
  uploadedBy: string = 'Anonymous Provider'
): Promise<ImageItem> => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      const newImage: ImageItem = {
        id: Date.now().toString(),
        imageUrl,
        category,
        uploadDate: new Date(),
        uploadedBy,
        location: 'Current Location',
      };
      
      // In a real app, this would save to a database
      mockImageDatabase.unshift(newImage);
      
      resolve(newImage);
    }, 500);
  });
};
