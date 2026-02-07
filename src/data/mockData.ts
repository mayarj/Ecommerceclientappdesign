export interface Product {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  category: 'food' | 'cloth' | 'electronic';
  priceUSD: number;
  priceSYP: number;
  discount?: number;
  images: string[];
  colors?: string[];
  sizes?: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  quantityType?: 'unit' | 'weight'; // New: determine if quantity is by unit or weight
  weightUnit?: 'kg' | 'g' | 'liter'; // New: unit for weight-based products
  imageVariations?: { [key: string]: string[] }; // New: images for different color/size options
}

export interface CartItem extends Product {
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: CartItem[];
  totalUSD: number;
  totalSYP: number;
  deliveryFee: number;
  address: string;
  paymentMethod: 'cash' | 'syriatelCash';
}

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Fresh Organic Apples',
    nameAr: 'تفاح عضوي طازج',
    description: 'Fresh organic apples from local farms. Crisp, sweet, and nutritious.',
    descriptionAr: 'تفاح عضوي طازج من المزارع المحلية. مقرمش، حلو، ومغذي.',
    category: 'food',
    priceUSD: 5.99,
    priceSYP: 150000,
    discount: 20,
    images: [
      'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=800',
      'https://images.unsplash.com/photo-1669999207738-fcdb7103a6f3?w=800',
      'https://images.unsplash.com/photo-1615648610328-5783f7869ae0?w=800'
    ],
    rating: 4.5,
    reviews: 128,
    inStock: true,
    quantityType: 'weight',
    weightUnit: 'kg',
    imageVariations: {
      'Black': ['https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=800'],
      'Red': ['https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=800'],
    },
  },
  {
    id: '2',
    name: 'Cotton T-Shirt',
    nameAr: 'تي شيرت قطني',
    description: 'Premium quality cotton t-shirt. Available in multiple colors and sizes.',
    descriptionAr: 'تي شيرت قطني بجودة عالية. متوفر بعدة ألوان ومقاسات.',
    category: 'cloth',
    priceUSD: 19.99,
    priceSYP: 500000,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
      'https://images.unsplash.com/photo-1571455786673-9d9d6c194f90?w=800',
      'https://images.unsplash.com/photo-1677709678785-bbe8227262cf?w=800'
    ],
    colors: ['Black', 'White', 'Blue', 'Red'],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.8,
    reviews: 256,
    inStock: true,
    quantityType: 'unit',
    imageVariations: {
      'Black': [
        'https://images.unsplash.com/photo-1571455786673-9d9d6c194f90?w=800',
        'https://images.unsplash.com/photo-1571455786673-9d9d6c194f90?w=800'
      ],
      'White': [
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800'
      ],
      'Blue': [
        'https://images.unsplash.com/photo-1677709678785-bbe8227262cf?w=800',
        'https://images.unsplash.com/photo-1677709678785-bbe8227262cf?w=800'
      ],
      'Red': [
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800'
      ],
    },
  },
  {
    id: '3',
    name: 'Wireless Headphones',
    nameAr: 'سماعات لاسلكية',
    description: 'High-quality wireless headphones with noise cancellation and long battery life.',
    descriptionAr: 'سماعات لاسلكية عالية الجودة مع إلغاء الضوضاء وعمر بطارية طويل.',
    category: 'electronic',
    priceUSD: 89.99,
    priceSYP: 2250000,
    discount: 15,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
      'https://images.unsplash.com/photo-1679533662345-b321cf2d8792?w=800',
      'https://images.unsplash.com/photo-1658927420074-85930da203ec?w=800',
      'https://images.unsplash.com/photo-1553774661-0651f14b2da4?w=800'
    ],
    colors: ['Black', 'Silver', 'White'],
    rating: 4.7,
    reviews: 512,
    inStock: true,
    quantityType: 'unit',
    imageVariations: {
      'Black': [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
        'https://images.unsplash.com/photo-1679533662345-b321cf2d8792?w=800'
      ],
      'Silver': [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
        'https://images.unsplash.com/photo-1658927420074-85930da203ec?w=800'
      ],
      'White': [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
        'https://images.unsplash.com/photo-1553774661-0651f14b2da4?w=800'
      ],
    },
  },
  {
    id: '4',
    name: 'Olive Oil',
    nameAr: 'زيت زيتون',
    description: 'Extra virgin olive oil, cold-pressed from the finest olives.',
    descriptionAr: 'زيت زيتون بكر ممتاز، معصور على البارد من أجود الزيتون.',
    category: 'food',
    priceUSD: 12.99,
    priceSYP: 325000,
    images: ['https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800'],
    rating: 4.9,
    reviews: 89,
    inStock: true,
    quantityType: 'weight',
    weightUnit: 'liter',
    imageVariations: {
      'Black': ['https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800'],
      'Red': ['https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800'],
    },
  },
  {
    id: '5',
    name: 'Denim Jeans',
    nameAr: 'بنطلون جينز',
    description: 'Classic blue denim jeans with a modern fit. Durable and comfortable.',
    descriptionAr: 'بنطلون جينز أزرق كلاسيكي بتصميم عصري. متين ومريح.',
    category: 'cloth',
    priceUSD: 49.99,
    priceSYP: 1250000,
    discount: 30,
    images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=800'],
    sizes: ['28', '30', '32', '34', '36'],
    colors: ['Blue', 'Black'],
    rating: 4.6,
    reviews: 341,
    inStock: true,
    quantityType: 'unit',
    imageVariations: {
      'Blue': ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=800'],
      'Black': ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=800'],
    },
  },
  {
    id: '6',
    name: 'Smart Watch',
    nameAr: 'ساعة ذكية',
    description: 'Feature-rich smartwatch with fitness tracking, notifications, and more.',
    descriptionAr: 'ساعة ذكية غنية بالميزات مع تتبع اللياقة البدنية والإشعارات والمزيد.',
    category: 'electronic',
    priceUSD: 199.99,
    priceSYP: 5000000,
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800'],
    colors: ['Black', 'Silver', 'Gold'],
    rating: 4.4,
    reviews: 678,
    inStock: true,
    quantityType: 'unit',
    imageVariations: {
      'Black': ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800'],
      'Silver': ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800'],
      'Gold': ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800'],
    },
  },
  {
    id: '7',
    name: 'Premium Coffee Beans',
    nameAr: 'حبوب قهوة فاخرة',
    description: 'Arabica coffee beans, carefully roasted to perfection.',
    descriptionAr: 'حبوب قهوة عربية محمصة بعناية فائقة.',
    category: 'food',
    priceUSD: 15.99,
    priceSYP: 400000,
    discount: 10,
    images: ['https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800'],
    rating: 4.8,
    reviews: 234,
    inStock: true,
    quantityType: 'weight',
    weightUnit: 'kg',
    imageVariations: {
      'Black': ['https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800'],
      'Red': ['https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800'],
    },
  },
  {
    id: '8',
    name: 'Winter Jacket',
    nameAr: 'جاكيت شتوي',
    description: 'Warm and stylish winter jacket. Water-resistant and windproof.',
    descriptionAr: 'جاكيت شتوي دافئ وأنيق. مقاوم للماء والرياح.',
    category: 'cloth',
    priceUSD: 79.99,
    priceSYP: 2000000,
    images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Navy', 'Gray'],
    rating: 4.7,
    reviews: 156,
    inStock: true,
    quantityType: 'unit',
    imageVariations: {
      'Black': ['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800'],
      'Navy': ['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800'],
      'Gray': ['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800'],
    },
  },
  {
    id: '9',
    name: 'Bluetooth Speaker',
    nameAr: 'سماعة بلوتوث',
    description: 'Portable Bluetooth speaker with powerful sound and long battery life.',
    descriptionAr: 'سماعة بلوتوث محمولة بصوت قوي وعمر بطارية طويل.',
    category: 'electronic',
    priceUSD: 39.99,
    priceSYP: 1000000,
    discount: 25,
    images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800'],
    colors: ['Black', 'Red', 'Blue'],
    rating: 4.5,
    reviews: 423,
    inStock: true,
    quantityType: 'unit',
    imageVariations: {
      'Black': ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800'],
      'Red': ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800'],
      'Blue': ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800'],
    },
  },
  {
    id: '10',
    name: 'Honey Jar',
    nameAr: 'عسل طبيعي',
    description: 'Pure natural honey from wildflowers. No additives or preservatives.',
    descriptionAr: 'عسل طبيعي نقي من الزهور البرية. بدون إضافات أو مواد حافظة.',
    category: 'food',
    priceUSD: 18.99,
    priceSYP: 475000,
    images: ['https://images.unsplash.com/photo-1587049352846-4a222e784e38?w=800'],
    rating: 4.9,
    reviews: 167,
    inStock: true,
    quantityType: 'weight',
    weightUnit: 'kg',
    imageVariations: {
      'Black': ['https://images.unsplash.com/photo-1587049352846-4a222e784e38?w=800'],
      'Red': ['https://images.unsplash.com/photo-1587049352846-4a222e784e38?w=800'],
    },
  },
  {
    id: '11',
    name: 'Sports Shoes',
    nameAr: 'حذاء رياضي',
    description: 'Comfortable sports shoes perfect for running and training.',
    descriptionAr: 'حذاء رياضي مريح مثالي للجري والتدريب.',
    category: 'cloth',
    priceUSD: 69.99,
    priceSYP: 1750000,
    discount: 20,
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800'],
    sizes: ['38', '39', '40', '41', '42', '43', '44'],
    colors: ['Black', 'White', 'Red', 'Blue'],
    rating: 4.6,
    reviews: 892,
    inStock: true,
    quantityType: 'unit',
    imageVariations: {
      'Black': ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800'],
      'White': ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800'],
      'Red': ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800'],
      'Blue': ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800'],
    },
  },
  {
    id: '12',
    name: 'Laptop Stand',
    nameAr: 'حامل لابتوب',
    description: 'Adjustable aluminum laptop stand for better ergonomics.',
    descriptionAr: 'حامل لابتوب ألمنيوم قابل للتعديل لوضعية أفضل.',
    category: 'electronic',
    priceUSD: 29.99,
    priceSYP: 750000,
    images: ['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800'],
    colors: ['Silver', 'Space Gray'],
    rating: 4.3,
    reviews: 234,
    inStock: true,
    quantityType: 'unit',
    imageVariations: {
      'Silver': ['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800'],
      'Space Gray': ['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800'],
    },
  },
];

export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    date: '2026-02-05',
    status: 'processing',
    items: [
      { ...mockProducts[0], quantity: 2, selectedColor: undefined, selectedSize: undefined },
      { ...mockProducts[2], quantity: 1, selectedColor: 'Black', selectedSize: undefined },
    ],
    totalUSD: 101.97,
    totalSYP: 2550000,
    deliveryFee: 50000,
    address: 'Damascus, Syria',
    paymentMethod: 'cash',
  },
  {
    id: 'ORD-002',
    date: '2026-02-01',
    status: 'delivered',
    items: [
      { ...mockProducts[1], quantity: 3, selectedColor: 'Blue', selectedSize: 'M' },
    ],
    totalUSD: 59.97,
    totalSYP: 1500000,
    deliveryFee: 50000,
    address: 'Aleppo, Syria',
    paymentMethod: 'syriatelCash',
  },
];