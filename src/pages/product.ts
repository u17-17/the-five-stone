import type { PageComponent } from '../types';

const ProductPage: PageComponent = {
  render() {
    const section = document.createElement('div');
    section.innerHTML = '<p>Product page loading…</p>';
    return section;
  },
};

export default ProductPage;
