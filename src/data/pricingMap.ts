export type Tier = "OFFPEAK" | "STANDARD" | "PEAK";

export type Sku =
  | "bay_40_2p"
  | "bay_40_3p"
  | "elite_60_2p"
  | "elite_60_3p"
  | "sunset_40_2p"
  | "sunset_40_3p"
  | "night_40_2p"
  | "night_40_3p"
  | "napa_90_2p";

export interface TierPricing {
  price: number;
  url: string;
}

export const PRICE_MAP: Record<Sku, Record<Tier, TierPricing>> = {
  bay_40_2p: {
    OFFPEAK: { price: 543, url: "https://square.link/u/tMialGSN" },
    STANDARD: { price: 578, url: "https://checkout.square.site/merchant/6HRDRVY7Y48F7/checkout/3KUPF2K7DCUPZGUXMAVQUGZK" },
    PEAK: { price: 624, url: "https://square.link/u/6sFlz1wH" },
  },
  bay_40_3p: {
    OFFPEAK: { price: 815, url: "https://square.link/u/AkDoPZZT" },
    STANDARD: { price: 867, url: "https://checkout.square.site/merchant/6HRDRVY7Y48F7/checkout/7LFOHTRNQEYZ4WIGZ2LQXA3Q" },
    PEAK: { price: 936, url: "https://square.link/u/96L0QaDG" },
  },
  elite_60_2p: {
    OFFPEAK: { price: 581, url: "https://square.link/u/YBgdL5ud" },
    STANDARD: { price: 618, url: "https://checkout.square.site/merchant/6HRDRVY7Y48F7/checkout/KK4NXWOTTJSDLBC4OX4LIYFH" },
    PEAK: { price: 667, url: "https://square.link/u/cJTVizpX" },
  },
  elite_60_3p: {
    OFFPEAK: { price: 871, url: "https://square.link/u/D5Ug8GOl" },
    STANDARD: { price: 927, url: "https://checkout.square.site/merchant/6HRDRVY7Y48F7/checkout/HDV7I3VDXD74F2K6BRA4T425" },
    PEAK: { price: 1001, url: "https://square.link/u/wPUEoEK6" },
  },
  sunset_40_2p: {
    OFFPEAK: { price: 562, url: "https://square.link/u/gTyyW0gu" },
    STANDARD: { price: 598, url: "https://checkout.square.site/merchant/6HRDRVY7Y48F7/checkout/G3VUJMGM3JQ6Y2DKBQPO77N4" },
    PEAK: { price: 646, url: "https://square.link/u/Yg2VlnEe" },
  },
  sunset_40_3p: {
    OFFPEAK: { price: 843, url: "https://square.link/u/tsKrdzj1" },
    STANDARD: { price: 897, url: "https://checkout.square.site/merchant/6HRDRVY7Y48F7/checkout/HGGGJTDYI4KW6J5SSYWSC3NV" },
    PEAK: { price: 969, url: "https://square.link/u/EIBETs4K" },
  },
  night_40_2p: {
    OFFPEAK: { price: 562, url: "https://square.link/u/LsbWt1Ni" },
    STANDARD: { price: 598, url: "https://checkout.square.site/merchant/6HRDRVY7Y48F7/checkout/2MG2GR2SPXCDFCD5RNSOM5HU" },
    PEAK: { price: 646, url: "https://square.link/u/9zKjISO1" },
  },
  night_40_3p: {
    OFFPEAK: { price: 843, url: "https://square.link/u/1vsBCVyn" },
    STANDARD: { price: 897, url: "https://checkout.square.site/merchant/6HRDRVY7Y48F7/checkout/IWW5U6LILDPEAKKVDBOJVK7K" },
    PEAK: { price: 969, url: "https://square.link/u/MVnU5GXO" },
  },
  napa_90_2p: {
    OFFPEAK: { price: 600, url: "https://square.link/u/aXKzcIDj" },
    STANDARD: { price: 638, url: "https://checkout.square.site/merchant/6HRDRVY7Y48F7/checkout/4HYBBRVG5MAZHABE4EXTB622" },
    PEAK: { price: 689, url: "https://square.link/u/1YzHGqNV" },
  },
};
