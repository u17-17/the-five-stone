export interface PageComponent {
  render(): HTMLElement | DocumentFragment;
  cleanup?(): void;
}

export type PageName = 'home' | 'story' | 'product';
