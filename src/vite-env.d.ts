/// <reference types="vite/client" />

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

/* vite-imagetools query imports (queries end with &imagetools) */
declare module '*&as=srcset&imagetools' {
  const srcset: string;
  export default srcset;
}

declare module '*&as=meta&imagetools' {
  const meta: { src: string; width: number; height: number; format: string };
  export default meta;
}
