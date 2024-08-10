export interface TOrderItem {
  id: string;
  name: string;
  price: number;
  stock: number;
}

export interface TUserDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
  paymentMethod: 'Cash' | 'Credit Card' | 'PayPal'; // Adjust payment methods as needed
}

export interface TOrder {
  items: TOrderItem[];
  totalPriceWithVAT: number;
  userDetails: TUserDetails;
  status: 'Pending' | 'Completed' | 'Cancelled'; // Adjust statuses as needed
}
