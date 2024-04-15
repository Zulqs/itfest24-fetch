"use client";
import React from "react";
import * as z from "zod";
import {signIn} from "next-auth/react";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";

const FormSchema = z.object({
    nim: z.string().min(1, 'Nim Diperlukan'),
    });

const Getdata = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            nim: '',},
    });
    
    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        const signIndata = await signIn('credentials', {
        nim: values.nim,
        redirect: false,
        });
        
        if (signIndata?.error) {
            console.log(signIndata.error);
        } else {
            router.push('/hasil');
        }
    };
    return (
        <div className="flex h-screen">
                <form onSubmit={form.handleSubmit(onSubmit)} className='bg-white bg-opacity-10 rounded px-8 pt-6 pb-8 m-auto'>
                    <div className='text-white'>
                        <a className='font-extrabold text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#FBBC04] via-white to-[#ACA6F8]'>IT FEST</a>
                        <div className='mt-3 mb-4'>
                            <p className='font-bold text-3xl'>HASIL SELEKSI IT FEST 2024</p>
                            <p className='text-xs opacity-60'>Masukkan NIM anda untuk melihat hasil.</p>
                        </div>
                    </div>
                    <div>
                        <label className='text-white text-sm font-semibold'
                        htmlFor="">Nomor Induk Mahasiswa</label>
                        <input type="text"
                        className='bg-white placeholder:text-sm placeholder:font-normal font-bold bg-opacity-20 mt-2 inpu appearance-none rounded w-full py-2 px-3 text-white text-opacity-100 leading-tight border border-none focus:shadow-outline focus:border-white focus:border' 
                        required name="nim"
                        placeholder='Nomor Induk Mahasiswa IPB University'
                        {...form.register('nim')}/>
                    </div>
                    <div className='flex flex-row mt-6'>
                        <button id='hasil' 
                        className='bg-[#FBBC04] rounded-full p-2 text-xs font-bold text-[#413101] py-2 px-3'
                        type='submit'>
                            LIHAT HASIL SELEKSI</button>
                        <p className='text-[10px] text-[#7a74c9] mt-auto ml-auto'>PENGUMUMAN HASIL SELEKSI IT FEST 2024</p>
                    </div>
                </form>
        </div>
    )
}

export default Getdata