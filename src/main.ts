import './style.css';
import { initRouter } from './router';

function initApp() {
  const app = document.getElementById('app')!;
  app.innerHTML = '';

  document.addEventListener('page-rendered', () => {
    if (!app.querySelector('.site-footer')) {
      import('./components/Footer').then(m => {
        app.appendChild(m.renderFooter());
      });
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initApp();
  initRouter();
});
