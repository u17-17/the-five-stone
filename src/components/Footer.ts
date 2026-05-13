export function renderFooter(): HTMLElement {
  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.id = 'footer';
  footer.innerHTML = `
    <div class="footer-inner">
      <div class="footer-grid">
        <div class="footer-brand">
          <h3>THE FIFTH STONE</h3>
          <p>Wear the Stone That Mends the Sky.</p>
        </div>
        <div class="footer-links">
          <a href="#home">Home</a>
          <a href="#story">The Legend</a>
          <a href="#product">Collection</a>
        </div>
        <div class="footer-links">
          <a href="#">Shipping Policy</a>
          <a href="#">Return Policy</a>
          <a href="#">Terms of Service</a>
        </div>
        <div class="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Contact</a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; ${new Date().getFullYear()} The Fifth Stone. All rights reserved.</p>
      </div>
    </div>
  `;

  footer.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = (link as HTMLAnchorElement).getAttribute('href')!;
      window.location.hash = href;
    });
  });

  return footer;
}
