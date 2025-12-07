import React from 'react';
import { format } from 'date-fns';
import { FaUser, FaPhone, FaIdCard, FaMoneyBill, FaEnvelope, FaHome, FaUniversity, FaCheckCircle, FaClock, FaCross } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import useRole from '../../../hooks/useRole';

const ApplicationDetails = () => {

    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const {user, loading} = useAuth();
    const [role, isRoleLoading] = useRole();

    const { data: applicationData = {}, isLoading, refetch } = useQuery({
        queryKey: ['application', id],
        queryFn: async () => {
            const result = await axiosSecure(`/application-details/${id}`)
            return result.data;
        }
    })

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

    if (isLoading || isRoleLoading || loading) return <LoadingSpinner></LoadingSpinner>
    return (
        <div className="flex justify-center items-center p-4">
            <div className="card w-full max-w-lg bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-primary flex items-center gap-2">
                        <FaUniversity /> {applicationData.loanTitle}
                    </h2>
                    <p className="text-sm text-gray-500">Loan ID: {applicationData.loanId}</p>

                    <div className="divider">Borrower Info</div>
                    <div className="space-y-2">
                        <p className="flex items-center gap-2"><FaUser /> {applicationData.borrowerName}</p>
                        <p className="flex items-center gap-2"><FaPhone /> {applicationData.borrowerContact}</p>
                        <p className="flex items-center gap-2"><FaIdCard /> NID: {applicationData.borrowerNID}</p>
                        <p className="flex items-center gap-2"><FaMoneyBill /> Income: {applicationData.borrowerIncome} | Source: {applicationData.borrowerIncomeSource}</p>
                        <p className="flex items-center gap-2"><FaHome /> {applicationData.borrowerAddress}</p>
                        <p className="flex items-center gap-2"><FaEnvelope /> {applicationData.borrowerEmail}</p>
                    </div>

                    <div className="divider">Loan Details</div>
                    <div className="space-y-2">
                        <p>Category: {applicationData.category}</p>
                        <p>Max Limit: {applicationData.maxLimit}</p>
                        <p>Interest Rate: {applicationData.interestRate}%</p>
                        <p>Requested Amount: {applicationData.requestedAmount}</p>
                        <p>Reason: {applicationData.reason}</p>
                        <p>Status: <span className="badge badge-warning">{applicationData.status}</span></p>
                        <p>Application Fee: <span className="badge badge-error">{applicationData.applicationFee}</span></p>
                        <p className="flex items-center gap-2"><FaClock /> Applied At: {format(new Date(applicationData.appliedAt), 'd MMM, yyyy h:mma')}
                        </p>
                    </div>

                    {
                        applicationData.status === 'pending' && role === 'manager' &&
                        <div className="card-actions justify-end mt-4">
                            <button 
                            onClick={() => handleUpdateStatus('approved', applicationData._id)}
                            className="btn btn-primary flex items-center gap-2">
                                <FaCheckCircle /> Approve
                            </button>
                            <button 
                            onClick={() => handleUpdateStatus('rejected', applicationData._id)}
                            className="btn btn-secondary">
                                <TiDelete className='text-xl' /> Reject</button>
                        </div>

                    }
                </div>
            </div>
        </div>

    );
};

export default ApplicationDetails;