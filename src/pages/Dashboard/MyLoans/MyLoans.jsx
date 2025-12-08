import { useQuery } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const MyLoans = () => {

    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const modalRef = useRef();
    const [selectedLoan, setSelectedLoan] = useState(null);

    const { data: loans = [], refetch, isLoading } = useQuery({
        queryKey: ['myLoans', user?.email],
        queryFn: async () => {
            const result = await axiosSecure(`/applications?email=${user?.email}`)
            return result.data;
        }
    });

    const handlePay = async (loan) => {
        const paymentInfo = {
            applicationID: loan._id,
            loanID: loan.loanId,
            borrowerEmail: loan.borrowerEmail,
            loanTitle: loan.loanTitle,
        }
        const res = await axiosSecure.post('/create-checkout-session', paymentInfo)

        window.location.assign(res.data.url);

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
                    .then(() => {
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

    const openTheModal = loan => {
        setSelectedLoan(loan);
        modalRef.current.showModal()
    }



    if (loading || isLoading) return <LoadingSpinner></LoadingSpinner>
    return (
        <div>
            <h3 className='p-3 font-semibold text-lg'>All of my Loans: {loans.length}</h3>

            {/* for large screen */}
            <div className="overflow-x-auto w-full hidden md:block">
                <table className="table table-zebra w-full">

                    <thead className="bg-base-200">
                        <tr>
                            <th>Loan Info</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Fee</th>
                            <th>Actions</th>
                        </tr>
                    </thead>


                    <tbody>
                        {loans.map((loan) => (
                            <tr key={loan._id}>

                                <td>
                                    <div>
                                        <h3 className="font-semibold">{loan.loanTitle}</h3>
                                        <p className="text-sm opacity-70">ID: {loan.loanId}</p>
                                    </div>
                                </td>

                                <td className="font-semibold">${loan.requestedAmount}</td>

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

                                <td>
                                    {loan.applicationFee === "paid"
                                        ? <span onClick={() => openTheModal(loan)} className='badge badge-info font-semibold text-white'>Paid</span>
                                        : <button
                                            onClick={() => handlePay(loan)}
                                            className="btn btn-xs btn-primary"
                                        >
                                            Pay $10
                                        </button>
                                    }
                                </td>

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

                            <div className="mt-3 flex items-center gap-2">
                                {loan.applicationFee === "paid"
                                    ? <span
                                        onClick={() => openTheModal(loan)}
                                        className="badge badge-info text-white font-semibold w-full"
                                    >
                                        Paid
                                    </span>
                                    : <button
                                        className="btn btn-sm btn-primary w-full"
                                        onClick={() => handlePay(loan)}
                                    >
                                        Pay $10
                                    </button>
                                }
                            </div>


                            <div className="mt-3 flex gap-2">
                                <Link to={`/loan/${loan.loanId}`}
                                    className="btn btn-sm btn-info flex-1"
                                >
                                    View
                                </Link>

                                {loan.status === "pending" && (
                                    <button
                                        className="btn btn-sm btn-error flex-1"
                                        onClick={() => handleCancel(loan._id)}
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">

                    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-full max-w-lg shadow-xl">

                        <h2 className="text-2xl font-semibold mb-4 text-primary">
                            Payment Details
                        </h2>

                        {selectedLoan && (
                        <div>
                            <p><span className="font-semibold">Borrower Name:</span> {selectedLoan.borrowerName}</p>
                            <p><span className="font-semibold">Borrower Email:</span> {selectedLoan.borrowerEmail}</p>

                            <p><span className="font-semibold">Loan Title:</span> {selectedLoan.loanTitle}</p>
                            <p><span className="font-semibold">Category:</span> {selectedLoan.category}</p>

                            <p><span className="font-semibold">Requested Amount:</span> ${selectedLoan.requestedAmount}</p>
                            <p><span className="font-semibold">Interest Rate:</span> {selectedLoan.interestRate}%</p>

                            <p><span className="font-semibold">Max Limit:</span> ${selectedLoan.maxLimit}</p>
                            <p><span className="font-semibold">Application Status:</span> {selectedLoan.status}</p>

                            <p><span className="font-semibold">Application Fee:</span> {selectedLoan.applicationFee}</p>
                            <p><span className="font-semibold">Transaction ID:</span> {selectedLoan.transactionId}</p>

                            <p><span className="font-semibold">Applied At:</span> {new Date(selectedLoan.appliedAt).toLocaleString()}</p>
                            <p><span className="font-semibold">Fee Paid At:</span> {new Date(selectedLoan.feePaidAt).toLocaleString()}</p>

                            <p><span className="font-semibold">Income:</span> ${selectedLoan.borrowerIncome}</p>
                            <p><span className="font-semibold">Income Source:</span> {selectedLoan.borrowerIncomeSource}</p>

                            <p><span className="font-semibold">NID:</span> {selectedLoan.borrowerNID}</p>
                            <p><span className="font-semibold">Contact:</span> {selectedLoan.borrowerContact}</p>

                            <p className="md:col-span-2">
                                <span className="font-semibold">Address:</span> {selectedLoan.borrowerAddress}
                            </p>
                        </div>
                        )}

                        <div className="modal-action">
                            <form method="dialog">
                                <button className="btn">Close</button>
                            </form>
                        </div>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default MyLoans;