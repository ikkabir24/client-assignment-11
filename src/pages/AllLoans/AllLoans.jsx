import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import LoanCard from './LoanCard';

const AllLoans = () => {

    const { data: loans = [], isLoading } = useQuery({
        queryKey: ['all-loans'],
        queryFn: async () => {
            const result = await axios(`${import.meta.env.VITE_API_URL}/all-loans`)
            return result.data;
        }
    })

    console.log(loans);

    if (isLoading) return <LoadingSpinner></LoadingSpinner>
    return (
        <div>
            <h3 className='text-lg font-semibold p-3'>All Loans: {loans.length}</h3>

            <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-3 md:px-8 lg:px-10'>
                {
                    loans.map(loan => <LoanCard key={loan._id} loan={loan}></LoanCard>)
                }
            </div>
        </div>
    );
};

export default AllLoans;