import { analyticsEvents, trackEvent } from '../lib/analytics';

export function renderFooter(): HTMLElement {
  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.id = 'footer';
  footer.innerHTML = `
    <div class="footer-inner">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="footer-brand-mark" aria-hidden="true">
            <img src="/brand-logo-mark.webp" alt="" width="555" height="540" loading="lazy" decoding="async">
          </div>
          <h3>THE FIFTH STONE</h3>
          <p>Wear the Stone That Mends the Sky.</p>
        </div>
        <div class="footer-links">
          <p class="footer-link-heading">Explore</p>
          <a href="/">Home</a>
          <a href="/collection" data-footer-track="collection">Collection</a>
          <a href="/story" data-footer-track="story">Our Story</a>
        </div>
        <div class="footer-links footer-policy-links" aria-label="Customer care links">
          <p class="footer-link-heading">Customer Care</p>
          <a href="/policies/shipping-policy">Shipping Policy</a>
          <a href="/policies/refund-policy">Return &amp; Refund Policy</a>
          <a href="/contact" data-footer-track="contact">Contact Us</a>
          <a href="/faq">FAQ</a>
        </div>
        <div class="footer-links footer-policy-links" aria-label="Legal links">
          <p class="footer-link-heading">Legal</p>
          <a href="/policies/privacy-policy">Privacy Policy</a>
          <a href="/policies/terms-of-service">Terms of Service</a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; ${new Date().getFullYear()} The Fifth Stone. All rights reserved.</p>
      </div>
    </div>
  `;

  footer.querySelectorAll<HTMLElement>('[data-footer-track]').forEach(link => {
    link.addEventListener('click', () => {
      const target = link.dataset.footerTrack;
      if (target === 'collection') {
        trackEvent(analyticsEvents.collectionClick, { source: 'footer' });
      } else if (target === 'story') {
        trackEvent(analyticsEvents.storyCtaClick, { source: 'footer' });
      } else if (target === 'contact') {
        trackEvent(analyticsEvents.contactClick, { source: 'footer' });
      }
    });
  });

  return footer;
}
