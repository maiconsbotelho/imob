import Link from "next/link";
import Image from "next/image";
import { Property } from "@/types/database";
import { Card, CardContent } from "@/components/ui/card";
import { FiHome, FiDroplet, FiMaximize2, FiMapPin } from "react-icons/fi";
import { IoBedOutline } from "react-icons/io5";

interface PropertyCardProps {
  property: Property;
  className?: string;
}

export default function PropertyCard({ property, className = "" }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const mainImage = property.image_urls?.[0] || '/placeholder-property.jpg';

  return (
    <Card className={`overflow-hidden hover:shadow-lg transition-shadow duration-300 ${className}`}>
      <Link href={`/imoveis/${property.id}`}>
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={mainImage}
            alt={property.title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {property.is_featured && (
            <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded-md text-sm font-medium">
              Destaque
            </div>
          )}
        </div>
        
        <CardContent className="p-4">
          <div className="space-y-3">
            {/* Preço */}
            <div className="text-2xl font-bold text-blue-600">
              {formatPrice(property.price)}
            </div>
            
            {/* Título */}
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
              {property.title}
            </h3>
            
            {/* Localização */}
            {property.address && (
              <div className="flex items-center text-gray-600 text-sm">
                <FiMapPin className="h-4 w-4 mr-1" />
                <span className="line-clamp-1">{property.address}, {property.city}</span>
              </div>
            )}
            
            {/* Características */}
            <div className="flex items-center justify-between text-gray-600 text-sm">
              <div className="flex items-center space-x-4">
                {property.bedrooms > 0 && (
                  <div className="flex items-center">
                    <IoBedOutline className="h-4 w-4 mr-1" />
                    <span>{property.bedrooms}</span>
                  </div>
                )}
                {property.bathrooms > 0 && (
                  <div className="flex items-center">
                    <FiDroplet className="h-4 w-4 mr-1" />
                    <span>{property.bathrooms}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <FiMaximize2 className="h-4 w-4 mr-1" />
                  <span>{property.area}m²</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}