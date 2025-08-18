'use client';
import Link from 'next/link';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <Link
          href='/dashboard/invoices'
          className='mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400'
        >
          Go Back
        </Link>
      </body>
    </html>
  );
}
