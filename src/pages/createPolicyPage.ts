import type { PageComponent } from '../types';
import { renderPolicyPageLayout } from '../components/PolicyPageLayout';
import { policyPages, type PolicyRoute } from '../data/policyContent';

export function createPolicyPage(route: PolicyRoute): PageComponent {
  const content = policyPages[route];

  return {
    seo: content.seo,
    render() {
      return renderPolicyPageLayout(content);
    },
  };
}
