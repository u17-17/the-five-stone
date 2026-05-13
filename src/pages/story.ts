import type { PageComponent } from '../types';

const StoryPage: PageComponent = {
  render() {
    const section = document.createElement('div');
    section.innerHTML = '<p>Story page loading…</p>';
    return section;
  },
};

export default StoryPage;
