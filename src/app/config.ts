const DEFAULT_WHATSAPP_NUMBER = "2348000000000";

function envString(key: string, fallback: string) {
  const value = import.meta.env[key];
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function whatsappNumber(value: string) {
  const digitsOnly = value.replace(/\D/g, "");
  return digitsOnly || DEFAULT_WHATSAPP_NUMBER;
}

export function formatPrice(value: number) {
  return `NGN ${value.toLocaleString("en-NG")}`;
}

// Central business configuration for Renie O Fashion.
// Replace placeholder values before deploying to production.
export const BUSINESS = {
  name: envString("VITE_BUSINESS_NAME", "Amara Atelier"),
  tagline: "Luxury Womenswear · Port Harcourt",
  location: envString("VITE_BUSINESS_LOCATION", "Port Harcourt, Rivers State, Nigeria"),
  instagram: envString("VITE_INSTAGRAM_HANDLE", "amara_atelier"),
  instagramUrl: envString("VITE_INSTAGRAM_URL", "https://www.instagram.com/amara_atelier/"),
  whatsappNumber: whatsappNumber(envString("VITE_WHATSAPP_NUMBER", DEFAULT_WHATSAPP_NUMBER)),
  isUsingPlaceholderWhatsApp:
    whatsappNumber(envString("VITE_WHATSAPP_NUMBER", DEFAULT_WHATSAPP_NUMBER)) === DEFAULT_WHATSAPP_NUMBER,
  get whatsappBase() {
    return `https://wa.me/${this.whatsappNumber}`;
  },
  whatsappLink(message: string) {
    return `${this.whatsappBase}?text=${encodeURIComponent(message)}`;
  },
};

/** Pre-built WhatsApp messages */
export const WA = {
  general: () =>
    BUSINESS.whatsappLink("Hi Amara Atelier! I'd like to learn more about your collections."),

  bridal: (productName: string, price: number) =>
    BUSINESS.whatsappLink(
      `Hi Amara Atelier! I'd like to book a bridal consultation for:\n\n*${productName}*\nStarting from ${formatPrice(price)}\n\nPlease share your availability and next steps.`
    ),

  bespoke: (productName: string, price: number) =>
    BUSINESS.whatsappLink(
      `Hi Amara Atelier! I'd like to commission a bespoke piece:\n\n*${productName}*\nBudget reference: ${formatPrice(price)}+\n\nI'd love to discuss my vision and measurements.`
    ),

  order: (productName: string, price: number, size: string, category: string) =>
    BUSINESS.whatsappLink(
      `Hi Amara Atelier! I'd like to order:\n\n*${productName}* (${category})\nSize: ${size}\nPrice: ${formatPrice(price)}\n\nPlease confirm availability and delivery details.`
    ),

  cart: (lines: string, total: number) =>
    BUSINESS.whatsappLink(
      `Hi Amara Atelier! I'd like to place an order:\n\n${lines}\n\n*Total: ${formatPrice(total)}*\n\nPlease confirm availability and delivery details.`
    ),

  academy: () =>
    BUSINESS.whatsappLink(
      "Hi Amara! I'm interested in your fashion classes. Please share available courses and fees."
    ),

  bridalConsult: () =>
    BUSINESS.whatsappLink(
      "Hi Amara Atelier! I'd like to book a bridal consultation. Please share your availability."
    ),

  bespokeConsult: () =>
    BUSINESS.whatsappLink(
      "Hi Amara Atelier! I'd like to start a bespoke order. Please share next steps."
    ),
};
