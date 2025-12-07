import { format } from 'date-fns';
import React from 'react';
import { Link } from 'react-router';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const AllLoanApplicationAdmin = () => {

    const { loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: loans = [], isLoading } = useQuery({
        queryKey: ['all-applications'],
        queryFn: async () => {
            const result = await axiosSecure(`/applications`)
            return result.data;
        }
    });


    if (loading || isLoading) return <LoadingSpinner></LoadingSpinner>
    return (
        <div>
            <h3 className="font-semibold text-lg p-3">All Loan Applications: {loans.length}</h3>

            {/* for tab and large devices */}
            <div>
                <div className="hidden md:block overflow-x-auto w-full">
                    <table className="table table-zebra w-full">
                
                        <thead className="bg-base-200">
                            <tr>
                                <th>Loan ID</th>
                                <th>User Info</th>
                                <th>Category</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Apply Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                 
                        <tbody>
                            {loans.map((loan) => (
                                <tr key={loan._id}>

                               
                                    <td>
                                        <div className='flex gap-3 items-center'>
                                            <p>{loan.loanId}</p>
                                        </div>
                                    </td>

                                    
                                    <td>
                                        <p>Name: {loan.borrowerName}</p>
                                        <p>Email: {loan.borrowerEmail}</p>
                                    </td>

                        
                                    <td>{loan.category}</td>

                                  
                                    <td>
                                        <p>Requested Amount: {loan.requestedAmount}</p>
                                        <p>Max Amount: {loan.maxLimit}</p>
                                        <p>Application Fee: {loan.applicationFee}</p>
                                    </td>

                               
                                    <td>
                                        <span className='badge badge-info font-semibold text-white'>{loan.status}</span>
                                    </td>

                                  
                                    <td>
                                        <p>{format(new Date(loan.appliedAt), 'd MMM, yyyy h:mma')}</p>
                                    </td>

                               
                                    <td className="flex gap-2">


                                        <Link
                                            to={`/dashboard/application/${loan._id}`}
                                            className='btn btn-sm btn-info text-white'>
                                            View
                                        </Link>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* for mobile devices */}
            <div>
                <div className="md:hidden overflow-x-auto w-full">
                    <table className="table table-zebra w-full">
                     
                        <thead className="bg-base-200">
                            <tr>
                                <th>Loan Info</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                      
                        <tbody>
                            {loans.map((loan) => (
                                <tr key={loan._id}>
                                
                                    <td>
                                        <div className=''>
                                            <p>Loan ID: {loan.loanId}</p>
                                            <p>Borrower Name: {loan.borrowerName}</p>
                                            <p>Borrower Email: {loan.borrowerEmail}</p>
                                            <p>Application Fee: {loan.applicationFee}</p>
                                            <p>Requested Amount: {loan.requestedAmount}</p>
                                            <p>Max Amount: {loan.maxLimit}</p>
                                            <p>Category: {loan.category}</p>
                                            <p>Status: <span className='badge badge-info font-semibold text-white'>{loan.status}</span></p>
                                            <p>Apply Date: {format(new Date(loan.appliedAt), 'd MMM, yyyy h:mma')}</p>
                                        </div>
                                    </td>

                               
                                    <td className="flex gap-2">
                                        <Link
                                            to={`/dashboard/application/${loan._id}`}
                                            className='btn btn-sm btn-info text-white'>
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllLoanApplicationAdmin;