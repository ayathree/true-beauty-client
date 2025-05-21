import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Messages = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        getData();
    }, [user]);

    const getData = async () => {
        const { data } = await axiosSecure('/contacts');
        setContacts(data);
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

    return (
        <div className="mt-10">
            <h2 className="text-rose-600 text-center capitalize text-2xl font-bold mt-10 underline">
                All messages
            </h2>
            <div className="m-10 border-2 border-slate-200 px-5 py-2 rounded-xl shadow-xl shadow-rose-200">
                {contacts.map(contact => (
                    <div key={contact._id} className="mt-5">
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
                            {contact.message}
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
    );
};

export default Messages;