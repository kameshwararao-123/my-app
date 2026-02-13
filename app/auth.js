import NextAuth from 'next-auth';
import CredentialsPovider from 'next-auth/providers/credentials';
import userModel from './utils/models/user';

export const { auth, signIn, signOut, handlers: { GET, POST } } = NextAuth({
    providers: [
        CredentialsPovider({
            name: "credentials",

            async authorize(credentials) {
                const user = await userModel.findOne({ email: credentials?.email });
                if (!user) {
                    return null;
                }
                if (credentials?.password !== user.password) {
                    return null;
                }
                return {
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    userid: user._id.toString()   // 🔥 FIXED HERE
                };
            }
        })
    ],
    secret: process.env.SECRET_KEY,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.name = user.name,
                    token.email = user.email,
                    token.userid = user.userid,
                    token.role = user.role
            }
            return token;
        },
        async session({ session, token }) {
            session.user = {
                name: token.name,
                email: token.email,
                id: token.userid,
                role: token.role
            };
            return session;
        }

    }

})