import { useState } from 'react'
import { storage, uploadFile } from '../config/firebase'
import { getStorage , ref , listAll , getDownloadURL } from 'firebase/storage';
import { async } from '@firebase/util';


function FileUpload() {
    const [file, setFile] = useState(null);
    const [ImagenSubida, setImagenSubida] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await uploadFile(file)
            console.log(result)
            setImagenSubida(result)
        } catch (error) {
            console.log(error)
        }
    }

    const getFilesStorage = async () =>{
    const listRef = ref(storage);

    const results = await listAll(listRef);

    console.log(results)

    }

    
getFilesStorage()

    return (
        <div className="grid grid-cols-2 gap-4 mx-5 my-5">
            <div>
                <form onSubmit={handleSubmit}>
                    <input type="file" onChange={(e) => setFile(e.target.files[0])}  className='mx-5 my-5'/>
                    <button className='mx-3 rounded-sm px-6 text-lg font-bold py-3 bg-black text-white'> upload</button>
                </form>
            </div>
            <div>
                <img className='w-1/2 sm:w-[300px]' id='img' src={ImagenSubida} />
                <hr className='bg-gray-900 h-[2px] my-10' />


            </div>
        </div>
    )
}

export default FileUpload
