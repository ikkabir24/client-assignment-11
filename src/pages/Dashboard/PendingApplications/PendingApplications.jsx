import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import { format } from 'date-fns';
import { Link } from 'react-router';
import ApplicationDetails from '../ApplicationDetails/ApplicationDetails';
import Swal from 'sweetalert2';

const PendingApplications = () => {

    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();


    const { data: loans = [], isLoading, refetch } = useQuery({
        queryKey: ['pending-applications', user?.email],
        queryFn: async () => {
            const result = await axiosSecure('/applications?status=pending')
            return result.data;
        }
    });

    const handleUpdateStatus = (status, id) => {
        Swal.fire({
            title: `Are you sure you want to mark the application as ${status}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                console.log('btn clk-->', status);
                const update = { 
                    status: status,
                    updatedBy: user?.email,
                 };
                axiosSecure.patch(`/applications/${id}`, update)
                    .then(() => {
                        refetch();
                        Swal.fire({
                            title: "Done..!",
                            text: `The application has been ${status}..!`,
                            icon: "success"
                        });
                    })
            }
        });
    }

    if (loading || isLoading) return <LoadingSpinner></LoadingSpinner>
    return (
        <div>
            <h3 className="text-lg font-semibold p-3">Pending Loan Applications: {loans.length}</h3>

            {/* for tab and large devices */}
            <div>
                <div className="hidden md:block overflow-x-auto w-full">
                    <table className="table table-zebra w-full">
                        {/* TABLE HEAD */}
                        <thead className="bg-base-200">
                            <tr>
                                <th>Loan ID</th>
                                <th>User Info</th>
                                <th>Amount</th>
                                <th>Apply Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        {/* TABLE BODY */}
                        <tbody>
                            {loans.map((loan) => (
                                <tr key={loan._id}>

                                    {/* loan id */}
                                    <td>
                                        <div className='flex gap-3 items-center'>
                                            <p>{loan.loanId}</p>
                                        </div>
                                    </td>

                                    {/* user info */}
                                    <td>
                                        <p>Name: {loan.borrowerName}</p>
                                        <p>Email: {loan.borrowerEmail}</p>
                                    </td>

                                    {/* Amount */}
                                    <td>
                                        <p>Requested Amount: {loan.requestedAmount}</p>
                                        <p>Max Amount: {loan.maxLimit}</p>
                                        <p>Application Fee: {loan.applicationFee}</p>
                                    </td>

                                    {/* Date */}
                                    <td>
                                        <p>{format(new Date(loan.appliedAt), 'd MMM, yyyy h:mma')}</p>
                                    </td>

                                    {/* ACTIONS */}
                                    <td className="flex gap-2">
                                        <div className='flex flex-col lg:flex-row gap-3'>
                                            <button
                                                onClick={() => handleUpdateStatus('approved', loan._id)}
                                                className='btn btn-sm btn-primary'>Approve</button>
                                            <button
                                                onClick={() => handleUpdateStatus('rejected', loan._id)}
                                                className='btn btn-sm btn-error'>Reject</button>
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

            {/* for mobile devices */}
            <div>
                <div className="md:hidden overflow-x-auto w-full">
                    <table className="table table-zebra w-full">
                        {/* TABLE HEAD */}
                        <thead className="bg-base-200">
                            <tr>
                                <th>Loan Info</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        {/* TABLE BODY */}
                        <tbody>
                            {loans.map((loan) => (
                                <tr key={loan._id}>
                                    {/* LOAN INFO */}
                                    <td>
                                        <div className=''>
                                            <p>Loan ID: {loan.loanId}</p>
                                            <p>Borrower Name: {loan.borrowerName}</p>
                                            <p>Borrower Email: {loan.borrowerEmail}</p>
                                            <p>Application Fee: {loan.applicationFee}</p>
                                            <p>Requested Amount: {loan.requestedAmount}</p>
                                            <p>Max Amount: {loan.maxLimit}</p>
                                            <p>Apply Date: {format(new Date(loan.appliedAt), 'd MMM, yyyy h:mma')}</p>
                                        </div>
                                    </td>

                                    {/* ACTIONS */}
                                    <td className="flex gap-2">
                                        <div className='flex flex-col gap-3'>
                                            <button
                                                onClick={() => handleUpdateStatus('approved', loan._id)}
                                                className='btn btn-sm btn-primary'>Approve</button>
                                            <button
                                                onClick={() => handleUpdateStatus('rejected', loan._id)}
                                                className='btn btn-sm btn-error'>Reject</button>
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
    );
};

export default PendingApplications;