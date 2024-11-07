import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import ProfileForm from './ProfileForm';

export default function UpdateProfile() {

    return (
        <div className='w-full h-full'>
            <div className='w-full p-2 xl:p-5 mt-1 xl:mt-0 flex items-center justify-center gap-4 font-medium text-2xl bg-blue-100 text-blueSecundary'>
                <FaUserCircle className='text-2xl xl:text-4xl' />
                <h1>Atualizar Perfil</h1>
            </div>

            <div className="w-full h-full border mt-5 py-3 flex justify-center items-center">
                <ProfileForm/>
            </div>
        </div>
    )
}
