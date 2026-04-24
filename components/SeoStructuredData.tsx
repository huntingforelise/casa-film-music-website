import type { FooterData } from '@/types/footer';

import { getAbsoluteUrl, SITE_DESCRIPTION, SITE_NAME } from '@/lib/site';

type SeoStructuredDataProps = {
  footer?: FooterData | null;
};

const SeoStructuredData = ({ footer }: SeoStructuredDataProps) => {
  const socialProfiles = footer?.socialLinks?.map((link) => link.url).filter(Boolean) ?? [];
  const phone = footer?.phoneNumbers?.[0]?.trim();
  const email = footer?.email?.trim();
  const address = footer?.studioAddress?.trim();

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    name: SITE_NAME,
    url: getAbsoluteUrl('/'),
    description: SITE_DESCRIPTION,
    ...(phone ? { telephone: phone } : {}),
    ...(email ? { email } : {}),
    ...(address
      ? {
          address: {
            '@type': 'PostalAddress',
            streetAddress: address,
          },
        }
      : {}),
    ...(socialProfiles.length ? { sameAs: socialProfiles } : {}),
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: getAbsoluteUrl('/'),
    description: SITE_DESCRIPTION,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
};

export default SeoStructuredData;
