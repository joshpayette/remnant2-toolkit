import { createRoot } from 'react-dom/client';
import { BaseAvatar } from '.';

describe('BaseAlert', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const root = createRoot(div);
    root.render(<BaseAvatar />);
    root.unmount();
  });
});
