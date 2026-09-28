import JsonLd from "@/src/components/JsonLd";
import { localBusinessSchema, websiteSchema } from "@/src/lib/schema";

/**
 * Site-wide LocalBusiness + WebSite structured data, rendered once from the
 * root layout. Page-level Service/Article schemas reference the business by
 * its @id instead of repeating it.
 */
export default function StructuredData() {
  return <JsonLd data={[localBusinessSchema(), websiteSchema()]} />;
}
