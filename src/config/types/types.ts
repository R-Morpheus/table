export interface Product {
  id: number;
  name: string;
  active: boolean;
  createdAt: string;
}

export interface PricePlan {
  id: number;
  description: string;
  active: boolean;
  createdAt: string;
  removedAt: string;
}

export interface Page {
  id: number;
  title: string;
  active: boolean;
  updatedAt: string;
  publishedAt: string;
}

export type DataType = Product | PricePlan | Page;