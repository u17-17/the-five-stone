import { navigateTo } from '../router';
import type { PolicyBlock, PolicyPageContent, PolicySection } from '../data/policyContent';
import { SUPPORT_EMAIL } from '../siteConfig';
import { analyticsEvents, trackEvent } from '../lib/analytics';

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function renderBlock(block: PolicyBlock): string {
  if (block.type === 'list') {
    return `
      <ul>
        ${block.items.map(item => `<li>${escapeHtml(item)}</li>`).join('')}
      </ul>
    `;
  }

  if (block.type === 'email') {
    const email = escapeHtml(block.email);
    return `<p><a class="policy-email-link" href="mailto:${email}">${email}</a></p>`;
  }

  return `<p>${escapeHtml(block.text)}</p>`;
}

function renderSection(section: PolicySection): string {
  return `
    <section class="policy-section">
      <h2>${escapeHtml(section.heading)}</h2>
      <div class="policy-copy">
        ${section.blocks.map(renderBlock).join('')}
      </div>
    </section>
  `;
}

function renderContactForm(): string {
  return `
    <form class="policy-contact-form" novalidate>
      <div class="policy-form-grid">
        <label>
          <span>Name</span>
          <input type="text" name="name" autocomplete="name" required>
        </label>
        <label>
          <span>Email</span>
          <input type="email" name="email" autocomplete="email" required>
        </label>
      </div>
      <label>
        <span>Order Number <em>optional</em></span>
        <input type="text" name="orderNumber" autocomplete="off">
      </label>
      <label>
        <span>Message</span>
        <textarea name="message" rows="6" required></textarea>
      </label>
      <button class="btn policy-submit-btn" type="submit">Send Message</button>
      <p class="policy-form-status" role="status" aria-live="polite" hidden></p>
    </form>
  `;
}

export function renderPolicyPageLayout(content: PolicyPageContent): HTMLElement {
  const page = document.createElement('article');
  page.className = 'policy-page';

  page.innerHTML = `
    <div class="policy-page-shell">
      <header class="policy-hero" aria-labelledby="${content.route}-title">
        <p class="policy-kicker">The Fifth Stone</p>
        <h1 id="${content.route}-title">${escapeHtml(content.title)}</h1>
        <p class="policy-intro">${escapeHtml(content.intro)}</p>
        ${content.lastUpdated ? `<p class="policy-updated">${escapeHtml(content.lastUpdated)}</p>` : ''}
      </header>

      ${content.showContactForm ? renderContactForm() : ''}

      <div class="policy-content">
        ${content.sections.map(renderSection).join('')}
      </div>

      <div class="policy-back">
        <a class="btn btn-outline" href="/" data-policy-back>Back to The Fifth Stone</a>
      </div>
    </div>
  `;

  const contactForm = page.querySelector<HTMLFormElement>('.policy-contact-form');
  contactForm?.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    trackEvent(analyticsEvents.contactClick, { source: 'contact_form' });

    const status = contactForm.querySelector<HTMLElement>('.policy-form-status');
    if (status) {
      status.hidden = false;
      status.textContent = `Thank you for your message. Please email us directly at ${SUPPORT_EMAIL} while our contact system is being finalized.`;
    }
    contactForm.reset();
  });

  page.querySelectorAll<HTMLAnchorElement>('.policy-email-link').forEach(link => {
    link.addEventListener('click', () => {
      trackEvent(analyticsEvents.contactClick, { source: 'policy_email_link' });
    });
  });

  page.querySelector<HTMLAnchorElement>('[data-policy-back]')?.addEventListener('click', (event) => {
    event.preventDefault();
    navigateTo('home');
  });

  return page;
}
