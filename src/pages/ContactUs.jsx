import toast from "react-hot-toast";

import useAxiosSecure from "../hooks/useAxiosSecure";


const ContactUs = () => {
    
    const axiosSecure = useAxiosSecure()

    const handleFormSubmission=async e=>{
        e.preventDefault()
        const form = e.target
        const name= form.name.value
        const email = form.email.value
       
        const message = form.message.value
        const contactData = {name,email,message}
        console.table(contactData)

        try{
            const {data} = await axiosSecure.post(
                `/contacts`, contactData
            )
            console.log(data)
            toast.success('Your message has send successfully')
            e.target.reset()
            
        }catch(err){
            console.log(err)
            e.target.reset()
        }
    }
    return (
        <div>
             <div className="mt-10 relative">
          <img className="object-cover w-full min-h-screen h-[10vh]" src="https://dominique.com/cdn/shop/files/1_3c936020-d75a-4288-8db9-2de5a2f8bc1c.png?v=1687374335&width=940" alt="" />
          
          
          <div className="flex justify-center items-center">
            <p className="font-bold text-5xl capitalize mt-2 absolute  top-52 p-2 bg-white text-rose-700">Contact us</p>
          </div>
          </div>
          <div className="mt-20">
    <h2 className="text-xl underline font-semibold text-rose-700 capitalize dark:text-white text-center">Contact Us</h2>
            <section className="max-w-4xl p-6 mx-auto bg-white rounded-md  dark:bg-gray-800">

    <form onSubmit={handleFormSubmission}>
        <div className="grid grid-cols-1 gap-6 mt-4 ">
            <div>
                <label className="text-rose-700 dark:text-gray-200" >Name</label>
                <input id="username" name="name" required type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>
            </div>

            <div>
                <label className="text-rose-700 dark:text-gray-200" >Email Address</label>
                <input id="emailAddress" name="email" required type="email" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>
            </div>

            <div>
                <label className="text-rose-700 dark:text-gray-200">Message</label>
                <textarea id="text" name="message" required type="text" className="block w-full h-[40vh] px-4 py-5 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>
            </div>

            
        </div>

        <div className=" mt-16">
            <button className="px-8 py-2.5 h-[10vh] leading-5 text-white font-bold transition-colors duration-300 transform bg-rose-700 outline outline-1 hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Send</button>
        </div>
    </form>
</section>
          </div>
            
        </div>
    );
};

export default ContactUs;