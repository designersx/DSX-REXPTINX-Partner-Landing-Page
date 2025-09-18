// 'use client';

// import { useEffect } from 'react';

// // next
// import { useRouter } from 'next/navigation';
// import { useSession } from 'next-auth/react';

// // project-imports
// import Loader from 'components/Loader';

// // types
// import { GuardProps } from 'types/auth';

// // ==============================|| AUTH GUARD ||============================== //

// export default function AuthGuard({ children }: GuardProps) {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   useEffect(() => {


//     // eslint-disable-next-line
//   }, [session]);

//   if (status == 'loading' || !session?.user) return <Loader />;

//   return <>{children}</>;
// }
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Loader from 'components/Loader';
import { isTokenValid } from 'utils/auth';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const tokenValid = isTokenValid();

    if (!tokenValid) {
      alert('Session expired. Please login again.');
      localStorage.removeItem('authToken');
      router.push('/login');
    } else {
      setIsChecking(false);
    }
  }, [router]);

  if (isChecking) return <Loader />;

  return <>{children}</>;
}
