// import { useState } from 'react';

export default function LoginForm() {

    return (
        <>
         <div  className="flex flex-col ml-[10%] ">
            <div className="flex-clo">
                <label className='txt text-[12px] desktop:text-[15px]'>Email</label>
                <div>

                <input
                    name='email'
                    id='email-input'
                    type='email'
                    className='border p-1 medium:w-[85%] medieum:w-[85%] medieum:h-[33px]  medium:text-sm text-xs h-7 max-w-6xl w-44 medium:h-[35px] rounded-lg border-black'
                    // value={email}
                    // onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                {/* {errors.email && <p className="text-red-500">{errors.email.join(', ')}</p>} */}
            </div>

            <div className='mt-[2%]'>
                <label className='txt text-[12px] desktop:text-[15px]'>Password</label>
                <div className="felx-col">
                <input
                    name='password'
                    id='password-input'
                    type='password'
                    className='border  w-42 h-7 medieum:w-[85%] medieum:h-[33px] rounded-lg border-black'
                    // value={password}
                    // onChange={(e) => setPassword(e.target.value)}
                    />
                    </div>
                {/* {errors.password && <p className="text-red-500">{errors.password.join(', ')}</p>} */}
            </div>

         </div>
        </>
    );
}




































// import { z } from 'zod'
// import { useState } from 'react'


// const login = z.object({
//     email: z.string().email("Invalid email address").nonempty("Email is required"),
//     password: z.string().nonempty("password is required")
// })
// export default function Input(){

//     const loginForm = () =>{
//         const [email, setEmail] = useState('');
//         const [password, setPassword] = useState('');
//         const [errors, setErrors] = useState({});
//     const handleSubmit = async (e) => {
//         e.preventDefault();
    
//         try{
//             await login.parseAsync({email, password})
//         }
//         catch (err){
//             if (err instanceof z.ZodError) {
//                 const formattedErrors = err.flatten().fieldErrors;
//                 setErrors(formattedErrors);
//               }
//         }   
//     }
//     };

//     return (
//         <>
//         <form onSubmit={handleSubmit}>

//             <div className=' flex-col ml-[10%]'>
//                   <div >
//                       <span>
//                           <label className='txt text-[14px]'>Email</label>
//                       </span>
//                   </div>
//                   <div>
//                       <span>
//                           <input type='email' className='border medieum:w-[85%] medieum:text-sm  text-xs h-7 w-[88%]  medieum:h-[35px] rounded-lg border-black'></input>
//                       </span>
//                   </div>
//               </div>
//               <div className='mt-[2%] flex-col ml-[10%]'>
//                   <div >
//                       <span>
//                           <label  className='txt   text-[14px]'>Password</label>
//                       </span>
//                   </div>
//                   <div>
//                       <span>
//                           <input type='password' className='border medieum:w-[85%] medieum:h-[35px] h-7  rounded-lg border-black'></input>
//                       </span>
//                   </div>
//             </div>
//         </form>

//         </>
//     );
// }