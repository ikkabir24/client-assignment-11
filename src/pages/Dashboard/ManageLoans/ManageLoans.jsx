import React from 'react';
import useAuth from '../../../hooks/useAuth';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const ManageLoans = () => {

    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: loans = [], refetch, isLoading } = useQuery({
        queryKey: ['manage-loans', user?.email],
        queryFn: async () => {
            const result = await axiosSecure(`/all-loans?email=${user?.email}`)
            return result.data;
        }
    });

    const deleteLoan = (id) => {
        Swal.fire({
            title: "Are you sure you want to delete the loan scheme?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/delete-loan/${id}`)
                    .then(res => {
                        refetch()
                        Swal.fire({
                            title: "Loan Scheme deleted..!",
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
            <h3 className='text-lg font-semibold p-3'>Manage Loans: {loans.length}</h3>

            <div>
                <div className="overflow-x-auto w-full">
                    <table className="table table-zebra w-full">
             
                        <thead className="bg-base-200">
                            <tr>
                                <th>Loan Info</th>
                                <th>Category</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                 
                        <tbody>
                            {loans.map((loan) => (
                                <tr key={loan._id}>
                               
                                    <td>
                                        <div className='flex gap-3 items-center'>
                                            <div>
                                                <img className='w-10 h-10 object-cover' src={loan.imageURL} alt="" />
                                            </div>
                                            <div>
                                                <p className='font-semibold'>Title: {loan.title}</p>
                                                <p>Interest Rate: {loan.interestRate}%</p>
                                            </div>
                                        </div>
                                    </td>

                              
                                    <td>
                                        {loan.category}
                                    </td>

                              
                                    <td className="flex gap-2">
                                        <div className='flex flex-col md:flex-row gap-3'>
                                            <Link to={`/dashboard/update-loan/${loan._id}`} className='btn btn-sm btn-primary'>Update</Link>
                                            <button
                                                onClick={() => deleteLoan(loan._id)}
                                                className='btn btn-sm btn-error'>Delete</button>
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

export default ManageLoans;