export interface PortableTextSpan {
  _key: string;
  _type: 'span';
  text: string;
  marks?: string[];
}

export interface PortableTextMarkDef {
  _key: string;
  _type: string;
  href?: string;
}

export interface PortableTextBlock {
  _key: string;
  _type: 'block';
  style?: 'normal' | 'h1' | 'h2' | 'h3';
  listItem?: 'bullet' | 'number';
  level?: number;
  children: PortableTextSpan[];
  markDefs?: PortableTextMarkDef[];
}
