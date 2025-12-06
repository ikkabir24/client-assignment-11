import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyLoans = () => {

    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure()

    const {data:myLoans = []} = useQuery({
        queryKey: ['myLoans', user?.email],
        queryFn: async ()=>{
            const result = await axiosSecure('/my-applications')
            return result.data;
        }
    });

    console.log(user);

    if(loading) return <LoadingSpinner></LoadingSpinner>
    return (
        <div>
            <h3 className='p-3 font-semibold text-lg'>All of my Loans: {myLoans.length}</h3>
        </div>
    );
};

export default MyLoans;