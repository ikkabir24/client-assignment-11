import useAuth from '../../../hooks/useAuth'
import coverImg from '../../../assets/images/cover.jpg'
import { FiLogOut } from "react-icons/fi";
import toast from 'react-hot-toast';
import useRole from '../../../hooks/useRole';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';

const Profile = () => {
    const { user, logOut } = useAuth();
    const [role, isRoleLoading] = useRole()

    const handleLogOut = () =>{
        logOut()
        .then(()=>{
            toast.success('Signed out successfully..!')
        })
    }

    if(isRoleLoading) return <LoadingSpinner></LoadingSpinner>
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='bg-white shadow-lg rounded-2xl md:w-4/5 lg:w-3/5'>
                <img
                    alt='cover photo'
                    src={coverImg}
                    className='w-full mb-4 rounded-t-lg h-56'
                />
                <div className='flex flex-col items-center justify-center p-4 -mt-16'>
                    <a href='#' className='relative block'>
                        <img
                            alt='profile'
                            src={user?.photoURL}
                            referrerPolicy='no-referrer'
                            className='mx-auto object-cover rounded-full h-24 w-24  border-2 border-white '
                        />
                    </a>

                    <p className='p-2 px-4 text-xs text-white bg-primary rounded-full'>
                        {role}
                    </p>
                    <p className='mt-2 text-xl font-medium text-gray-800 '>
                        User Id: {user?.uid}
                    </p>
                    <div className='w-full p-2 mt-4 rounded-lg'>
                        <div className='flex flex-wrap items-center justify-between text-sm text-gray-600 '>
                            <p className='flex flex-col'>
                                Name
                                <span className='font-bold text-gray-600 '>
                                    {user?.displayName}
                                </span>
                            </p>
                            <p className='flex flex-col'>
                                Email
                                <span className='font-bold text-gray-600 '>{user?.email}</span>
                            </p>

                            <div>
                                <button 
                                onClick={handleLogOut}
                                className='btn btn-primary px-10 py-5 rounded-lg text-white cursor-pointer hover:bg-lime-800 mb-1 flex items-center gap-2'>
                                    <FiLogOut /><span>Log Out</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
