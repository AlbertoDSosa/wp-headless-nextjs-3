import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { AUTH_SECRET } from '@/utils/constants';
import { wpAuth } from '@/services/wp-auth';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials) {
        return await wpAuth(credentials);
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 7,
  },
  pages: {
    signIn: '/signin',
    error: '/signin',
  },
  secret: AUTH_SECRET,
  logger: {
    error(error) {
      console.error('error-type', error.type);
      console.error('error-message', error.message);
    },
    warn(code, ...message) {
      console.log('log-warn', { code, message });
    },
    debug(code, ...message) {
      console.log('log-debug', { code, message });
    },
  },
});
