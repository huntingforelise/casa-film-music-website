export const headerQuery = `
  *[_type == "header"][0]{
    logo,
    navigation[]{
      label,
      url
    }
  }
`;

export const footerQuery = `
  *[_type == "footer"][0]{
    text,
    links[]{
      label,
      url
    }
  }
`;
