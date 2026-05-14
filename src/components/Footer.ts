import { navigateTo } from '../router';
import type { PageName } from '../types';

export function renderFooter(): HTMLElement {
  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.id = 'footer';
  footer.innerHTML = `
    <div class="footer-inner">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="footer-brand-mark" aria-hidden="true">
            <img src="/brand-logo-mark.png" alt="">
          </div>
          <h3>THE FIFTH STONE</h3>
          <p>Wear the Stone That Mends the Sky.</p>
        </div>
        <div class="footer-links">
          <p class="footer-link-heading">Explore</p>
          <a href="/#home" data-footer-route="home">Home</a>
          <a href="/#story" data-footer-route="story">The Legend</a>
          <a href="/#product" data-footer-route="product">Collection</a>
        </div>
        <div class="footer-links footer-policy-links" aria-label="Policy links">
          <p class="footer-link-heading">Policy Links</p>
          <a href="/shipping-policy" data-footer-route="shipping-policy">Shipping Policy</a>
          <a href="/return-refund-policy" data-footer-route="return-refund-policy">Return &amp; Refund Policy</a>
          <a href="/privacy-policy" data-footer-route="privacy-policy">Privacy Policy</a>
          <a href="/terms-of-service" data-footer-route="terms-of-service">Terms of Service</a>
          <a href="/contact" data-footer-route="contact">Contact</a>
          <a href="/faq" data-footer-route="faq">FAQ</a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; ${new Date().getFullYear()} The Fifth Stone. All rights reserved.</p>
      </div>
    </div>
  `;

  footer.querySelectorAll<HTMLAnchorElement>('[data-footer-route]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const route = link.dataset.footerRoute as PageName | undefined;
      if (route) navigateTo(route);
    });
  });

  return footer;
}
