// pages/index.js

import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Welcome to the Attendance System</h1>
      <Link href="/attendance">
        <a>Manage Attendance</a>
      </Link>
    </div>
  );
}
