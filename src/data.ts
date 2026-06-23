import { Destination, Property, ExperienceCategory, Vehicle } from './types';

export const DESTINATIONS: Destination[] = [
  {
    id: 'puri',
    name: 'Puri',
    state: 'Odisha',
    image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=800&q=80',
    propertiesCount: 15,
    description: 'A spectacular sacred coastal city, home of the legendary Jagannath Temple and long golden beaches.',
    attraction: 'Shree Jagannath Temple & Golden Beach'
  },
  {
    id: 'bhubaneswar',
    name: 'Bhubaneswar',
    state: 'Odisha',
    image: 'https://images.unsplash.com/photo-1604999333679-b86d54738315?auto=format&fit=crop&w=800&q=80',
    propertiesCount: 18,
    description: 'The ancient capital "Temple City" featuring majestic sandstone carvings and historic heritage ruins.',
    attraction: 'Lingaraj Temple, Dhauli & Khandagiri'
  },
  {
    id: 'konark',
    name: 'Konark',
    state: 'Odisha',
    image: 'https://images.unsplash.com/photo-1601823984263-b87b59798b70?auto=format&fit=crop&w=800&q=80',
    propertiesCount: 4,
    description: 'Home of the magnificent Sun Temple chariot monument, crafted seamlessly in historic Odishan stone.',
    attraction: 'Sun Temple & Chandrabhaga Beach'
  }
];

export const HOTELS: Property[] = [
  // =============================== PURI HOTELS ===============================
  {
    id: 'hotel-niladri',
    name: 'Niladri Shore Resort',
    location: 'Marine Drive Road, Puri',
    state: 'Odisha',
    rating: 4.8,
    reviewsCount: 384,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    startingPrice: 6500,
    category: 'hotel',
    isFeatured: true,
    amenities: ['Direct Beach Access', 'Infinity Pool', 'Kalingan Ayurvedic Spa', 'Oceanview Multi-cuisine Cafe', '24/7 Guest Care Desk'],
    description: 'Niladri Shore Resort redefines modern spiritual and leisure beach stays in Puri. Nestled on Marine Drive, its rooms blend traditional Odishan styling and breezy contemporary layouts - offering sunrise beach access right from your balcony.',
    gallery: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80'
    ],
    nearbyAttractions: ['Puri Golden Beach (0.1 km)', 'Sri Jagannath Temple (2.2 km)', 'Swargadwar Beach (1.5 km)'],
    roomCategories: [
      { name: 'Executive Ocean View Suite', price: 6500, description: 'Plush room with direct panoramic view of the Bay of Bengal and private balcony.', amenities: ['King Size Bed', 'Balcony', 'AC', 'Minibar', 'Smart TV'] },
      { name: 'Traditional Kalinga Sanctuary', price: 8500, description: 'Specially decorated signature room honoring stone masonry and local art.', amenities: ['King Size Bed', 'Welcome Platter', 'Spa Voucher', '24/7 Butler'] }
    ],
    reviewsList: [
      { author: 'Sabyasachi Patnaik', date: '14-Jun-2026', content: 'Incredibly soothing stay. The beach access is just outside. Very helpful personnel and pristine sea-view breakfast room.', score: 5 },
      { author: 'Meenaxi Sen', date: '08-May-2026', content: 'Superb location, excellent cleanliness. Truly original Puri vibe of comfort and tradition.', score: 4.8 }
    ]
  },
  {
    id: 'hotel-sterling',
    name: 'Sterling Puri',
    location: 'Sipasarubali, Puri',
    state: 'Odisha',
    rating: 4.7,
    reviewsCount: 520,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
    startingPrice: 5800,
    category: 'hotel',
    isFeatured: true,
    amenities: ['Estuary Access', 'Large Outdoor Pool', 'Odishan Folk Club', 'Recreational Gym', 'In-house Multicuisine Restaurant'],
    description: 'Located unique by where the Dhaudia river merges into the sea, Sterling Puri is ideal for quiet family vacation configurations. Witness dramatic landscapes, local sand-art workshops, and unmatched premium hospitality.',
    gallery: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80'
    ],
    nearbyAttractions: ['Mouth of River Estuary (0.5 km)', 'Shree Jagannath Temple (5.0 km)', 'Sudarshan Crafts Museum (4.2 km)'],
    roomCategories: [
      { name: 'Classic Family Room', price: 5800, description: 'Spacious cottage style layout with cozy bed and work desk options.', amenities: ['Fitted AC', 'Tea Maker', 'Lawn Access'] },
      { name: 'Estuary Premium Suite', price: 7800, description: 'Superlative views of the river merger, premium upholstery, and express checkin.', amenities: ['Lounge Area', 'Bath Tub', 'Balcony', 'Fruit Basket'] }
    ],
    reviewsList: [
      { author: 'Amitava Banerjee', date: '12-Jun-2026', content: 'Fabulous food! They set up traditional local fish delicacies which tasted magical. Family members enjoyed the pool-side games.', score: 5 }
    ]
  },
  {
    id: 'hotel-sonar-bangla',
    name: 'Hotel Sonar Bangla Puri',
    location: 'Chakra Tirtha Road, Puri',
    state: 'Odisha',
    rating: 4.5,
    reviewsCount: 290,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    startingPrice: 4800,
    category: 'hotel',
    isFeatured: false,
    amenities: ['Private Beach Shacks', 'Lush Green Gardens', 'Seafront Seafood Bistro', 'Travel Desk Support', 'High-Speed Wi-Fi'],
    description: 'Perched on Chakra Tirtha Road, this hotel offers some of the closest ocean vistas in Puri. It has a high popularity rating for premium Bengali-Odia fusion diners and highly attentive multi-generational stay services.',
    gallery: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80'
    ],
    nearbyAttractions: ['Puri Lighthouse (2.5 km)', 'Balighai Beach (12.0 km)', 'Jagannath Temple (2.8 km)'],
    roomCategories: [
      { name: 'Premium Sea View AC', price: 4800, description: 'Large windows facing directly towards the restless Bay of Bengal.', amenities: ['King Bed', 'AC', 'Mini Fridge', 'Wi-Fi'] }
    ],
    reviewsList: [
      { author: 'Arindam Ghosh', date: '20-May-2026', content: 'Lovely experience. Listening to waves crashing while having morning chai is unmatched.', score: 4.6 }
    ]
  },
  {
    id: 'hotel-golden-tree',
    name: 'Golden Tree Hotel Puri',
    location: 'Sargadwar Beach Front, Puri',
    state: 'Odisha',
    rating: 4.4,
    reviewsCount: 165,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
    startingPrice: 4200,
    category: 'hotel',
    isFeatured: false,
    amenities: ['Rooftop Sunset Lounge', 'Infinity View Pool', 'Ayurvedic Wellness Massages', 'Direct Swargadwar access', 'Corporate Conference Hall'],
    description: 'Golden Tree is a highly optimized hotel featuring sleek, modern premium amenities right opposite Sargadwar beach. High tech guest integration allows quick orders and direct transport coordination.',
    gallery: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80'
    ],
    nearbyAttractions: ['Swargadwar Market (0.2 km)', 'Jagannath Temple (1.1 km)', 'Model Beach (0.8 km)'],
    roomCategories: [
      { name: 'Standard Comfort Room', price: 4200, description: 'Modern design layout, AC, luxurious spring mattress and ensuite bath.', amenities: ['Tea Station', 'AC', 'LED TV'] }
    ],
    reviewsList: [
      { author: 'Suresh Rout', date: '01-Jun-2026', content: 'Very cozy and located in the center of Puri action. Highly recommended if you love local markets.', score: 4.5 }
    ]
  },
  {
    id: 'hotel-mayfair-heritage',
    name: 'Mayfair Heritage Puri',
    location: 'Chakra Tirtha Road, Puri',
    state: 'Odisha',
    rating: 4.9,
    reviewsCount: 712,
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',
    startingPrice: 8900,
    category: 'hotel',
    isFeatured: true,
    amenities: ['Exclusive Royal Gardens', 'Sea-front Swimming Pool', 'Odishan Fine Art Gallery', 'Verandah Lounge', 'Sattvik & Continental Dining'],
    description: 'Step into Mayfairs heritage architecture where imperial arches meet the soothing waves. Pristine, verdant courts, high-ceiling classic suites, and curated Jagannatha heritage escort guides await.',
    gallery: [
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80'
    ],
    nearbyAttractions: ['Golden Beach (0.2 km)', 'Puri Railway Station (1.8 km)', 'Shree Jagannath Temple (2.4 km)'],
    roomCategories: [
      { name: 'Royal Heritage Cottage', price: 8900, description: 'A rustic yet highly pampered royal cottage layout with traditional veranda and garden.', amenities: ['Veranda', 'Ayurvedic Toiletries', '24/7 Service', 'Welcome Escort'] },
      { name: 'Sovereign Grand ocean suite', price: 14500, description: 'Majestic master suite overlooking the ocean wave crests.', amenities: ['Lounge', 'Ocean Facing Pool access', 'In room pantry', 'Spa voucher'] }
    ],
    reviewsList: [
      { author: 'Chitra Mohanty', date: '19-Jun-2026', content: 'Pure paradise! Mayfair never disappoints. The gardens are kept beautifully. The Odia dinner thali we ordered was world-class.', score: 5 }
    ]
  },

  // =============================== BHUBANESWAR HOTELS ===============================
  {
    id: 'hotel-vivanta',
    name: 'Vivanta Bhubaneswar',
    location: 'DN Regalia Mall Road, Patrapada, Bhubaneswar',
    state: 'Odisha',
    rating: 4.9,
    reviewsCount: 420,
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
    startingPrice: 8500,
    category: 'hotel',
    isFeatured: true,
    amenities: ['Rooftop Infinity Pool', 'State-of-the-art Gym', 'Signature Bar & Grill', 'Direct Mall Connection', 'Curated Heritage Walks'],
    description: 'A striking statement of modern design. Vivanta Bhubaneswar blends cutting-edge urban aesthetics with deep-set temple relief pillars - ideal for contemporary CEOs, business giants, and design enthusiasts.',
    gallery: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1606046604972-77cc76aee944?auto=format&fit=crop&w=800&q=80'
    ],
    nearbyAttractions: ['Khandagiri & Udayagiri Caves (4.5 km)', 'AIIMS Bhubaneswar (2.0 km)', 'Lingaraj Temple (9.5 km)'],
    roomCategories: [
      { name: 'Superior Urban Room', price: 8500, description: 'Sleek luxury with automated climate consoles and panoramic city sunrise skyline views.', amenities: ['Smart Control', 'Work Station', 'Premium Linens'] },
      { name: 'Executive Luxury Suite', price: 12500, description: 'Extensive board-ready suite featuring guest lounges and high speed connectivity.', amenities: ['Lounge Area', 'Deep Tub', 'Coffee Machine', 'Pillow Menu'] }
    ],
    reviewsList: [
      { author: 'Rajat Sharma', date: '11-Jun-2026', content: 'Awesome high-tech conveniences. The rooftop swimming experience is magnificent.', score: 4.9 }
    ]
  },
  {
    id: 'hotel-swosti',
    name: 'Swosti Premium',
    location: 'Jayadev Vihar, Bhubaneswar',
    state: 'Odisha',
    rating: 4.7,
    reviewsCount: 680,
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
    startingPrice: 6200,
    category: 'hotel',
    isFeatured: false,
    amenities: ['Largest City Pool', 'Traditional Scottish Pub', 'Bespoke Wellness Spa', 'Extensive Convention Halls', 'International Gourmet Buffet'],
    description: 'Swosti Premium Bhubaneswar is a monumental benchmark of corporate and luxury leisure. Renowned for hosting high-frequency summits and wedding lines while maintaining flawless boutique-style guest attention.',
    gallery: [
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80'
    ],
    nearbyAttractions: ['Regional Museum of Natural History (1.0 km)', 'Pathani Samanta Planetarium (1.5 km)', 'Ekamra Kanan Botanical Gardens (2.5 km)'],
    roomCategories: [
      { name: 'Premium Royal Executive', price: 6200, description: 'Elegant woodwork, massive kingbed, executive working table, soft linens.', amenities: ['Fast Wi-Fi', 'Fruit Basket', 'Bathtub'] }
    ],
    reviewsList: [
      { author: 'Vikramaditya Rao', date: '25-May-2026', content: 'Flawless service. The banquet halls are massive and catering is top-tier Odia and global recipes.', score: 4.8 }
    ]
  },
  {
    id: 'hotel-welcomhotel',
    name: 'Welcomhotel By ITC Bhubaneswar',
    location: 'Dumduma, Bhubaneswar',
    state: 'Odisha',
    rating: 4.8,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80',
    startingPrice: 7900,
    category: 'hotel',
    isFeatured: true,
    amenities: ['LEED Eco Platinum Certified', 'Peshawri Signature Diner', 'Kaya Kalp Spa', 'Lush Forest Lawns', 'Personalized Travel Curators'],
    description: 'Pioneering eco-tourism at high luxury levels. Welcomhotel ITC delivers stunning sandstone architecture inspired by historic temples, powered with cutting-edge carbon-neutral water and heating technologies.',
    gallery: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80'
    ],
    nearbyAttractions: ['Khandagiri Caves (3.2 km)', 'Biju Patnaik Airport (6.0 km)', 'Rajarani Temple (8.0 km)'],
    roomCategories: [
      { name: 'Club Executive Eco Sanctuary', price: 7900, description: 'Green certified cozy suites utilizing eco-textiles with incredible air filtration.', amenities: ['LEED certified room', 'Smart controls', 'Premium organic tea'] },
      { name: 'ITC Manor Imperial', price: 11800, description: 'Dignitary-tier lodging with standalone dining lounge and private master bedroom.', amenities: ['Lounge', '24h butler', 'Complimentary massage sessions'] }
    ],
    reviewsList: [
      { author: 'Dr. Srinivas Naik', date: '04-Jun-2026', content: 'A gorgeous tribute to Odisha temples. Peshawri restaurant serves the best tandoori recipes on the planet.', score: 5 }
    ]
  },
  {
    id: 'hotel-lemonthree',
    name: 'Lemon Tree Premier Bhubaneswar',
    location: 'Maitree Vihar, Corporate Zone, Bhubaneswar',
    state: 'Odisha',
    rating: 4.6,
    reviewsCount: 245,
    image: 'https://images.unsplash.com/photo-1606046604972-77cc76aee944?auto=format&fit=crop&w=1200&q=80',
    startingPrice: 4900,
    category: 'hotel',
    isFeatured: false,
    amenities: ['Citrus Cafe 24/7', 'Rooftop Lounge Area', 'Spacious Boardrooms', 'Fitness Hub & Salon', 'Pet Care Friendly policies'],
    description: 'Breezy, youthful and refreshing. Located right inside Bhubaneswar corporate high-street Maitree Vihar - it is optimized for high mobility, quick checkout, and dynamic business itineraries.',
    gallery: [
      'https://images.unsplash.com/photo-1606046604972-77cc76aee944?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80'
    ],
    nearbyAttractions: ['Fortune Towers (0.5 km)', 'Nandankanan Zoological Park (10.2 km)', 'Railway Station (6.5 km)'],
    roomCategories: [
      { name: 'Premier Business Suite', price: 4900, description: 'Refreshing lemon design schemes, office console desk and custom pillows.', amenities: ['AC', 'Desk', 'Citrus bath kit'] }
    ],
    reviewsList: [
      { author: 'Priyanka Das', date: '21-May-2026', content: 'Extremely clean and friendly hosts. Good breakfast option. Perfect spot for business trips.', score: 4.6 }
    ]
  },
  {
    id: 'hotel-empires',
    name: 'Empires Hotel Bhubaneswar',
    location: 'Saheed Nagar, Bhubaneswar',
    state: 'Odisha',
    rating: 4.3,
    reviewsCount: 180,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    startingPrice: 3900,
    category: 'hotel',
    isFeatured: false,
    amenities: ['Roman Pillar Swimming Pool', 'The Empires Club & Bar', 'Express Checkin Hub', 'Co-working Dens', 'Saheed Nagar Market access'],
    description: 'Stylized after grand neoclassical columns and Roman vaults, Empires Hotel provides high comfort budget-to-luxury options right near central tech plazas and Saheed Nagar handicraft hubs.',
    gallery: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80'
    ],
    nearbyAttractions: ['Forum Esplanade Mall (2.0 km)', 'Lingaraj Temple (6.2 km)', 'Bapuji Nagar Handlooms (3.0 km)'],
    roomCategories: [
      { name: 'Classic Roman Studio', price: 3900, description: 'Curving ceilings, classic furniture, cozy bed configurations.', amenities: ['AC', 'Lawn view options', 'Satellite Channel TV'] }
    ],
    reviewsList: [
      { author: 'Sonalika Jena', date: '29-May-2026', content: 'Very antique looking styling. Helpful crew when we requested extra transport services.', score: 4.3 }
    ]
  }
];

export const RESORTS: Property[] = [
  // =============================== SHOWCASE RESORTS (SECTION 3) ===============================
  {
    id: 'resort-mayfair-waves',
    name: 'Mayfair Waves Puri',
    location: 'Chakra Tirtha Road, Sea Front, Puri',
    state: 'Odisha',
    rating: 4.9,
    reviewsCount: 812,
    image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80',
    startingPrice: 11000,
    category: 'resort',
    isFeatured: true,
    amenities: ['Panoramic Private Beach Cabanas', 'Sea-facing Spa Treatments', 'Sunset Pool Bar', 'Odishan Folk Art Pavilion', 'Seafood Grill Shack'],
    description: 'An absolute masterpiece of coastal tranquility. Mayfair Waves is a premier, luxury boutique resort where you step out of your bed directly onto pristine sands. High-level hospitality featuring sunset poolside guitar music and personalized beach dining setups.',
    gallery: [
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=800&q=80'
    ],
    nearbyAttractions: ['Golden Beach (0.00 km)', 'Puri Light House (3.2 km)', 'Shree Jagannath Mandir (2.5 km)'],
    roomCategories: [
      { name: 'Premium Sea Facing Cottage', price: 11000, description: 'Lounge on a glass sundeck watching high waves. Includes high-end bath suites, private butler.', amenities: ['Sea View deck', 'Luxury Spa voucher', 'Fruit basket', 'Butler support'] },
      { name: 'Presidential Waves Villa', price: 18500, description: 'Top-tier master standalone villa with individual plunge pool facing the sea.', amenities: ['Plunge Pool', 'Premium Champagne', 'Jagannath Puja Darshan Escort'] }
    ],
    reviewsList: [
      { author: 'Rajesh Sen', date: '21-Jun-2026', content: 'Astounding! Literally on the waves. The hospitality crew took care of parent special pooja darshan beautifully.', score: 5 }
    ]
  },
  {
    id: 'resort-pipul',
    name: 'Pipul Hotels & Resorts',
    location: 'Near Marine Drive, Sipasarubali, Puri',
    state: 'Odisha',
    rating: 4.6,
    reviewsCount: 340,
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80',
    startingPrice: 7500,
    category: 'resort',
    isFeatured: true,
    amenities: ['Vast Water Theme Complex', 'Multi-level Dining Halls', 'Spa & Ayurveda rejuvenation', 'Scenic Lawn Fields', '24/7 Travel Shuttle Desk'],
    description: 'Pipul Resort represents spectacular modern resort living. Sprawling green lawns, multi-generational swimming parks, and exceptional ethnic food - a magnificent gateway away from city density.',
    gallery: [
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80'
    ],
    nearbyAttractions: ['Sipasarubali Beach (0.4 km)', 'Mangala Temple (6.5 km)', 'Balighai Beach (15.0 km)'],
    roomCategories: [
      { name: 'Deluxe Suite Villa', price: 7500, description: 'Splendid garden view suite with individual garden deck paths.', amenities: ['AC', 'Deck Chairs', 'Mini fridge'] }
    ],
    reviewsList: [
      { author: 'Sunita Tripathy', date: '10-Jun-2026', content: 'Loved the water pools! Children had an extraordinary time. Clean rooms and friendly checkout.', score: 4.6 }
    ]
  },
  {
    id: 'resort-golden-retreat',
    name: 'Golden Retreat Resort',
    location: 'Corporate Bypass Highway, Odisha',
    state: 'Odisha',
    rating: 4.7,
    reviewsCount: 195,
    image: 'https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=1200&q=80',
    startingPrice: 8000,
    category: 'resort',
    isFeatured: true,
    amenities: ['High Capacity Convention Center', 'Private Villa Configurations', 'Badminton & Tennis lawns', 'Rooftop Barbecue Grill', 'Helipad Access Line'],
    description: 'Widely recognized as the premier escape for corporate delegates and grand wedding lines across Northern Odisha. Combining state-of-the-art sports facilities with lush luxury aesthetics.',
    gallery: [
      'https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=800&q=80'
    ],
    nearbyAttractions: ['Heritage Craft Villages (5.0 km)', 'State Botanical Reserve (12.0 km)'],
    roomCategories: [
      { name: 'Sovereign Cottage', price: 8000, description: 'Detached premium cottage surrounding central flower fountains.', amenities: ['AC', 'Express laundry', 'Garden path access'] }
    ],
    reviewsList: [
      { author: 'Joydeep Sen', date: '08-May-2026', content: 'Excellent conference facilities and peaceful environment. Great corporate getaway.', score: 4.7 }
    ]
  },
  {
    id: 'resort-toshali-sands',
    name: 'Toshali Sands Resort',
    location: 'Konark Marine Drive Road, Puri',
    state: 'Odisha',
    rating: 4.8,
    reviewsCount: 650,
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
    startingPrice: 6200,
    category: 'resort',
    isFeatured: true,
    amenities: ['Ethnic Thatch Cottages', 'Exclusive Sanctuary Trail', 'Folk Dance Theatre', 'Organic Vegetable Gardens', 'Archery & Surfing Base'],
    description: 'Indias premier, pioneering ethnic eco luxury resort. Spread across 30 sprawling acres of lush casuarina forests facing the Balukhand Wildlife Sanctuary, Toshali Sands blends mud-stone carvings with sophisticated comfort.',
    gallery: [
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566616213894-2d4e1baee5d8?auto=format&fit=crop&w=800&q=80'
    ],
    nearbyAttractions: ['Balukhand Wildlife Reserve (0.1 km)', 'Ramachandi Temple & Estuary (6.0 km)', 'Chandrabhaga Beach (11.0 km)'],
    roomCategories: [
      { name: 'Traditional Ethnic Villa', price: 6200, description: 'Rustic brick masonry, handmade furnishings, local Pattachitra paintings on walls, completely AC cooled.', amenities: ['Tiled washrooms', 'Forest view patio', 'Pattachitra Art Gift'] }
    ],
    reviewsList: [
      { author: 'Rani Mukherji', date: '11-Jun-2026', content: 'Felt like stepping into a beautiful Odishan temple garden. Peaceful trails, deer whistles in evening, stunning local folk artists.', score: 5 }
    ]
  },
  {
    id: 'resort-adventure-convention',
    name: 'The Adventure Convention Resort',
    location: 'Patia Hills Forest Range, Bhubaneswar',
    state: 'Odisha',
    rating: 4.5,
    reviewsCount: 154,
    image: 'https://images.unsplash.com/photo-1566616213894-2d4e1baee5d8?auto=format&fit=crop&w=1200&q=80',
    startingPrice: 7000,
    category: 'resort',
    isFeatured: true,
    amenities: ['ATV Off-road Tracks', 'Zipline Arena', 'Climbing Wall & Obstacles', 'High Capacity Event Hall', 'Poolside Barbecue Pit'],
    description: 'Perfect for the restless seeker. Uniting high-octane adventure outdoor structures with luxurious rooms, conference arenas, and world-class theme dining.',
    gallery: [
      'https://images.unsplash.com/photo-1566616213894-2d4e1baee5d8?auto=format&fit=crop&w=800&q=80'
    ],
    nearbyAttractions: ['Chandaka Elephant Sanctuary (3.5 km)', 'Sikharchandi Hill Temple (2.0 km)', 'Nandankanan Zoo (5.5 km)'],
    roomCategories: [
      { name: 'Adrenaline Ridge Room', price: 7000, description: 'Views looking over zip arenas, fitted with adventure theme decors and modern tech systems.', amenities: ['AC', 'Free ATV Ride Voucher', 'Smart TV'] }
    ],
    reviewsList: [
      { author: 'Nirmal Patnaik', date: '02-Jun-2026', content: 'Fantastic team building retreat. ATV ride was exciting and food was delicious.', score: 4.5 }
    ]
  },
  {
    id: 'resort-kirtee',
    name: 'KIRTEE Eco Resort & Convention',
    location: 'Konark Marine Drive, Konark',
    state: 'Odisha',
    rating: 4.9,
    reviewsCount: 215,
    image: 'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=1200&q=80',
    startingPrice: 5500,
    category: 'resort',
    isFeatured: true,
    amenities: ['15-Acre Organic Reserve', 'Bio-Filtered Lagoon Pool', 'Convention & Grand Banquet Hall', 'Ayurvedic Wellness Shala', 'Corporate Executive Boardroom'],
    description: 'KIRTEE Eco Resort & Convention is a spectacular benchmark of premium eco luxury. Nested on the Konark Marine Drive corridor, our architecture marries natural handcrafted woods with earthy luxury. Ideal for corporate retreats, family escapes, and grand green destination weddings, backed by Bharat Travels commission-free direct booking engine.',
    gallery: [
      'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=800&q=80'
    ],
    nearbyAttractions: ['Konark Sun Temple (6.5 km)', 'Chandrabhaga Blue Flag Beach (4.2 km)', 'Balukhand Wildlife Reserve (2.0 km)'],
    roomCategories: [
      { name: 'Eco Cottage', price: 5500, description: 'Rustic yet premium handcrafted mud-and-thatch design with elegant modern bathrooms.', amenities: ['Private Forest Patio', 'AC', 'Walk-in Rainshower', 'Organic Tea Station', 'Hammock'] },
      { name: 'Premium Cottage', price: 7500, description: 'Spacious, elevated glass cottage offering stunning views of the surrounding cashew reserve.', amenities: ['Elevated Deck', 'AC', 'Mini-bar', 'Smart TV', 'Premium Linens'] },
      { name: 'Family Villa', price: 11500, description: 'Two-bedroom luxury cottage styled with local wooden arts and spacious private living lawn.', amenities: ['Two King Beds', 'Private Lawn', 'Outdoor Plunge Tub', '24/7 Butler Support'] },
      { name: 'Pool View Suite', price: 13500, description: 'Exclusive master sanctuary overlooking our bio-filtered natural swimming pool.', amenities: ['Living Lounge', 'Infinity Pool Access', 'Welcome Fruit Platter', 'Spa Voucher'] },
      { name: 'Executive Convention Suite', price: 16500, description: 'High-end suite with integrated boardroom desk and supercharged high-speed Wi-Fi connectivity for executives.', amenities: ['Boardroom Workspace', 'Deep Bath Tub', 'Express Check-in', 'Coffee Machine', 'Concierge Support'] }
    ],
    reviewsList: [
      { author: 'Ananya Mohanty', date: '18-Jun-2026', content: 'An absolute masterpiece! The organic food harvested straight from their garden tasted incredible. The conference halls are highly professional.', score: 5 },
      { author: 'Rohan Malhotra', date: '04-May-2026', content: 'Fantastic venue for our corporate retreat. Extremely helpful hospitality staff and stunning natural trails.', score: 4.9 }
    ]
  }
];

export const EXPERIENCES: ExperienceCategory[] = [
  // =============================== CURATED STATE TOURISM CARDS (SECTION 5) ===============================
  {
    id: 'exp-jagannath',
    title: 'Jagannath Temple',
    image: 'https://images.unsplash.com/photo-1627662236973-4f8259fa2441?auto=format&fit=crop&w=800&q=80',
    countOfPackages: 12,
    startFromPrice: 1500,
    description: 'The ancient nested crown of holy Indian pilgrimage. Built in the 12th century, with spiritual energy, towering spires, and legendary Mahaprasad legacy.',
    highlights: ['Special Darshan Passes', 'Licensed Sanskrit Scholars', 'Authentic Mahaprasad Seva']
  },
  {
    id: 'exp-konark',
    title: 'Konark Sun Temple',
    image: 'https://images.unsplash.com/photo-1601823984263-b87b59798b70?auto=format&fit=crop&w=800&q=80',
    countOfPackages: 8,
    startFromPrice: 2000,
    description: 'Colossal UNESCO World Heritage stone chariot dedicated to the Sun God. A masterpiece of Kalingan architecture capturing the first rays of sunrise.',
    highlights: ['Early Morning Photo Escort', 'Stone relief architecture decode', 'Chandrabhaga Beach sunset line']
  },
  {
    id: 'exp-chilika',
    title: 'Chilika Lake',
    image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=800&q=80',
    countOfPackages: 14,
    startFromPrice: 3500,
    description: 'Asias largest coastal brackish lagoon, a sanctuary sheltering migratory Siberian waterbirds and elegant Irrawaddy Dolphin families.',
    highlights: ['Deep Lagoon Boat Charter', 'Dolphin Sighting Guarantee', 'Kalijai Temple Island picnic']
  },
  {
    id: 'exp-goldenbeach',
    title: 'Golden Beach',
    image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=800&q=80',
    countOfPackages: 6,
    startFromPrice: 800,
    description: 'Puris legendary blue flag beach, styled with high cleanliness, peaceful walking corridors, deck chairs, and local sand art zones.',
    highlights: ['Blue Flag Safety Zone', 'Sand sculpting masterclasses', 'Romantic Beach canopy setups']
  },
  {
    id: 'exp-dhauli',
    title: 'Dhauli Shanti Stupa',
    image: 'https://images.unsplash.com/photo-1627662236973-4f8259fa2441?auto=format&fit=crop&w=800&q=80', // replacement
    countOfPackages: 5,
    startFromPrice: 1200,
    description: 'The historic white peace pagoda on the hills of Daya River where Emperor Ashoka renounced war and embraced Buddhism.',
    highlights: ['3rd-Century rock edicts decoded', 'Mesmerizing evening Light & Sound Show', 'Riverbank Buddhist temple passes']
  },
  {
    id: 'exp-nandankanan',
    title: 'Nandankanan Zoo',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80',
    countOfPackages: 10,
    startFromPrice: 1800,
    description: 'Famed "Garden of Heaven" forest zoological park. Renowned for breeding royal white tigers, black panthers, and high canopy botanical gardens.',
    highlights: ['White Tiger Safari Charter', 'Kanjia Lake boating trail', 'Protected reptile and bird cages']
  }
];

export const VEHICLES: Vehicle[] = [
  // =============================== TRANSPORTATION SERVICES (SECTION 6) ===============================
  {
    id: 'veh-auto',
    name: 'Eco Auto-Rickshaw',
    type: 'Auto',
    seater: 3,
    pricePerKm: 12,
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=400&q=80',
    features: ['Agile city navigation with open-air feel', 'Cost-effective short commerce transit', 'Eco-friendly and traditional Indian ride'],
    transfers: ['Local beach rides and spiritual markets', 'Puri Railway Station to Near Beach Stays']
  },
  {
    id: 'veh-sedan',
    name: 'Comfort Sedan Cruiser',
    type: 'Sedan',
    seater: 4,
    pricePerKm: 22,
    image: 'https://images.unsplash.com/photo-1549399542-7ee3cf8d7575?auto=format&fit=crop&w=400&q=80',
    features: ['Flight-sync arrival tracking support', 'Minerals & newspaper on board', 'Ample luggage boot clearance'],
    transfers: ['Airport to hotel transfer routes', 'Corporate station drop shuttle']
  },
  {
    id: 'veh-suv',
    name: 'Sovereign Heritage SUV',
    type: 'SUV',
    seater: 7,
    pricePerKm: 32,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=400&q=80',
    features: ['Robust off-road dual traction comfort', 'Roof carrier grid for heavy baggage', 'Fully climate-regulated safety cabin'],
    transfers: ['Chilika Lake touring cruise line', 'Rough terrain eco-resort connectivity']
  },
  {
    id: 'veh-innova',
    name: 'Premium Innova Crysta',
    type: 'Innova',
    seater: 7,
    pricePerKm: 38,
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=400&q=80',
    features: ['Ultra-luxury rear executive captain seats', 'Tri-zone customized air conditioning', 'Extra soft legroom & silent ride'],
    transfers: ['Premium executive transfers', 'High-end family sightseeing charter']
  },
  {
    id: 'veh-tempo',
    name: 'Grand Family Tempo Cruiser',
    type: 'Tempo Traveller',
    seater: 12,
    pricePerKm: 48,
    image: 'https://images.unsplash.com/photo-1561361531-99e224e9f938?auto=format&fit=crop&w=400&q=80',
    features: ['Individual premium recliner chairs', 'Overhead dual ducted AC consoles', 'Integrated high definition media player'],
    transfers: ['Spiritual heritage pilgrimage loops', 'Multi-family retreat transport group']
  },
  {
    id: 'veh-minibus',
    name: 'Elite Commuter Mini Bus',
    type: 'Mini Bus',
    seater: 21,
    pricePerKm: 58,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=400&q=80',
    features: ['Panoramic glass tour view panels', 'Air suspension smooth ride comfort', 'Built-in microphone paging set'],
    transfers: ['Wedding attendee convoy services', 'Corporate delegates convention shuttle']
  },
  {
    id: 'veh-bus',
    name: 'Imperial Sovereign Liner',
    type: 'Bus',
    seater: 45,
    pricePerKm: 85,
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=400&q=80',
    features: ['Onboard hygienic toilet facility', 'Massive cavernous under-chassis cargo', 'Individual reading spot lamps on board'],
    transfers: ['State-wide historical spiritual tours', 'Large group tourist integrations']
  }
];

export const TESTIMONIALS = [
  {
    id: 't1',
    name: 'Satyajit Patnaik',
    role: 'General Manager, Niladri Palms Group',
    location: 'Puri',
    quote: 'Integrating our resort into the Bharat Travels Marketplace completely transformed our digital strategy. By routing direct GDS checking passes and displaying live pricing transparently, our direct yields surged 35% without aggregator cuts!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 't2',
    name: 'Pratima Mishra',
    role: 'Boutique Owner, Golden Vista Cottages',
    location: 'Konark',
    quote: 'The direct booking layout passed directly into physical guest voucher sheets has reduced front-desk friction down to zero minutes. Guests arrive, check their secure local pass, and receive their sanctuary key immediately.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 't3',
    name: 'Dinesh Rout',
    role: 'Managing Director, Kalinga Fleet Operators',
    location: 'Bhubaneswar',
    quote: 'Direct transport integration allows guests to bundle high-end SUV and Mini Bus transfers with their hotel bookings. This automated connection has filled our vehicle schedules and eliminated downtime.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
  }
];
