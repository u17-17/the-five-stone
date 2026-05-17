export interface PageComponent {
  render(): HTMLElement | DocumentFragment;
  cleanup?(): void;
  seo?: PageSeo;
}

export interface PageSeo {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
}

export type PageName =
  | 'home'
  | 'story'
  | 'collection'
  | 'product'
  | 'shipping-policy'
  | 'return-refund-policy'
  | 'privacy-policy'
  | 'terms-of-service'
  | 'contact'
  | 'faq';
