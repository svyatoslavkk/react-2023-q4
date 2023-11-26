import Link from 'next/link';

export default function ErrorPage() {
  return (
    <div className="error-boundary-block">
      <h2 className="error-boundary-title">Something went wrong</h2>
      <Link href="/">Reload</Link>
    </div>
  );
}
