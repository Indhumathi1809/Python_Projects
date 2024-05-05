// pages/api/auth/[...nextauth].js

import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  providers: [
    Providers.Credentials({
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Implement your authentication logic here (e.g., check credentials against a database)
        if (credentials.username === 'admin' && credentials.password === 'password') {
          return Promise.resolve({ id: 1, name: 'Admin' });
        } else {
          return Promise.resolve(null);
        }
      },
    }),
  ],
  pages: {
    signIn: '/signin', // Redirect to custom sign-in page
    signOut: '/signout', // Redirect to custom sign-out page
    error: '/error', // Redirect to custom error page
    newUser: null, // Do not allow new user registration
  },
});
