export interface Testimonial {
  id: number;
  name: string;
  company: string;
  project: string;
  text: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Rahul Sharma",
    company: "Business Owner",
    project: "Premium ACP Signage",
    text: "The finishing and overall presentation were excellent. The signage completely changed the look of our business entrance and feels extremely premium.",
  },
  {
    id: 2,
    name: "Amit Das",
    company: "Retail Business",
    project: "3D Channel Letters",
    text: "From design to installation, everything was handled professionally. The final signage looks exactly like what we had imagined.",
  },
  {
    id: 3,
    name: "Sanjay Mehta",
    company: "Restaurant Owner",
    project: "Illuminated Signage",
    text: "Great attention to detail and a very clean finish. The illuminated sign looks beautiful in the evening and gets noticed immediately.",
  },
];
