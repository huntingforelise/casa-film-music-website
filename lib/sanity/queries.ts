export const headerQuery = `
  *[_id == "header"][0]{
    logo,
    navigation[]{
      label,
      url,
      subLinks[]{
        label,
        url
      }
    }
  }
`;

export const footerQuery = `
  *[_id == "footer"][0]{
    socialLinks[]{
      platform,
      url
    },
    phoneNumbers,
    email,
    legalAdvice,
    otherLinks[]{
      label,
      url
    },
    developerCreditLabel,
    developerCreditUrl
  }
`;

export const homepageQuery = `
  *[_id == "homepage"][0]
`;

export const pageBySlugQuery = `
  *[_type == "page" && slug.current == $slug][0]{
    title,
    slug,
    sections[],
    template
  }
`;
