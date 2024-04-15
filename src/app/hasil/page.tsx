import React from "react";
import { authOptions } from '@/lib/auth';
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Hasil = async () => {
    const session = await getServerSession(authOptions);
    console.log(session);
    if (!session?.user.nim) {
        redirect("/");
    }
    

    return (
        <div className="flex h-screen xl:px-60 lg:px-36 md:px-5 2xl:px-96">
            <div className="flex flex-col bg-white bg-opacity-10 rounded-sm m-auto">
                <div className={`flex flex-col md:flex-row justify-between px-5 py-6 md:bg-gradient-to-r bg-gradient-to-bl ${session?.user.status ? "from-[#e7ae04]" : "from-red-700" } to-black`}>
                    <div className="flex flex-col">
                        <p className={`text-white my-auto font-bold ${session?.user.status ? 'text-lg' : 'text-2xl'}`}>{session?.user.status ? "SELAMAT! ANDA DINYATAKAN LULUS SELEKSI IT FEST 2024" : "MAAF! ANDA DINYATAKAN TIDAK LULUS SELEKSI IT FEST 2024" }</p>
                        <p className="font-light text-white text-sm mr-8">{session?.user.status ? "" : `Sebaik-baiknya orang yang tidak berhasil adalah orang yang belajar untuk menang di kesempatan berikutnya. ~Carl Sandburg`}</p>
                    </div>
                    <a className='font-extrabold text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#FBBC04] md:via-white to-[#ACA6F8]'>IT FEST</a>
                </div>
                <div className="flex flex-row justify-between px-5">
                    <div className="flex flex-col text-white my-4">
                        <p className="font-bold text-sm">NIM {session?.user.nim}</p>
                        <p className="font-bold text-3xl my-1">{session?.user.nama}</p>
                        <p className="font-light">
                        {session?.user.divisi ? `DIVISI ${session?.user.divisi}` : ''}
                        </p>
                    </div>
                </div>
                <div className="flex px-5">
                    <div className="flex flex-1">
                        <div className="flex flex-col flex-1 text-white text-xs font-bold">
                            <div className="flex flex-row ">
                                <div className="flex flex-col flex-1">
                                    <p className="text-[#e7ae04]">Perwakilan</p>
                                    <p className="text-sm">{session?.user.perwakilan}</p>
                                </div>
                                <div className="fledx flex-col flex-1">
                                    <p className="text-[#e7ae04]">Fakultas</p>
                                    <p className="text-sm">{session?.user.fakultas}</p>
                                </div>
                            </div>
                            <div className="flex flex-row mt-3">
                                <div className="flex flex-col flex-1">
                                    <p className="text-[#e7ae04]">Program Studi</p>
                                    <p className="text-sm">{session?.user.prodi}</p>
                                </div>
                                <div className="flex flex-col flex-1">
                                    <p className="text-[#e7ae04]">Angkatan</p>
                                    <p className="text-sm">{session?.user.angkatan}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-white px-5">
                    <p className="opacity-30 text-xs mt-8">
                    {session?.user.status ? "Status penerimaan Anda sebagai panitia telah ditetapkan melalui verifikasi berkas dan wawancara. Kami ucapkan selamat atas keberhasilan Anda dan kami berharap Anda dapat bertanggung jawab mengikuti kepanitiaan IT FEST 2024 sampai akhir." 
                    : "Putusan hasil kepanitiaan telah melewati verifikasi berkas dan wawancara" }
                    </p>
                    <h1 className="font-bold text-lg mt-2 mb-5 tracking-widest">MAKE YOUR MARK ON IT FEST 2024</h1>
                </div>
            </div>
            
        </div>
    );
}

export default Hasil;
