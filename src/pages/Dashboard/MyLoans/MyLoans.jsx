import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const MyLoans = () => {

    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure()

    const { data: loans = [], refetch, isLoading } = useQuery({
        queryKey: ['myLoans', user?.email],
        queryFn: async () => {
            const result = await axiosSecure('/applications')
            return result.data;
        }
    });

    console.log(user);

    const handlePay = () => {
        console.log('pay btn clk');
    }

    const handleCancel = (id) => {
        Swal.fire({
            title: "Are you sure you want to cancel the loan?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Cancel it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/my-applications/${id}`)
                    .then(res => {
                        console.log(res);
                        refetch()
                        Swal.fire({
                            title: "Loan request cancelled..!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    })


            }
        });
    }

    if (loading || isLoading) return <LoadingSpinner></LoadingSpinner>
    return (
        <div>
            <h3 className='p-3 font-semibold text-lg'>All of my Loans: {loans.length}</h3>

            <div className="overflow-x-auto w-full hidden md:block">
                <table className="table table-zebra w-full">
                    {/* TABLE HEAD */}
                    <thead className="bg-base-200">
                        <tr>
                            <th>Loan Info</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Fee</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    {/* TABLE BODY */}
                    <tbody>
                        {loans.map((loan) => (
                            <tr key={loan._id}>
                                {/* LOAN INFO */}
                                <td>
                                    <div>
                                        <h3 className="font-semibold">{loan.loanTitle}</h3>
                                        <p className="text-sm opacity-70">ID: {loan.loanId}</p>
                                    </div>
                                </td>

                                {/* AMOUNT */}
                                <td className="font-semibold">${loan.requestedAmount}</td>

                                {/* STATUS */}
                                <td>
                                    <span
                                        className={`badge ${loan.status === "approved"
                                            ? "badge-success"
                                            : loan.status === "rejected"
                                                ? "badge-error"
                                                : "badge-warning"
                                            }`}
                                    >
                                        {loan.status}
                                    </span>
                                </td>

                                {/* FEE STATUS */}
                                <td>
                                    {loan.applicationFee === "paid"
                                        ? <span className='badge badge-info'>Paid</span>
                                        : (
                                            <button
                                                onClick={handlePay}
                                                className="btn btn-xs btn-primary"
                                            >
                                                Pay $10
                                            </button>
                                        )}
                                </td>

                                {/* ACTIONS */}
                                <td className="flex gap-2">
                                    <Link to={`/loan/${loan.loanId}`}
                                        className="btn btn-xs btn-info"
                                    >
                                        View
                                    </Link>

                                    {loan.status === "pending" && (
                                        <button
                                            className="btn btn-xs btn-error"
                                            onClick={() => handleCancel(loan._id)}
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* for mobile devices */}
            <div className='md:hidden'>
                <div className="md:hidden space-y-4">
                    {loans.map((loan) => (
                        <div
                            key={loan._id}
                            className="border p-4 rounded-xl bg-base-100 shadow-md"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-lg font-semibold">{loan.loanTitle}</h3>
                                    <p className="text-xs opacity-70">ID: {loan.loanId}</p>
                                </div>

                                <span
                                    className={`badge ${loan.status === "approved"
                                            ? "badge-success"
                                            : loan.status === "rejected"
                                                ? "badge-error"
                                                : "badge-warning"
                                        }`}
                                >
                                    {loan.status}
                                </span>
                            </div>

                            <p className="mt-2 text-sm">
                                <span className="font-semibold">Amount:</span> $
                                {loan.requestedAmount}
                            </p>

                            {/* Fee */}
                            <div className="mt-3 flex items-center gap-2">
                                {loan.feeStatus === "paid" ? (
                                    <button
                                        className="btn btn-sm btn-outline btn-success w-full"
                                        onClick={() => handlePay}
                                    >
                                        Paid
                                    </button>
                                ) : (
                                    <button
                                        className="btn btn-sm btn-primary w-full"
                                        onClick={() => handlePay(loan, false)}
                                    >
                                        Pay $10
                                    </button>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="mt-3 flex gap-2">
                                <Link to={`/loan/${loan.loanId}`}
                                    className="btn btn-sm btn-info flex-1"
                                >
                                    View
                                </Link>

                                {loan.status === "pending" && (
                                    <button
                                        className="btn btn-sm btn-error flex-1"
                                        onClick={() => handleCancel(loan)}
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyLoans;