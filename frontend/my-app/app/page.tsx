"use client"

import  Link  from 'next/link'



export default function Home() {
  return(
    <>
      <div className="flex  bg-black justify-center items-center w-screen h-screen">
          <div className=" border-double border-4  bg-black  m:w-[600px] m:h-[700px]  m:space-y-5  l:h-[830px] l:w-[730px] min-w-[280px] max-h-[1000px] h-96 w-44 rounded-lg flex-col aspect-[2/1]">

                   <div>
                   <div className="relative min-w-[200px] w-48 m:w-96 m:h-64 l:w-[550px] l:h-[350px] border-y  aspect-[2/1] m-auto  border-black rounded-lg">
                          <div>
                            <span className="absolute m:h-24 m:w-4 m:border-4 top-0 border-2 border-red-500 h-14 w-2 l:h-28 l:w-4 animate-p1"></span>
                          </div>
                          <div>
                            <span className="absolute m:h-24 m:w-4 m:border-4 right-1 top-[8.7rem] border-2 border-blue-500 h-14  w-2 l:h-28 l:w-4  animate-p2"></span>
                          </div>
                    </div>

                  </div>
                  <div className=' flex justify-center'>
                    <div className='flex-clo m:space-y-10 space-y-5'>                     
                          <div className=''>
                            <span className=' txt  flex justify-center animate-bounce l:text-6xl text-white text-2xl m:text-5xl hover:text-red-600'>PING PONG</span>
                          </div>
                          <div className='flex-col justify-center space-y-2'>
                                  <div className='flex justify-center'>
                                    <Link href='/Auth/login'>
                                      <button className='bg-blue text-white min-w-16 m:w-32 m:h-14 m:text-xl l:w-40 l:h-13 l:text-1xl w-24 h-10 hover:border-4 hover:border-3  text-sm p-0.5  txt border rounded-md '>
                                         LOG-IN
                                       </button>
                                    </Link>
                                  </div>
                                  <div className='flex justify-center'>
                                    <Link href='/Auth/register'>
                                        <button className='bg-blue m:w-32 m:h-14 text-white min-w-16 w-24 h-10 m:text-xl l:w-40 l:h-13 l:text-1xl  hover:border-4 hover:border-3 text-sm p-0.5  txt border rounded-md' >
                                          REGISTER
                                        </button>
                                    </Link>
                                  </div>
                          </div>
                  </div>
                </div>
          </div>
      </div>
    </>
  );
}


// <Link href=''>
//     <button className='bg-blue text-white m:w-48 m:h-8 min-w-16 w-36  m:text-base l:w-64 l:h-9  l:text-lg  hover:text-white hover:border-red-500 hover:border-3 text-xs p-0.5  txt border rounded-md' >
//       Sign In With Intra
//     </button>
// </Link>