
export enum Category {
    REFORMER = 'Reformer',
    CHAIR = 'Chair',
    PRIVATE = 'Private',
    POOL = 'Swimming Pool'
  }
  
  export interface ServiceItem {
    id: string;
    name: Category;
    ready: boolean;
    description: string;
  }
  
  export interface TestimonialItem {
    id: number;
    name: string;
    rating: number;
    text: string;
    role: string;
  }
  