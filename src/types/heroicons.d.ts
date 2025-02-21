declare module '@heroicons/react' {
  import { FC, SVGProps, ReactNode } from 'react';
  
  interface ComponentProps {
    className?: string;
    children?: ReactNode;
    variant?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger';
  }

  interface ModalProps extends ComponentProps {
    open: boolean;
    onClose: () => void;
    title: string;
  }

  export const Navbar: FC<ComponentProps & SVGProps<SVGSVGElement>>;
  
  export const Breadcrumb: FC<ComponentProps & SVGProps<SVGSVGElement>> & {
    Item: FC<ComponentProps & SVGProps<SVGSVGElement>>;
  };
  
  export const Badge: FC<ComponentProps & SVGProps<SVGSVGElement>>;
  
  export const Alert: FC<ComponentProps & SVGProps<SVGSVGElement>>;
  
  export const Modal: FC<ModalProps & SVGProps<SVGSVGElement>> & {
    Header: FC<ComponentProps & SVGProps<SVGSVGElement>>;
    Body: FC<ComponentProps & SVGProps<SVGSVGElement>>;
    Footer: FC<ComponentProps & SVGProps<SVGSVGElement>>;
  };
}
