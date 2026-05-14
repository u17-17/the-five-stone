export interface PageComponent {
  render(): HTMLElement | DocumentFragment;
  cleanup?(): void;
  seo?: PageSeo;
}

export interface PageSeo {
  title: string;
  description: string;
}

export type PageName =
  | 'home'
  | 'story'
  | 'product'
  | 'shipping-policy'
  | 'return-refund-policy'
  | 'privacy-policy'
  | 'terms-of-service'
  | 'contact'
  | 'faq';
