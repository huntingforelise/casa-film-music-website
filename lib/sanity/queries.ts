export const headerQuery = `
  *[_id == "header"][0]
`;

export const footerQuery = `
  *[_id == "footer"][0]
`;

export const homepageQuery = `
  *[_id == "homepage"][0]
`;

export const pageBySlugQuery = `
  *[_type == "page" && slug.current == $slug][0]{
    title,
    slug,
    sections[]{
      ...,
      image,
      optionOne{
        title,
        link,
        image
      },
      optionTwo{
        title,
        link,
        image
      }
    }
  }
`
