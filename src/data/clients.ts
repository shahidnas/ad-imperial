export interface Client {
  name: string;
  /** Optional expanded / legal name, shown smaller beneath the name. */
  fullName?: string;
  /** Optional logo path in /public. Falls back to typography when absent. */
  logo?: string;
  /** Optional alt text for the logo. */
  logoAlt?: string;
}

export const clients: Client[] = [
  { name: "Bhikharam Chandmal" },
  { name: "Mitti Café" },
  { name: "SAIL", fullName: "Steel Authority of India Limited" },
];
