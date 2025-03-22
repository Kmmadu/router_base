import Link from 'next/link';

export default function Welcome() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome</h1>
      <p className="text-lg mb-8">Get started with your account</p>
      <div className="space-x-4">
        <Link href="/signup">
          <button className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">
            Sign up
          </button>
        </Link>
        <Link href="/login">
          <button className="bg-purple-500 text-white px-6 py-2 rounded hover:bg-purple-600">
            Sign in
          </button>
        </Link>
      </div>
    </div>
  );
}