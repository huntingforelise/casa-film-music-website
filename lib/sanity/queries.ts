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
    otherLinks[]{
      label,
      url
    },
    ctaHeading,
    contactHeading,
    developerCreditText,
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
      startTimeLabel,
      durationLabel,
      guestCountLabel,
      travelRegionLabel,
      venueLabel,
      venuePlaceholder,
      serviceFromLabel,
      priceOnRequestText,
      bundleIntro,
      bundleNoSuggestions,
      bundleSelectLabel,
      bundleSelectedLabel,
      bundleAddMissingLabel,
      bundleIncludesLabel,
      bundleStartingPricePrefix,
      bundleOriginalPricePrefix,
      bundleRegularPricePrefix,
      addOnsEmptyText,
      summaryTitle,
      summarySubtitle,
      summaryNoneSelectedText,
      summaryNotProvidedText,
      summaryNoPackageText,
      summaryLabelEvent,
      summaryLabelDate,
      summaryLabelTime,
      summaryLabelDuration,
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
    title,
    slug,
    sections[],
    template
  }
`;

export const contactFormQuery = `
  *[_id == "contactForm"][0]{
    title,
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
