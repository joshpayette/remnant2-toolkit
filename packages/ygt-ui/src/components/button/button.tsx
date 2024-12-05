import { cn } from '@ygt/ui/cn';

interface ButtonProps {
  children: React.ReactNode;
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant: 'primary' | 'secondary';
}

export function Button({ children, size, variant }: ButtonProps) {
  const buttonSharedClasses = cn(
    // general
    'rounded font-semibold shadow-sm',
    // variants
    variant === 'primary' &&
      'bg-indigo-600 hover:bg-indigo-500 text-white focus-visible:outline-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
    variant === 'secondary' &&
      'ring-1 ring-inset ring-gray-300 hover:bg-gray-50 text-gray-900',
    // sizing
    size === 'xs' && 'px-2 py-1 text-xs',
    size === 'sm' && 'px-2 py-1 text-sm',
    size === 'md' && 'px-2.5 py-1.5 text-sm',
    size === 'lg' && 'px-3 py-2 text-sm',
    size === 'xl' && 'px-3.5 py-2.5 text-sm',
  );
}
