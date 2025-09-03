export interface Property {
  id: string
  title: string
  description: string
  price: number
  type: 'house' | 'apartment' | 'land'
  transaction_type: 'sale' | 'rent'
  status: 'available' | 'sold' | 'rented'
  bedrooms: number
  bathrooms: number
  area: number
  address: string
  city: string
  state: string
  zip_code: string
  latitude?: number
  longitude?: number
  images: string[]
  features: string[]
  created_at: string
  updated_at: string
}

export interface PropertyFormData {
  title: string
  description: string
  price: number
  type: 'house' | 'apartment' | 'land'
  transaction_type: 'sale' | 'rent'
  status: 'available' | 'sold' | 'rented'
  bedrooms: number
  bathrooms: number
  area: number
  address: string
  city: string
  state: string
  zip_code: string
  latitude?: number
  longitude?: number
  features: string[]
}