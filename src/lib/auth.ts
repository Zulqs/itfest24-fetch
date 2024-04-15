import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./db";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: '/',
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
            nim: { label: "getNim", type: "text" }
            },
            async authorize(credentials) {
            if(!credentials?.nim) {
                return null;
            }
            const existingUser = await db.user.findUnique({
                where: { nim: credentials?.nim}
            });
            if(!existingUser) {
                return null;
            }

            return {
                id: existingUser.id,
                nim: existingUser.nim,
                nama: existingUser.nama + '',
                status: existingUser.status,
                divisi: existingUser.divisi,
                fakultas: existingUser.fakultas,
                prodi: existingUser.prodi,
                perwakilan: existingUser.perwakilan,
                angkatan: existingUser.angkatan,
            }
            }
        })
        ],

    callbacks: {
        async jwt({ token, user, }) {
            if(user) {
                const expirationTime = Math.floor(Date.now() / 1000) + 10;
                return { ...token,
                    expirationTime, 
                    nama: user.nama,
                    nim: user.nim,
                    status: user.status,
                    divisi: user.divisi,
                    fakultas: user.fakultas,
                    prodi: user.prodi,
                    perwakilan: user.perwakilan,
                    angkatan: user.angkatan,
                }
            }
            return token
            },
        async session({ session, token }) {
            if (
                token &&
                typeof token.expirationTime === 'number' &&
                token.expirationTime > Math.floor(Date.now() / 1000)
                ) {

            return {
                ...session,
                user: {
                    ...session.user,
                    nama: token.nama,
                    nim: token.nim,
                    status: token.status,
                    divisi: token.divisi,
                    fakultas: token.fakultas,
                    prodi: token.prodi,
                    perwakilan: token.perwakilan,
                    angkatan: token.angkatan,
                }
            };
            }
            return session
            },
        
    }
}