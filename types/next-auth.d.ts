import NextAuth from "next-auth"

declare module "next-auth" {
    interface User {
        nama: string,
        nim: string, 
        status: boolean,
        divisi: string,
        fakultas: string,
        prodi: string,
        perwakilan: string,
        angkatan: string,
    }
    interface Session {
        user: User & {
            nama: string,
            nim: string, 
            status: boolean,
            divisi: string,
            fakultas: string,
            prodi: string,
            perwakilan: string,
            angkatan: string,
        }
        token: {
            nama: string,
            nim: string, 
            status: boolean,
            divisi: string,
            fakultas: string,
            prodi: string,
            perwakilan: string,
            angkatan: string,
        }
    }
    
}