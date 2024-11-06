import { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';
import { env } from '@/env.mjs';
import isEqual from 'lodash/isEqual';
import { pagesOptions } from './pages-options';

export const authOptions: NextAuthOptions = {
  pages: {
    ...pagesOptions,
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 1 days
  },
  callbacks: {
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.idToken as string,
          name: token.name as string,
          access_token: token.access_token as string,
          token_type: token.token_type as string,
          
        },
      };
    },
    async jwt({ token, user }) {
      if (user && 'access_token' in user && 'token_type' in user) {
        // Store user information and token details in the token object
        token.idToken = user.id;
        token.access_token = user.access_token;
        token.name = user.name;
        token.token_type = user.token_type;
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl; // Use default baseUrl for redirection
    },
  },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any) {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/login`,
            {
              email: credentials?.email,
              password: credentials?.password,
            }
          );

          if (response.data && response.data.access_token) {
            return {
              id: response.data.access_token,
              email: credentials?.email,
              name: response.data.name,
              access_token: response.data.access_token,
              token_type: response.data.token_type,
            };
          }

          // Return null if login fails
          return null;
        } catch (error) {
          console.error('Login failed:', error);
          return null;
        }
      },
    }),
  ],
};
