'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { Property } from '@/types/database';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { FiArrowLeft, FiMapPin, FiHome, FiDroplet, FiMaximize2 } from 'react-icons/fi';
import { IoBedOutline } from 'react-icons/io5';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface PropertyDetailsClientProps {
  propertyId: string;
}

export default function PropertyDetailsClient({ propertyId }: PropertyDetailsClientProps) {
  const [property, setProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const supabase = createClient();

  useEffect(() => {
    if (propertyId) {
      fetchProperty();
    }
  }, [propertyId]);

  const fetchProperty = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('properties')
        .select(`
          *,
          property_type:property_types(id, name)
        `)
        .eq('id', propertyId)
        .single();

      if (error) throw error;
      setProperty(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar imóvel');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);

    try {
      const { error } = await supabase
        .from('contact_forms')
        .insert({
          ...formData,
          property_id: propertyId
        });

      if (error) throw error;
      
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao enviar mensagem');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando detalhes do imóvel...</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-600 mb-4">Erro: {error || 'Imóvel não encontrado'}</p>
          <Link href="/imoveis">
            <Button>Voltar para listagem</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link href="/imoveis" className="inline-flex items-center text-blue-600 hover:text-blue-800">
          <FiArrowLeft className="w-4 h-4 mr-2" />
          Voltar para listagem
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Coluna Principal - Imagens e Detalhes */}
        <div className="lg:col-span-2 space-y-6">
          {/* Galeria de Imagens */}
          <div className="space-y-4">
            {property.image_urls && property.image_urls.length > 0 ? (
              <Carousel className="w-full">
                <CarouselContent>
                  {property.image_urls.map((imageUrl, index) => (
                    <CarouselItem key={index}>
                      <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
                        <Image
                          src={imageUrl}
                          alt={`${property.title} - Imagem ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 66vw"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            ) : (
              <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-gray-200 flex items-center justify-center">
                <FiHome className="w-16 h-16 text-gray-400" />
              </div>
            )}
          </div>

          {/* Informações Principais */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl mb-2">{property.title}</CardTitle>
                  {property.address && (
                    <div className="flex items-center text-gray-600">
                      <FiMapPin className="w-4 h-4 mr-2" />
                      <span>{property.address}, {property.city}, {property.state}</span>
                    </div>
                  )}
                </div>
                {property.is_featured && (
                  <div className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-medium">
                    Destaque
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Preço */}
                <div className="text-3xl font-bold text-blue-600">
                  {formatPrice(property.price)}
                </div>

                {/* Características */}
                <div className="flex flex-wrap gap-6 text-gray-600">
                  {property.bedrooms > 0 && (
                    <div className="flex items-center">
                      <IoBedOutline className="w-5 h-5 mr-2" />
                      <span>{property.bedrooms} quarto{property.bedrooms !== 1 ? 's' : ''}</span>
                    </div>
                  )}
                  {property.bathrooms > 0 && (
                    <div className="flex items-center">
                      <FiDroplet className="w-5 h-5 mr-2" />
                      <span>{property.bathrooms} banheiro{property.bathrooms !== 1 ? 's' : ''}</span>
                    </div>
                  )}
                  <div className="flex items-center">
                    <FiMaximize2 className="w-5 h-5 mr-2" />
                    <span>{property.area}m² de área</span>
                  </div>
                  {property.property_type && (
                    <div className="flex items-center">
                      <FiHome className="w-5 h-5 mr-2" />
                      <span>{property.property_type.name}</span>
                    </div>
                  )}
                </div>

                {/* Descrição */}
                {property.description && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Descrição</h3>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {property.description}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Formulário de Contato */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>Interessado neste imóvel?</CardTitle>
              <p className="text-gray-600 text-sm">Entre em contato conosco para mais informações</p>
            </CardHeader>
            <CardContent>
              {submitSuccess ? (
                <div className="text-center py-6">
                  <div className="text-green-600 mb-4">
                    <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="font-medium">Mensagem enviada com sucesso!</p>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">Entraremos em contato em breve.</p>
                  <Button onClick={() => setSubmitSuccess(false)} variant="outline" className="w-full">
                    Enviar nova mensagem
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      name="name"
                      placeholder="Seu nome"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Seu e-mail"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Input
                      name="phone"
                      type="tel"
                      placeholder="Seu telefone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Textarea
                      name="message"
                      placeholder="Sua mensagem (opcional)"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar mensagem'}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}