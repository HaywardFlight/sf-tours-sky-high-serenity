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
    p2: { price: 638, url: "https://book.squareup.com/appointments/bu3mn423jertmp/location/4TBCQG5S6SC6G/services/J5X6DBMP2HWJ345ATEVYH72X" },
    p3: { price: 957, url: "https://book.squareup.com/appointments/bu3mn423jertmp/location/4TBCQG5S6SC6G/services/DF44ADETLBZRIQV3TVHXBTZ6" },
  },
  elite: {
    name: "Elite San Francisco Bay Area Tour",
    duration: "1 hr",
    p2: { price: 678, url: "https://book.squareup.com/appointments/bu3mn423jertmp/location/4TBCQG5S6SC6G/services/WTOKGDSBEWYCT2CLOZMDITUZ" },
    p3: { price: 1017, url: "https://book.squareup.com/appointments/bu3mn423jertmp/location/4TBCQG5S6SC6G/services/F5XGLKKR37RINXJSMITA4SNS" },
  },
  sunset: {
    name: "San Francisco Sunset Flight Tour",
    duration: "40 min",
    p2: { price: 658, url: "https://book.squareup.com/appointments/bu3mn423jertmp/location/4TBCQG5S6SC6G/services/TNG54EBXHYNLXBMCAWJ455X6" },
    p3: { price: 987, url: "https://book.squareup.com/appointments/bu3mn423jertmp/location/4TBCQG5S6SC6G/services/TRTPW2DJQLB6FBUTTOGB47H2" },
  },
  night: {
    name: "San Francisco Night Flight Tour",
    duration: "40 min",
    p2: { price: 658, url: "https://book.squareup.com/appointments/bu3mn423jertmp/location/4TBCQG5S6SC6G/services/ULAS7IMUAUHP2ZM4J7B5QGOT" },
    p3: { price: 987, url: "https://book.squareup.com/appointments/bu3mn423jertmp/location/4TBCQG5S6SC6G/services/XCOMUMDYTWPONJGNWP43DHGJ" },
  },
  napa: {
    name: "Napa Valley Wine Country Flight Tour",
    duration: "1 hr 30 min",
    p2: { price: 718, url: "https://book.squareup.com/appointments/bu3mn423jertmp/location/4TBCQG5S6SC6G/services/VUT7I7S6PK64VGU3ZGTLJO2J" },
    p3: { price: 1077, url: "https://book.squareup.com/appointments/bu3mn423jertmp/location/4TBCQG5S6SC6G/services/FXWAT4HN7J4CCRSSTFJ22R3B" },
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
