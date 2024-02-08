import productsData from '../data/products.json';
import pricePlansData from '../data/pricePlans.json';
import pagesData from '../data/pages.json';

interface Product {
  id: number;
  name: string;
  active: boolean;
  createdAt: string; // Для даты можно использовать строковый тип или Date, в зависимости от потребностей проекта
}

interface PricePlan {
  id: number;
  description: string;
  active: boolean;
  createdAt: string;
  removedAt: string;
}

interface Page {
  id: number;
  title: string;
  active: boolean;
  updatedAt: string;
  publishedAt: string;
}

const products: Product[] = productsData;
const pricePlans: PricePlan[] = pricePlansData;
const pages: Page[] = pagesData;

