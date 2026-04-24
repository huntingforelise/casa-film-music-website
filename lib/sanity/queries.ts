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
    studioAddress,
    otherLinks[]{
      label,
      url
    },
    ctaHeading,
    ctaText,
    developerCreditText,
    developerCreditLabel,
    developerCreditUrl
  }
`;

export const cookieBannerQuery = `
  *[_id == "cookieBanner"][0]{
    eyebrow,
    heading,
    body,
    essentialButtonLabel,
    acceptButtonLabel,
    cookieSettingsLabel,
    videoBlockedEyebrow,
    videoBlockedHeading,
    videoBlockedBody,
    videoBlockedButtonLabel
  }
`;

export const homepageQuery = `
  *[_id == "homepage"][0]
`;

export const bookingSettingsQuery = `
  *[_id == "bookingSettings"][0]{
    _id,
    _type,
    eyebrow,
    title,
    intro,
    disclaimer,
    eventTypes[]{
      value,
      title,
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
    },
    copy{
      eventTypeLabel,
      eventDateLabel,
      guestCountLabel,
      travelRegionLabel,
      venueLabel,
      venuePlaceholder,
      serviceFromLabel,
      priceOnRequestText,
      servicesIntro,
      bundleIntro,
      bundleNoSuggestions,
      bundleSelectLabel,
      bundleSelectedLabel,
      bundleIncludesLabel,
      bundleStartingPricePrefix,
      bundleOriginalPricePrefix,
      bundleRegularPricePrefix,
      eventDetailsIntro,
      addOnsIntro,
      addOnsEmptyText,
      summaryTitle,
      summarySubtitle,
      summaryNoneSelectedText,
      summaryNotProvidedText,
      summaryNoPackageText,
      summaryLabelEvent,
      summaryLabelDate,
      summaryLabelGuests,
      summaryLabelVenue,
      summaryLabelTravel,
      summaryLabelServices,
      summaryLabelPackage,
      summaryLabelAddOns,
      summaryContactNameLabel,
      summaryContactEmailLabel,
      summaryContactPhoneLabel,
      summaryNotesLabel,
      buttonBackText,
      buttonContinueText,
      buttonSubmitText,
      buttonSubmittingText,
      feedbackNetworkErrorText,
      feedbackGenericErrorText,
      feedbackPersistedText,
      feedbackNotPersistedText
    }
  }
`;

export const pageBySlugQuery = `
  *[_type == "page" && slug.current == $slug][0]{
    _updatedAt,
    title,
    subtitle,
    slug,
    sections[],
    template
  }
`;

export const pagesForSitemapQuery = `
  *[_type == "page" && defined(slug.current)]{
    "slug": slug.current,
    _updatedAt
  }
`;

export const contactFormQuery = `
  *[_id == "contactForm"][0]{
    eyebrow,
    title,
    intro,
    nameLabel,
    emailLabel,
    messageLabel,
    submitLabel,
    submittingLabel,
    feedbackSuccess,
    feedbackError,
    feedbackNetworkError
  }
`;

export const photoMosaicSectionQuery = `
  _type == "photoMosaicSection" => {
    _type,
    eyebrow,
    title,
    intro,
    slotA{ image },
    slotB{ image },
    slotC{ image },
    slotD{ image },
    slotE{ image },
    slotF{ image },
    slotG{ image },
    slotH{ image },
    slotI{ image }
  }
`;
