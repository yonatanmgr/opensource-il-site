import React from 'react';

type Props = {
  children: React.ReactNode;
};

/**
 * a generic page wrapper
 *
 * @param {Props} { children }
 * @return {React.ReactNode}
 */
function PageContainer({ children }: Props) {
  return (
    <main className="flex max-h-screen min-h-screen flex-col items-center justify-between gap-4 p-6 pb-0 sm:p-8 sm:pb-0 md:p-16 md:pb-0">
      {children}
    </main>
  );
}

export default PageContainer;
