import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const AllLoansForAdmin = () => {

    const axiosSecure = useAxiosSecure()
    const [showOnHomePage, setShowOnHomePage] = useState(false);
    const { data: loans = [], refetch, isLoading } = useQuery({
        queryKey: ['all-loans-for-admin'],
        queryFn: async () => {
            const result = await axiosSecure(`/all-loans`)
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
                        console.log(res);
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

    const handleShowOnHome = (id) => {
        console.log(id, showOnHomePage);
        const update = {
            showOnHome: showOnHomePage
        }
        axiosSecure.patch(`/update-loan/${id}`, update)
            .then(() => {
                if (showOnHomePage) {
                    toast.success('Added to the home page..!');
                } else {
                    toast.success('Removed from the home page..!');
                }
                refetch();
            })

    }

    if (isLoading) return <LoadingSpinner></LoadingSpinner>
    return (
        <div>
            <h3 className="text-lg font-semibold p-3">All Loans: {loans.length}</h3>

            <div>
                <div className="overflow-x-auto w-full">
                    <table className="table table-zebra w-full">
                        {/* TABLE HEAD */}
                        <thead className="bg-base-200">
                            <tr>
                                <th>Loan Info</th>
                                <th className='hidden md:table-cell'>Category</th>
                                <th className='hidden md:table-cell'>Created By</th>
                                <th className='hidden md:table-cell'>Show on Home</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        {/* TABLE BODY */}
                        <tbody>
                            {loans.map((loan) => (
                                <tr key={loan._id}>
                                    {/* LOAN INFO */}
                                    <td>
                                        <div className='flex gap-3 items-center'>
                                            <div>
                                                <img className='w-10 h-10 object-cover' src={loan.imageURL} alt="" />
                                            </div>
                                            <div>
                                                <p className='font-semibold'>Title: {loan.title}</p>
                                                <p>Interest Rate: {loan.interestRate}%</p>
                                                <p className='md:hidden'>Category: {loan.category}</p>
                                                <p className='md:hidden'>Created By: {loan.createdBy}</p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* FEE STATUS */}
                                    <td className='hidden md:table-cell'>
                                        {loan.category}
                                    </td>

                                    {/* created by */}
                                    <td className='hidden md:table-cell'>
                                        {loan.createdBy}
                                    </td>

                                    {/* show on home */}
                                    <td className='hidden md:table-cell'>
                                        <div className="form-control">
                                            <input
                                                type="checkbox"
                                                defaultChecked={loan.showOnHome}
                                                onChange={() => { setShowOnHomePage(!showOnHomePage); handleShowOnHome(loan._id) }}
                                                className="toggle toggle-primary"
                                            />
                                        </div>
                                    </td>

                                    {/* ACTIONS */}
                                    <td>
                                        <div className='flex flex-col md:flex-row gap-3'>
                                            <Link to={`/dashboard/update-loan/${loan._id}`} className='btn btn-sm btn-primary'>Update</Link>
                                            <button
                                                onClick={() => deleteLoan(loan._id)}
                                                className='btn btn-sm btn-error'>Delete</button>
                                            <div className="form-control md:hidden">
                                                <label htmlFor="">
                                                    Show On Home:
                                                    <input
                                                    type="checkbox"
                                                    defaultChecked={loan.showOnHome}
                                                    onChange={() => { setShowOnHomePage(!showOnHomePage); handleShowOnHome(loan._id) }}
                                                    className="toggle toggle-primary"
                                                />
                                                </label>
                                            </div>
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

export default AllLoansForAdmin;