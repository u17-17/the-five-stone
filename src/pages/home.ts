import type { PageComponent } from '../types';

const HomePage: PageComponent = {
  render() {
    const section = document.createElement('div');
    section.innerHTML = '<p>Home page loading…</p>';
    return section;
  },
};

export default HomePage;
