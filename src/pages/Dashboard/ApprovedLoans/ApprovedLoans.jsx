import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { format } from 'date-fns';
import { Link } from 'react-router';

const ApprovedLoans = () => {

    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: loans = [], isLoading } = useQuery({
        queryKey: ['approved-loans', user?.email],
        queryFn: async () => {
            const result = await axiosSecure(`/applications?updatedBy=${user?.email}&status=approved`)
            return result.data;
        }
    });

    if (loading || isLoading) return <LoadingSpinner></LoadingSpinner>

    return (
        <div>
            <h3 className="text-lg font-semibold p-3">Approved Loan Applications: {loans.length}</h3>

            <div>
                {/* for tab and large devices */}
                <div className="hidden md:block overflow-x-auto w-full">
                    <table className="table table-zebra w-full">
                     
                        <thead className="bg-base-200">
                            <tr>
                                <th>Loan ID</th>
                                <th>User Info</th>
                                <th>Amount</th>
                                <th>Approved Date</th>
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

                               
                                    <td>
                                        <p>Requested Amount: {loan.requestedAmount}</p>
                                        <p>Max Amount: {loan.maxLimit}</p>
                                        <p>Application Fee: {loan.applicationFee}</p>
                                    </td>

                         
                                    <td>
                                        <p>{format(new Date(loan.updatedAt), 'd MMM, yyyy h:mma')}</p>
                                    </td>

                               
                                    <td className="flex gap-2">
                                        <div className='flex flex-col lg:flex-row gap-3'>
                                            <Link to={`/dashboard/application/${loan._id}`}
                                                className='btn btn-sm btn-info text-white'>View</Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
                                                <p>Approved Date: {format(new Date(loan.updatedAt), 'd MMM, yyyy h:mma')}</p>
                                            </div>
                                        </td>

                               
                                        <td className="flex gap-2">
                                            <div className='flex flex-col gap-3'>
                                                <Link to={`/dashboard/application/${loan._id}`}
                                                    className='btn btn-sm btn-info text-white'>View</Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApprovedLoans;