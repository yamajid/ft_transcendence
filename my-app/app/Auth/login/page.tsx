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

      <div className=" flex bg-[url('../components/background.jpg')] bg- bg-cover bg- bg-center bg-fixed justify-center items-center w-screen h-screen">
          <div className=" border-double border-4 bg-black  m:w-[400px] m:h-[500px] bg-[url('../components/bg-card.jpg')] bg-cover bg-center bg-fixed  m:space-y-5  l:h-[600px] l:w-[470px] min-w-[280px] max-h-[1000px] h-96 w-44 rounded-lg flex-col aspect-[2/1]">
                   <div>
                   <div className="relative min-w-[200px] mt-6 w-32 m:w-64 m:h-32 l:w-[350px] l:h-[200px] border-y  aspect-[2/1] m-auto  border-black rounded-lg">
                          <div>
                            <span className="absolute m:h-8 m:w-2  top-0 bg-white h-6 w-1 l:h-14 l:w-2 animate-p1"></span>
                          </div>
                          <div>
                            <span className="absolute m:h-8 m:w-2 right-1 top-[8.7rem] bg-white h-6 w-1 l:h-14 l:w-2  animate-p2"></span>
                          </div>
                          <div>
                            <span className="absolute top-12 left-24 m:ml-8 m:mt-4 l:size-4 l:mt-10 l:ml-20  m:size-3  rounded-full animate-bounce bg-white size-2"></span>
                          </div>
                      </div>
                  </div>
                  <div className='flex justify-center'>
                  <div className='mt-7 m:flex-col m:space-y-3 l:flex-col l:space-y-3'>
                  <div>
                      <label htmlFor="email-input"  className='txt m:text-sm text-xs'>Email</label>
                      <div>
                      <input
                          placeholder='enter your email'
                          type='email'
                          name='email-input'
                          className='border p-2 text-xs l:h-9 max-w-6xl w-52 m:w-72 m:h-8 h-7 rounded-lg border-black'
                          />
                      </div>
                </div>  
                <div>
                    <label htmlFor="password-input" className='txt m:text-sm text-xs'>Password</label>
                    <div className="felx-col">
                    <input
                        placeholder='enter your password'
                        type='password'
                        name='password-input'
                        className='border text-xs p-2 w-52 h-7 l:h-9 m:w-72 m:h-8 rounded-lg border-black'
                        />
                        </div>
                </div>
                <div className='flex justify-center mt-2'>
                    <a className='text-xs txt m:text-sm' href='/Auth/register'> Create new account?</a>
                  </div>
                </div>
                  </div>
                  <div className='mt-3 flex justify-center'>
                    <div className='flex-clo space-y-3  m:mt-4'>
                      <div className='flex justify-center space-x-5 m:space-x-6'>
                          <div>
                                <button type='submit' className='bg-blue m:w-48 m:h-8 text-white min-w-16 w-28 m:text-base l:w-64 l:h-9 l:text-lg  hover:border-red-500 hover:border-3 text-xs p-0.5  txt border rounded-md' >
                                  Sign In
                                </button>
                          </div>
                          
                    </div>
                    <div className='flex justify-center'>
                            <button className='bg-blue text-white m:w-48 m:h-8 min-w-16 w-28  m:text-base l:w-64 l:h-9  l:text-lg  hover:text-white hover:border-red-500 hover:border-3 text-xs p-0.5  txt border rounded-md' >
                              Sign In With Intra
                            </button>
                    </div>
                  </div>
                </div>
          </div>
      </div>
      </form>
    </>
  );
}
