import Link from 'next/link';

export default function ForbiddenPage() {
  return (
    <main className='flex h-full flex-col items-center justify-center gap-2'>
      <h2 className='text-xl font-semibold'>403 Forbidden</h2>
      <p>Bạn không đủ quyền hạn hãy quay lại</p>
      <Link
        href='/'
        className='mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-black transition-colors hover:bg-blue-400'
      >
        Go Back Home
      </Link>
    </main>
  );
}
