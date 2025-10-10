export type Review = {
  id: number;
  rating: number;
  comment: string;
};

export type Listing = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  hostType: string;
  listingType: string;
  guestFavorite?: boolean;
  reviews: Review[];
};
