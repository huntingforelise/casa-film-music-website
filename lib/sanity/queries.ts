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

export const bookingSettingsQuery = `
  *[_id == "bookingSettings"][0]{
    _id,
    _type,
    introTitle,
    introText,
    disclaimer,
    eventTypes[]{
      value,
      title,
      description
    },
    services[]{
      value,
      title,
      description,
      basePrice,
      priceNote
    },
    bundles[]{
      code,
      title,
      description,
      includedServices,
      startingPrice,
      originalPrice,
      priceNote,
      highlightLabel
    },
    addOns[]{
      code,
      title,
      description,
      price,
      priceNote,
      applicableServices
    },
    travelRegions[]{
      value,
      title,
      description,
      fee,
      feeNote
    }
  }
`;

export const pageBySlugQuery = `
  *[_type == "page" && slug.current == $slug][0]{
    title,
    slug,
    sections[],
    template
  }
`;
