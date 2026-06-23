export interface Destination {
  id: string;
  name: string;
  state: string;
  image: string;
  propertiesCount: number;
  description: string;
  attraction: string;
}

export interface Property {
  id: string;
  name: string;
  location: string;
  state: string;
  rating: number;
  reviewsCount: number;
  image: string;
  startingPrice: number;
  amenities: string[];
  description: string;
  category: 'hotel' | 'resort' | 'villa';
  isFeatured?: boolean;
  // Detail Flow properties
  gallery?: string[];
  nearbyAttractions?: string[];
  roomCategories?: {
    name: string;
    price: number;
    description: string;
    amenities: string[];
  }[];
  reviewsList?: {
    author: string;
    date: string;
    content: string;
    score: number;
  }[];
}

export interface ExperienceCategory {
  id: string;
  title: string;
  image: string;
  countOfPackages: number;
  startFromPrice: number;
  description: string;
  highlights: string[];
}

export interface Vehicle {
  id: string;
  name: string;
  type: 'Auto' | 'Sedan' | 'SUV' | 'Innova' | 'Tempo Traveller' | 'Mini Bus' | 'Bus';
  seater: number;
  pricePerKm: number;
  image: string;
  features: string[];
  transfers: string[];
}

export interface Booking {
  id: string;
  type: 'hotel' | 'transport';
  targetName: string; // Hotel name or Vehicle name
  locationOrRoute?: string;
  checkIn: string;
  checkOut?: string;
  guests: number;
  totalPrice: number;
  status: 'Pending' | 'Assigned' | 'Confirmed' | 'In Progress' | 'Completed' | 'Cancelled';
  bookingDate: string;
  
  // Transport specific fields
  pickupLocation?: string;
  dropLocation?: string;
  travelDate?: string;
  travelTime?: string;
  tripType?: string;
  vehicleType?: string;
  contactNumber?: string;
  specialInstructions?: string;
  assignedVehicle?: string; // Vehicle instance or description
  assignedVehiclePlate?: string; // License plate
  assignedDriver?: string; // Driver Name
  assignedDriverPhone?: string; // Driver Phone
  fareBreakdown?: {
    fare: number;
    partnerCost: number;
    commission: number;
    netRevenue: number;
  };
  linkedHotelBookingId?: string; // Linked hotel booking relation
  transportTypeSelection?: string; // e.g. "Airport Pickup" if bundled
}

export interface PartnerInquiry {
  id: string;
  propertyName: string;
  ownerName: string;
  email: string;
  phone: string;
  city: string;
  propertyType: string;
  status: 'Submitted' | 'Reviewed' | 'Approved';
  submissionDate: string;
}
