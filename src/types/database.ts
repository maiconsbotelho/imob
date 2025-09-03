export interface PropertyType {
  id: string;
  name: string;
}

export interface Property {
  id: string;
  created_at: string;
  title: string;
  description?: string;
  price: number;
  address?: string;
  city: string;
  state: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type_id: string;
  image_urls: string[];
  is_featured: boolean;
  property_type?: PropertyType;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
  property_id?: string;
}