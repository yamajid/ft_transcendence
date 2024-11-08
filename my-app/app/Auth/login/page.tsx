"use client"

import { z } from 'zod'

const schema = z.object({
  email: z.string().email().nonempty(),
  password: z.string().min(7).nonempty(),
})
  
  
  export default function Home() {
  const submit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData =  new FormData(e.currentTarget);
    const email = formData.get('email-input') as string;
    const password = formData.get('password-input') as string;

    try {
      await schema.parseAsync({email,password});
      console.log('Form submitted successfully:', formData);
    } catch (err) {
      console.log('Validation failed:', err);
    }
  };
  return(
    <>
    <form onSubmit={submit}>

      <div className=" flex justify-center bg-black items-center w-full h-screen">
          <div className=" border-double border-4 bg-black  min-w-[280px] max-h-[1000px] h-96 w-44 m:w-[500px] m:h-[600px] rounded-lg flex-col  aspect-[2/1]">

                   <div className="relative w-48 flex-col space-y-14 aspect-[2/1] m-auto m:m-24  border-black rounded-lg">


                          <div>
                            <span className="absolute m:h-24 m:w-4 m:border-4 right-52 m:right-60  border-2 border-red-500 h-14 w-2  animate-p1"></span>
                          </div>




                          <div>
                            <span className="absolute m:h-24 m:w-4 m:border-4 left-52 m:left-80 border-2 border-blue-500 h-14  w-2 l:h-28 l:w-4  animate-p2"></span>
                          </div>


                          <div className='h-36 flex-col space-y-20 m:space-y-32 m:w-72'>
                                  <div>
                                  <span className=' txt  flex justify-center animate-bounce  text-white text-2xl m:text-4xl  hover:text-red-600'>LOG - IN</span>
                                  </div>
                                <div className='flex-col space-y-4'>

                                    <div>
                                      <input type="email" name="email-input" className='border-2 border-black m:text-sm hover:border-red-500 h-8 w-full m:h-11  m:w-full p-2 text-xs rounded-s-md m:placeholder:text-sm placeholder:text-xs placeholder:p-1' placeholder='username'/>
                                    </div>

                                    <div>
                                      <input type="password" name="password-input" className='border-2 border-black m:text-sm hover:border-red-500 h-8 w-full p-2 m:h-11 m:w-full text-xs rounded-s-md m:placeholder:text-sm placeholder:text-xs placeholder:p-1' placeholder='Password'/>
                                    </div>
                                    <div className='flex-col space-y-1 m:space-y-2'>

                                            <div className='flex justify-center'>
                                               <button type='submit' className='bg-blue text-white min-w-16 w-36 h-7 m:h-10 m:w-48 m:text-xl hover:border-2 hover:border-3  text-xs p-0.5  txt border rounded-s-md '>
                                                  LOG - IN
                                               </button>
                                            </div>
                                            <div className='flex justify-center'>
                                               <button type='submit' className='bg-blue text-white min-w-16 w-36 h-7 m:h-10 m:w-48 m:text-xl hover:border-2 hover:border-3  text-xl p-0.5  txt border rounded-s-md '>
                                                  42
                                               </button>
                                            </div>
                                    </div>
                                </div>
                          </div>
                  </div>

          </div>
      </div>
      </form>
    </>
  );
}

                            // <div className='flex-col space-y-3'>

                            // </div>