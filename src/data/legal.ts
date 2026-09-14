import { siteConfig } from "@/src/lib/site";

export interface LegalSection {
  heading: string;
  body: string[];
}

export interface LegalDocument {
  title: string;
  summary: string;
  sections: LegalSection[];
}

const name = siteConfig.name;
const contactRoute = "/contact";

export const privacyPolicy: LegalDocument = {
  title: "Privacy Policy",
  summary:
    `This policy explains, in general terms, how ${name} handles information you share with us through this website. It is provided for transparency and does not form part of any contract.`,
  sections: [
    {
      heading: "Information we collect",
      body: [
        `When you submit an enquiry form we collect the details you choose to provide — typically your name, phone number, email address, selected service and message.`,
        `Like most websites, our hosting provider may automatically log standard technical information such as browser type, approximate location and pages visited. This is used only to keep the site secure and reliable.`,
      ],
    },
    {
      heading: "How we use your information",
      body: [
        `Enquiry details are used solely to respond to your request, prepare a quotation and follow up about your project.`,
        `We do not sell your information. We do not use it for unrelated marketing without your consent.`,
      ],
    },
    {
      heading: "Sharing",
      body: [
        `We may share information with service providers that help us operate the website or communicate with you (for example, hosting or email delivery). These providers are only permitted to use the information to perform services for us.`,
        `We may disclose information if required to do so by law.`,
      ],
    },
    {
      heading: "Retention",
      body: [
        `We keep enquiry information for as long as needed to handle your request and for a reasonable period afterwards for our records, then delete or anonymise it.`,
      ],
    },
    {
      heading: "Your choices",
      body: [
        `You can ask us what information we hold about you, ask us to correct it, or ask us to delete it. Contact us using the details on our contact page.`,
      ],
    },
    {
      heading: "Contact",
      body: [
        `If you have any questions about this policy, please reach out via our [contact page](${contactRoute}).`,
        `We may update this policy from time to time. The latest version will always be available on this page.`,
      ],
    },
  ],
};

export const termsAndConditions: LegalDocument = {
  title: "Terms & Conditions",
  summary:
    `These terms govern your use of this website. Specific commercial terms for any signage project are agreed separately in writing before work begins.`,
  sections: [
    {
      heading: "Using this website",
      body: [
        `This website and its content are provided for general information about ${name} and our services.`,
        `You may view and share pages for personal, non-commercial purposes. You may not copy, republish or reuse the content, images or design without our permission.`,
      ],
    },
    {
      heading: "No guarantee of accuracy",
      body: [
        `We take care to keep information on this site accurate and up to date, but we do not warrant that it is complete or error-free. Descriptions, images and indicative timelines are for illustration and may change.`,
      ],
    },
    {
      heading: "Enquiries and quotations",
      body: [
        `Submitting an enquiry does not create a contract. Any quotation we provide is an offer to carry out work on the terms stated in that quotation and is valid for the period noted there.`,
        `Project scope, pricing, timelines, payment terms and warranties are confirmed in a separate written agreement before fabrication begins.`,
      ],
    },
    {
      heading: "Third-party links",
      body: [
        `Where this site links to third-party websites, we are not responsible for their content or practices.`,
      ],
    },
    {
      heading: "Limitation of liability",
      body: [
        `To the extent permitted by law, ${name} is not liable for any loss arising from reliance on information on this website. Nothing in these terms limits liability that cannot be limited under applicable law.`,
      ],
    },
    {
      heading: "Contact",
      body: [
        `Questions about these terms can be sent through our [contact page](${contactRoute}).`,
        `We may revise these terms from time to time; the current version is the one published on this page.`,
      ],
    },
  ],
};
