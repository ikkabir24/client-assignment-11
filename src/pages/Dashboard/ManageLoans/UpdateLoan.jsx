import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';

const UpdateLoan = () => {

    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { loading } = useAuth();

    const { data: loan = [], isLoading } = useQuery({
        queryKey: ['get-data', id],
        queryFn: async () => {
            const result = await axiosSecure(`/loan/${id}`)
            return result.data;
        }
    });
    console.log(loan);

    const { register, handleSubmit } = useForm({
        defaultValues: {
            title: loan.title,
            description: loan.description,
            category: loan.category,
            interestRate: loan.interestRate,
            maxLimit: loan.maxLimit,
            requiredDocuments: loan.requiredDocuments,
            emiPlans: loan.emiPlans,
            imageURL: loan.imageURL,
            showOnHome: loan.showOnHome
        }
    })

    const onSubmit = (data) => {

        Swal.fire({
            title: "Are you sure you want to update the loan scheme?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Update"
        }).then((result) => {
            if (result.isConfirmed) {
                // save the loan package in the db
                axiosSecure.patch(`/update-loan/${id}`, data)
                    .then(() => {
                        Swal.fire({
                            title: "Updated Successfully..!",
                            icon: "success"
                        });
                    })
            }
        });

    }

    if (isLoading || loading) return <LoadingSpinner></LoadingSpinner>
    return (
        <div className="max-w-4xl mx-auto p-6 bg-base-200 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-6">
                Update Loan
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                {/* Loan Title */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-medium">Loan Title</span>
                    </label>
                    <input
                        type="text"
                        {...register("title", { required: true })}
                        placeholder="Enter loan title"
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Description */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-medium">Description</span>
                    </label><br />
                    <textarea
                        {...register("description", { required: true })}
                        placeholder="Enter loan description"
                        className="textarea textarea-bordered w-full h-28"
                    ></textarea>
                </div>

                {/* Category & Interest Rate */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Category</span>
                        </label>
                        <select
                            {...register("category", { required: true })}
                            className="select select-bordered w-full"
                        >
                            <option value="">Select Category</option>
                            <option>Business</option>
                            <option>Education</option>
                            <option>Medical</option>
                            <option>Personal</option>
                            <option>Others</option>
                        </select>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">
                                Interest Rate (%)
                            </span>
                        </label>
                        <input
                            type="number"
                            {...register("interestRate", { required: true, valueAsNumber: true })}
                            placeholder="Example: 7.5"
                            className="input input-bordered w-full"
                        />
                    </div>
                </div>

                {/* Max Loan Limit */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-medium">Max Loan Limit ($)</span>
                    </label>
                    <input
                        type="number"
                        {...register("maxLimit", { required: true, valueAsNumber: true })}
                        placeholder="Example: 5000"
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Required Documents */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-medium">Required Documents</span>
                    </label>
                    <input
                        type="text"
                        {...register("requiredDocuments", { required: true })}
                        placeholder="Example: National ID, Salary Slip"
                        className="input input-bordered w-full"
                    />
                </div>

                {/* EMI Plans */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-medium">EMI Plans</span>
                    </label>
                    <input
                        type="number"
                        {...register("emiPlans", { required: true, valueAsNumber: true })}
                        placeholder="Enter the number of month: 3 or 6 or 12"
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Image Upload */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-medium">Loan Image</span>
                    </label>
                    <input
                        type="text"
                        {...register("imageURL", { required: true })}
                        placeholder="Image URL"
                        className="input input-bordered w-full"

                    />
                </div>

                {/* Show on Home Toggle */}
                <div className="form-control">
                    <label className="label cursor-pointer">
                        <span className="label-text font-medium">Show on Home Page</span>
                        <input
                            type="checkbox"
                            className="toggle toggle-primary"
                            {...register("showOnHome")}
                        />
                    </label>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="btn btn-primary w-full text-lg"
                >
                    Update Loan
                </button>
            </form>
        </div>
    );
};

export default UpdateLoan;