import React, { useState } from 'react'
import zoro from '../assets/zoro2.jpg'
import katanalgas from '../assets/katanalgas.png'
import { firApp } from '../config/firebase'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider , signInWithRedirect } from 'firebase/auth'
import Swal from 'sweetalert2'

const auth = getAuth(firApp);
const provider = new GoogleAuthProvider();

const Formulario = () => {
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [estaRegistrando, setEstaRegistrando] = useState(null);

    const handleClick = (e) => {
        e.preventDefault();

        if (estaRegistrando) {
            createUserWithEmailAndPassword(auth, Email, Password).then((user) => {
                console.log(user)
                Swal.fire({
                    title: 'Congrats!',
                    text: 'Your account has been created successfully',
                    icon: 'success',
                    confirmButtonText: 'Next Step',
                    color: 'primary',
                })
                setEmail('');
                setPassword('');
                setEstaRegistrando(!estaRegistrando)
            }).catch((error) => {
                console.log(error.code)
            })
        } else {
            signInWithEmailAndPassword(auth, Email, Password).then((user) => {
                console.log(user.user)
            }).catch((error) => {
                console.log(error.code)
            })

        }
    }

    const handleGoogleLogin = () => {
        signInWithRedirect(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;

                console.log(user)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);

                console.log(errorCode , errorMessage, email , credential)
                // ...
            });
    }

    return <section className='bg-gray-50 min-h-screen flex items-center justify-center my-2'>

        <div className='bg-gray-200 flex rounded-2xl shadow-lg max-w-3xl p-5'>

            {  /*FORM */}
            <div className='md:w-1/2 px-8'>
                <h2 className='font-bold text-5xl'> {estaRegistrando ? 'Register' : 'Login'} </h2>
                <p className='text-sm mt-5'> {estaRegistrando ? 'If you already a client please login' : ''} </p>

                <form className='flex flex-col gap-4' onSubmit={handleClick}>
                    <input className='p-2 mt-8 rounded-xl border' type="email" placeholder='Enter Your Email' value={Email} onChange={(e) => setEmail(e.target.value)} />
                    <div className='relative'>
                        <input className='p-2 mt-4 rounded-xl border w-full' type="password" placeholder='Enter Your Password' value={Password} onChange={(e) => setPassword(e.target.value)} />

                    </div>
                    <button className='bg-[#77C390] text-dark rounded-xl py-2 hover:scale-110 duration-300'> {estaRegistrando ? 'Create New Account' : 'Login'} </button>
                </form>

                <div className='mt-10 grid grid-cols-3 items-center text-gray-500'>
                    <hr className='border-gray-500' />
                    <p className='text-center text-sm'>Or</p>
                    <hr className='border-gray-500' />
                </div>

                <button onClick={() => handleGoogleLogin()} className='bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center hover:scale-110 duration-300 hover:bg-gray-300'>
                    Log In With Google
                </button>

                {estaRegistrando ? <p className='mt-5 text-xs border-b border-gray-500 py-6'>Forgot Ur Password?</p> : ''}

                <div className='mt-3 text-xs flex justify-between items-center mt'>

                    <p> {estaRegistrando ? '' : 'If you Dont Have An Account'} </p>
                    <button onClick={() => setEstaRegistrando(!estaRegistrando)} className='py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300 hover:bg-gray-300'> {estaRegistrando ? 'Log In' : 'Register'} </button>

                </div>

            </div>
            <div className='md:block hidden w-1/2'>
                <img className='rounded-2xl hover:scale-[110%] transition duration-500 cursor-pointer' src={estaRegistrando ? katanalgas : zoro} alt="" />
            </div>
        </div>
    </section>
}

export default Formulario