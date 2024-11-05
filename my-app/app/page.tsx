"use client"

import  Link  from 'next/link'



export default function Home() {
  return(
    <>
      <div className="flex bg-[url('../components/background.jpg')]  bg-cover bg-center bg-fixed justify-center items-center w-screen h-screen">
          <div className=" border-double border-4  bg-black  m:w-[600px] m:h-[700px] bg-[url('../components/bg-card.jpg')] bg-cover bg-center bg-fixed  m:space-y-5  l:h-[830px] l:w-[730px] min-w-[280px] max-h-[1000px] h-96 w-44 rounded-lg flex-col aspect-[2/1]">
                    <div className='mt-10 m:mt-20'>
                      <span className='txt flex justify-center text-white mt-5 m:text-4xl l:text-6xl text-2xl'>
                          WELCOM
                      </span>
                      <span className='txt  flex justify-center text-white m:text-3xl l:text-5xl text-1xl'>
                        TO
                      </span>
                  </div>
                    <span className=' txt  flex justify-center animate-bounce l:text-7xl text-white mt-[4%] text-3xl m:text-5xl hover:text-red-600'>
                        PING PONG
                    </span>
                   <div>
                   <div className="relative min-w-[200px] w-48 m:w-96 m:h-64 l:w-[550px] l:h-[350px] border-y  aspect-[2/1] m-auto  border-black rounded-lg">
                          <div>
                            <span className="absolute m:h-14 m:w-2  top-0 bg-white h-6 w-1 l:h-16 l:w-2 animate-p1"></span>
                          </div>
                          <div>
                            <span className="absolute m:h-14 m:w-2 right-1 top-[8.7rem] bg-white h-6 w-1 l:h-16 l:w-2  animate-p2"></span>
                          </div>
                          <div>
                            <span className="absolute top-12 left-24 m:ml-[90px] m:mt-[70px] l:size-4 l:mt-[100px] l:ml-[180px] m:size-3  rounded-full animate-bounce bg-white size-2"></span>
                          </div>
                      </div>
                  </div>
                  <div className='mt-7  flex justify-center'>
                    <div className='flex-clo space-y-3 m:mt-4 l:mt-10'>
                      <div className='flex justify-center space-x-5 m:space-x-6'>
                          <div>
                            <Link href='Auth/register'>

                              <button className='bg-blue text-white min-w-16 m:w-28 m:h-8 m:text-base l:w-36 l:h-9 l:text-lg w-16  hover:border-red-500 hover:border-3  text-xs p-0.5  txt border rounded-md '
                                 >
                                 Sign Up
                               </button>
                            </Link>
                          </div>
                          <div>
                            <Link href='Auth/login'>
                                <button className='bg-blue m:w-28 m:h-8 text-white min-w-16 w-16 m:text-base l:w-36 l:h-9 l:text-lg  hover:border-red-500 hover:border-3 text-xs p-0.5  txt border rounded-md' >
                                  Sign In
                                </button>
                            </Link>
                          </div>
                          
                    </div>
                    <div className='flex justify-center'>
                            <button className='bg-blue text-white m:w-48 m:h-8 min-w-16 w-36  m:text-base l:w-64 l:h-9  l:text-lg  hover:text-white hover:border-red-500 hover:border-3 text-xs p-0.5  txt border rounded-md' >
                              Sign In With Intra
                            </button>
                    </div>
                  </div>
                </div>
          </div>
      </div>
    </>
  );
}
