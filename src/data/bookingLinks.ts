/**
 * Single source of truth for all Square booking links and prices.
 * No dynamic pricing tiers — just one price + link per tour/passenger combo.
 */

export interface BookingOption {
  price: number;
  url: string;
}

export interface TourBooking {
  name: string;
  duration: string;
  p2: BookingOption;
  p3?: BookingOption; // Napa has no 3p option
}

export const BOOKING_LINKS = {
  bay: {
    name: "San Francisco Bay Area Flight Tour",
    duration: "40 min",
    p2: { price: 638, url: "https://square.link/u/BMJ8grVZ" },
    p3: { price: 957, url: "https://square.link/u/qOyrCk0t" },
  },
  elite: {
    name: "Elite San Francisco Bay Area Tour",
    duration: "1 hr",
    p2: { price: 678, url: "https://square.link/u/HAH0knzU" },
    p3: { price: 1017, url: "https://square.link/u/FASlxQm7" },
  },
  sunset: {
    name: "San Francisco Sunset Flight Tour",
    duration: "40 min",
    p2: { price: 658, url: "https://square.link/u/lXkrY7Vv" },
    p3: { price: 987, url: "https://square.link/u/6rrtSHxI" },
  },
  night: {
    name: "San Francisco Night Flight Tour",
    duration: "40 min",
    p2: { price: 658, url: "https://square.link/u/9ikV6ZBm" },
    p3: { price: 987, url: "https://square.link/u/1kU6TwFA" },
  },
  napa: {
    name: "Napa Valley Wine Country Flight Tour",
    duration: "1 hr 30 min",
    p2: { price: 638, url: "https://square.link/u/aXKzcIDj" },
  },
} as const satisfies Record<string, TourBooking>;

export type TourKey = keyof typeof BOOKING_LINKS;

/** Helper to format price for display */
export function formatPrice(price: number): string {
  return `$${price.toLocaleString()}`;
}

/** Get all booking options for a tour as an array */
export function getTourOptions(key: TourKey) {
  const tour = BOOKING_LINKS[key];
  const options: { passengers: number; price: number; url: string }[] = [
    { passengers: 2, price: tour.p2.price, url: tour.p2.url },
  ];
  if ("p3" in tour && tour.p3) {
    options.push({ passengers: 3, price: tour.p3.price, url: tour.p3.url });
  }
  return { name: tour.name, duration: tour.duration, options };
}
