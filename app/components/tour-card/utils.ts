/**
 * Format minutes to days/hours
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} minutes`;
  } else if (minutes < 1440) {
    const hours = Math.floor(minutes / 60);
    return `${hours} ${hours === 1 ? "hour" : "hours"}`;
  } else {
    const days = Math.floor(minutes / 1440);
    return `${days} ${days === 1 ? "day" : "days"}`;
  }
}

/**
 * Format price with currency
 */
export function formatPrice(price: number, currency = "IDR"): string {
  if (currency === "IDR") {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: currency,
    }).format(price);
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(price);
}

/**
 * Calculate average rating from reviews
 */
export function calculateAverageRating(reviews: { rating: number }[]): number {
  if (reviews.length === 0) return 0;

  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return sum / reviews.length;
}
