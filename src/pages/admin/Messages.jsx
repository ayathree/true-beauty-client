import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
import {  RiDeleteBin7Fill } from "react-icons/ri";
import Swal from "sweetalert2";
import axios from "axios";

const Messages = () => {
    const { user } = useAuth();
    // const axiosSecure = useAxiosSecure();
    const [contacts, setContacts] = useState([]);
     const [isExpanded, setIsExpanded] = useState(false);
     const[isLoading,setIsLoading]=useState([])
  const maxChars = 200;

    useEffect(() => {
      getData();
    }, [user]);
    
    const getData = async () => {
      setIsLoading(true)
        const { data } = await axios(`${import.meta.env.VITE_API_URL}/contacts`);
        setContacts(data);
        setIsLoading(false)
    };

    const handleAnswer = (contactEmail, contactName) => {
        // Encode all components for URL safety
        const fromEmail = encodeURIComponent(user.email);
        const toEmail = encodeURIComponent(contactEmail);
        const subject = encodeURIComponent(`Re: Message from True Beauty`);
        const body = encodeURIComponent(
            `Dear ${contactName || contactEmail.split('@')[0]},\n\n` +
            `Thank you for reaching out.\n\n` +
            `Best regards,\n` +
            `${user.displayName || 'Admin'}\n` +
            `For any query please send us message at ${user.email}`
        );

        // Gmail compose URL with FROM field (works when logged into multiple accounts)
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${toEmail}&su=${subject}&body=${body}&from=${fromEmail}`;
        
        window.open(gmailUrl, '_blank');
    };

     const handleDelete = (id) => {
                Swal.fire({
                  title: "Are you sure?",
                  text: "You won't be able to revert this!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, delete it!"
                }).then(async (result) => {
                  if (result.isConfirmed) {
                    try {
                      await axios.delete(`${import.meta.env.VITE_API_URL}/contacts/${id}`);
                      
                      await Swal.fire({
                        title: "Deleted!",
                        text: "Your product has been deleted.",
                        icon: "success"
                      });
                      
                      getData();
                    } catch (err) {
                      await Swal.fire({
                        title: "Error!",
                        text: err.response?.data?.message || "Failed to delete product",
                        icon: "error"
                      });
                    }
                  }
                });
              };

    return (
        <div className="mt-10">
            {isLoading?(
              <div className="flex justify-center item-center mt-20">
      <span className="loading loading-spinner text-rose-600  loading-lg"></span>
    </div>
            ):
              contacts.length===0?(<p className="text-rose-600 capitalize text-center text-2xl font-bold mt-20">There is no message</p>):(
                <div>
              <h2 className="text-rose-600 text-center capitalize text-2xl font-bold mt-10 underline">
                All messages
            </h2>
            <div className="m-10 border-2 border-slate-200 px-5 py-2 rounded-xl shadow-xl shadow-rose-200">
                {contacts.map(contact => (
                    <div key={contact._id} className="mt-5">
                       <div className="flex justify-end items-end ">
                         <button onClick={() => handleDelete(contact._id)}  className="btn bg-rose-100 border-2 border-rose-700  text-xl text-rose-700 font-bold">
                           
                            <RiDeleteBin7Fill />
                        </button>
                       </div>
                        <p className="capitalize">
                            <span className="font-bold text-xl text-rose-700">NAME: </span>
                            {contact.name}
                        </p>
                        <p className="capitalize">
                            <span className="font-bold text-xl text-rose-700">EMAIL: </span>
                            {contact.email}
                        </p>
                        <p className="capitalize">
                            <span className="font-bold text-xl text-rose-700">MESSAGE: </span>
                           {isExpanded ? (contact.message) : `${(contact.message).substring(0, maxChars)}${(contact.message).length > maxChars ? '.......' : ''}`}
                            {(contact.message).length > maxChars && (
        <p
          onClick={() => setIsExpanded(!isExpanded)}
          className="font-bold  text-rose-700 rounded  transition-colors cursor-pointer"
        >
          {isExpanded ? (
            <>
              <span className="md:hidden">Less</span>
              <span className="hidden md:inline">Show Less Content</span>
            </>
          ) : (
            <>
              <span className="md:hidden">More</span>
              <span className="hidden md:inline">Show More Content</span>
            </>
          )}
        </p>
      )}
                        </p>
                       
                        <button 
                            onClick={() => handleAnswer(contact.email, contact.name)}
                            className="px-8 py-2.5 h-[10vh] leading-5 mt-5 text-white font-bold transition-colors duration-300 transform text-xl bg-rose-700 outline outline-1 hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                        >
                            Answer
                        </button>
                        <hr className="border-b-2 border-rose-700 mt-4" />
                    </div>
                ))}
            </div>
            </div>
              )
            }
        </div>
    );
};

export default Messages;