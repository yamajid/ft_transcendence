

"use client"

import { z } from 'zod'

const schema = z.object({
  first_name: z.string().min(4).nonempty(),
  last_name: z.string().min(4).nonempty(),
  email: z.string().email().nonempty(),
  password: z.string().min(7).nonempty(),
  confirm_password: z.string().min(7).nonempty(),
})

export default function Home() {

  
  const submit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData =  new FormData(e.currentTarget);
    const first_name = formData.get('first-name') as string;
    const last_name = formData.get('last-name') as string;
    const email = formData.get('email-input') as string;
    const password = formData.get('password-input') as string;
    const confirm_password = formData.get('confirm-password') as string;

    try {
        await schema.parseAsync({email,password, first_name, last_name, confirm_password});
        console.log('Form submitted successfully:', formData);
    } catch (err) {
        console.log('Validation failed:', err);
    }
  };
  return(
    <>
    <form onSubmit={submit}>

      <div className="flex bg-[url('../components/background.jpg')]  bg-cover bg-center bg-fixed justify-center items-center w-screen h-screen">
          <div className="border-double border-4 b bg-black  m:w-[400px] m:h-[620px] bg-[url('../components/bg-card.jpg')] bg-cover bg-center bg-fixed  m:space-y-5  l:h-[700px] l:w-[470px] min-w-[280px] max-h-[1000px] h-[500px] w-80 rounded-lg flex-col aspect-[2/1]">
                   <div>
                   <div className="relative min-w-[200px] mt-6 w-44 m:w-64 m:h-32 l:w-[350px] l:h-[180px] border-y  aspect-[2/1] m-auto  border-black rounded-lg">
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
                  <div className='flex-col space-y-2'>

                  <div className='flex justify-center'>
                        <div className='flex space-x-3 mt-5 '>
                        <div>
                          <span>
                            <label className='txt l:text-sm text-xs'>first name</label>
                          </span>
                          <div>
                            <span>
                              <input placeholder='first name' type='firstname' name='first-name' className='border p-2  text-xs h-7   text-1px  rounded-lg border-black l:w-36 m:h-8 m:w-32 w-24'></input>
                            </span>
                          </div>
                        </div>
                        <div>
                          <span>
                            <label className='txt l:text-sm  text-xs'>last name</label>
                          </span>
                          <div>
                            <span>
                              <input  placeholder='last name' type='lastname' name='last-name' className='border p-2 text-xs h-7 rounded-lg border-black l:w-36 m:h-8 m:w-32 w-24'></input>
                            </span>
                          </div>
                        </div>
                      </div>
                  </div>
                  
                  <div className='flex justify-center'>
                  
                  <div className='m:flex-col m:space-y-4 flex-col space-y-2 l:flex-col l:space-y-3'>
                  <div>
                      <label htmlFor="email-input"  className='txt m:text-sm text-xs'>Email</label>
                    <div>
                    <input
                        placeholder='enter your email'
                        type='email'
                        name='email-input'
                        className='border p-2 text-xs l:w-80 l:h-9 max-w-6xl w-52 m:w-72 m:h-8 h-7 rounded-lg border-black'
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
                        className='border text-xs p-2 w-52 h-7 l:w-80 l:h-9 m:w-72 m:h-8 rounded-lg border-black'
                        />
                        </div>
                </div>
                <div>
                    <label htmlFor="password-input" className='txt m:text-sm text-xs'> Confirm Password</label>
                    <div className="felx-col">
                    <input
                        placeholder='confirm your password'
                        type='password'
                        name='confirm-password'
                        className='border text-xs p-2 w-52 h-7 l:w-80 l:h-9 m:w-72 m:h-8 rounded-lg border-black'
                        />
                        </div>
                </div>
                  <div className='flex justify-center'>
                    <a className='text-xs txt m:text-sm' href='/Auth/login'> Already have an account?</a>
                  </div>
                </div>
                  </div>
                        </div>
                  <div className='mt-3 flex justify-center'>
                    <div className='flex-clo space-y-3 m:mt-4'>
                      <div className='flex justify-center space-x-5 m:space-x-6'>
                          <div>
                                <button type='submit' className='bg-blue m:w-48 m:h-8 text-white min-w-16 w-28 m:text-base l:w-64 l:h-9 l:text-lg  hover:border-red-500 hover:border-3 text-xs p-0.5  txt border rounded-md' >
                                  Sign Up
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



                          // <div>
                          //     <button className='bg-blue text-white min-w-16 m:w-28 m:h-8 m:text-base l:w-36 l:h-9 l:text-lg w-16  hover:border-red-500 hover:border-3  text-xs p-0.5  txt border rounded-md '
                          //        >
                          //        Sign Up
                          //      </button>
                          // </div>

// import { z } from 'zod'

// const schema = z.object({
//   email: z.string().email().nonempty(),
//   password: z.string().nonempty().min(10),
// })

// export default function Home() {

//   const submit = async (e: React.ChangeEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const formData =  new FormData(e.currentTarget);
//     const email = formData.get('email') as string;
//     const password = formData.get('password') as string;

//     try {
//       await schema.parseAsync({email,password});
//       console.log('Form submitted successfully:', formData);
//     } catch (err) {
//       console.log('Validation failed:', err);
//     }
//   };