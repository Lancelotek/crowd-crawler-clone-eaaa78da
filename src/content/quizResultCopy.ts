export const quizResultCopy = {
  en: {
    booking: (count: string) => `Book a call about your ${count}-person plan`,
    heading: "Or get a tailored plan from Marek by email",
    submit: "Send me my plan", sending: "Sending…", name: "Name", email: "Email",
    nameExample: "Alex", emailExample: "alex@example.com",
    success: (email: string) => `Done - Marek will email you at ${email} within 24h.`,
    error: "Your request could not be sent. Please try again.",
    consent: "I agree to the processing of my personal data in accordance with the",
    privacy: "Privacy Policy",
  },
  pl: {
    booking: (count: string) => `Umów rozmowę o planie na ${count} osób`,
    heading: "Albo dostań od Marka plan mailem",
    submit: "Wyślij mi plan", sending: "Wysyłanie…", name: "Imię", email: "Email",
    nameExample: "Aleksandra", emailExample: "aleksandra@example.com",
    success: (email: string) => `Gotowe - Marek napisze do Ciebie na ${email} w ciągu 24h.`,
    error: "Nie udało się wysłać prośby. Spróbuj ponownie.",
    consent: "Wyrażam zgodę na przetwarzanie moich danych osobowych zgodnie z",
    privacy: "Polityką prywatności",
  },
};

export function quizBookingUrl(lang: "en" | "pl", name = "", email = "") {
  const params = new URLSearchParams();
  if (name.trim()) params.set("name", name.trim());
  if (email.trim()) params.set("email", email.trim());
  const query = params.toString();
  return `/${lang}/book${query ? `?${query}` : ""}`;
}