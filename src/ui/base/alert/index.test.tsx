import { createRoot } from 'react-dom/client';
import { BaseAlert } from '.';

describe('BaseAlert', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const root = createRoot(div);
    root.render(
      <BaseAlert onClose={() => undefined} open size="md">
        Test Alert
      </BaseAlert>,
    );
    root.unmount();
  });
});
