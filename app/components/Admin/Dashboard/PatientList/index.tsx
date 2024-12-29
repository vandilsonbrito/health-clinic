import React from 'react'
import './styles.css';
import { IoPersonCircleOutline, IoSearch } from "react-icons/io5";
import { BsFillPeopleFill } from "react-icons/bs";


export default function PatientList() {
  return (
    <main className='w-full h-full flex flex-col items-center justify-center '>
        <div className='w-full p-2 xl:p-5 mt-1 xl:mt-0 flex items-center justify-center gap-4 font-medium text-2xl bg-blue-100 text-blueSecundary'>
            <BsFillPeopleFill className='text-2xl xl:text-4xl' />
            <h1>Pacientes Cadastrados</h1>
        </div>
        <div className="w-full h-full flex items-center justify-center p-5 mt-5 border-[1px] border-[#e9f1f8da]">
            <div className='w-[50rem] h-full flex flex-col items-center justify-center gap-5 p-3'>
                <div className="w-full h-full flex items-center justify-center">
                    <form className='w-full h-full flex justify-center items-center'>
                        <div className="w-1/2 h-full flex justify-center items-center gap-2 bg-[#e9f1f8da] rounded-md py-2 px-3">
                            <IoSearch className='text-xl'/>
                            <input 
                                className='w-full h-full bg-[#e9f1f8da] rounded-md p-2'
                                type="text" 
                                name="" 
                                id="" 
                                />
                        </div>
                    </form>
                </div>
                <div className="w-full h-full max-h-[28rem] overflow-y-auto bg-[#e9f1f8da] p-5 rounded-md patient-list-container">
                    <table className='w-full h-full'>
                        <thead className='text-slate-600 font-medium'>
                            <tr>
                                <th className='pb-2'> Nome</th>
                                <th className='pb-2'>Gênero</th>
                                <th className='pb-2'>Data de Nascimento</th>
                                <th className='pb-2'>Idade</th>
                            </tr>
                        </thead>
                        <tbody className='text-sm font-medium'>
                            <tr>
                                <td className='flex items-center justify-center gap-2'>
                                    <IoPersonCircleOutline />
                                    John Doe
                                </td>
                                <td>Masculino</td>
                                <td>1990-01-01</td>
                                <td>29 anos</td>
                            </tr>
                            <tr>
                                <td className='flex items-center justify-center gap-2'>
                                    <IoPersonCircleOutline />
                                    John Doe
                                </td>
                                <td>Masculino</td>
                                <td>1990-01-01</td>
                                <td>29 anos</td>
                            </tr>
                            <tr>
                                <td className='flex items-center justify-center gap-2'>
                                    <IoPersonCircleOutline />
                                    John Doe
                                </td>
                                <td>Masculino</td>
                                <td>1990-01-01</td>
                                <td>29 anos</td>
                            </tr>
                            <tr>
                                <td className='flex items-center justify-center gap-2'>
                                    <IoPersonCircleOutline />
                                    John Doe
                                </td>
                                <td>Masculino</td>
                                <td>1990-01-01</td>
                                <td>29 anos</td>
                            </tr>
                            <tr>
                                <td className='flex items-center justify-center gap-2'>
                                    <IoPersonCircleOutline />
                                    John Doe
                                </td>
                                <td>Masculino</td>
                                <td>1990-01-01</td>
                                <td>29 anos</td>
                            </tr>
                            <tr>
                                <td className='flex items-center justify-center gap-2'>
                                    <IoPersonCircleOutline />
                                    John Doe
                                </td>
                                <td>Masculino</td>
                                <td>1990-01-01</td>
                                <td>29 anos</td>
                            </tr>
                            <tr>
                                <td className='flex items-center justify-center gap-2'>
                                    <IoPersonCircleOutline />
                                    John Doe
                                </td>
                                <td>Masculino</td>
                                <td>1990-01-01</td>
                                <td>29 anos</td>
                            </tr>
                            <tr>
                                <td className='flex items-center justify-center gap-2'>
                                    <IoPersonCircleOutline />
                                    John Doe
                                </td>
                                <td>Masculino</td>
                                <td>1990-01-01</td>
                                <td>29 anos</td>
                            </tr>
                            <tr>
                                <td className='flex items-center justify-center gap-2'>
                                    <IoPersonCircleOutline />
                                    John Doe
                                </td>
                                <td>Masculino</td>
                                <td>1990-01-01</td>
                                <td>29 anos</td>
                            </tr>
                            <tr>
                                <td className='flex items-center justify-center gap-2'>
                                    <IoPersonCircleOutline />
                                    John Doe
                                </td>
                                <td>Masculino</td>
                                <td>1990-01-01</td>
                                <td>29 anos</td>
                            </tr>
                            <tr>
                                <td className='flex items-center justify-center gap-2'>
                                    <IoPersonCircleOutline />
                                    John Doe
                                </td>
                                <td>Masculino</td>
                                <td>1990-01-01</td>
                                <td>29 anos</td>
                            </tr>
                            <tr>
                                <td className='flex items-center justify-center gap-2'>
                                    <IoPersonCircleOutline />
                                    John Doe
                                </td>
                                <td>Masculino</td>
                                <td>1990-01-01</td>
                                <td>29 anos</td>
                            </tr>
                            <tr>
                                <td className='flex items-center justify-center gap-2'>
                                    <IoPersonCircleOutline />
                                    John Doe
                                </td>
                                <td>Masculino</td>
                                <td>1990-01-01</td>
                                <td>29 anos</td>
                            </tr>
                            <tr>
                                <td className='flex items-center justify-center gap-2'>
                                    <IoPersonCircleOutline />
                                    John Doe
                                </td>
                                <td>Masculino</td>
                                <td>1990-01-01</td>
                                <td>29 anos</td>
                            </tr>
            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </main>
  )
}
