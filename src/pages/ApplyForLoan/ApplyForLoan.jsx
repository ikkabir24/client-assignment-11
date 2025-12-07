import React from 'react';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import axios from 'axios';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ApplyForLoan = () => {

    const { id } = useParams();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: loan = {}, isLoading } = useQuery({
        queryKey: ['loan', id],
        queryFn: async () => {
            const result = await axios(`${import.meta.env.VITE_API_URL}/loan/${id}`)
            return result.data;
        }
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            borrowerName: user.displayName,
            borrowerEmail: user.email,
            loanTitle: loan.title,
            loanId: loan._id,
            maxLimit: loan.maxLimit,
            interestRate: loan.interestRate,
            category: loan.category,
        },
    });

    const handleApplication = (data) => {
        const finalData = {
            borrowerName: user.displayName,
            borrowerContact: Number(data.borrowerPhoneNumber),
            borrowerNID: Number(data.borrowerNID),
            borrowerIncome: Number(data.income),
            borrowerIncomeSource: data.incomeSource,
            borrowerAddress: data.address,
            borrowerEmail: user.email,
            loanId: loan._id,
            loanTitle: loan.title,
            category: loan.category,
            maxLimit: Number(loan.maxLimit),
            interestRate: Number(loan.interestRate),
            requestedAmount: Number(data.requestedAmount),
            reason: data.reason,
            status: "pending",
            applicationFee: "unpaid",
        };

        Swal.fire({
            title: "Are you sure to continue?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Create"
        }).then((result) => {
            if (result.isConfirmed) {
                // save the loan package in the db
                axiosSecure.post('/applications', finalData)
                    .then(res => {
                        Swal.fire({
                            title: "Applied for a loan Successfully..!",
                            icon: "success"
                        });
                    })
            }
        });
    };

    if (isLoading) return <LoadingSpinner></LoadingSpinner>
    return (
        <div className="max-w-3xl mx-auto bg-base-100 shadow-xl rounded-xl p-8 border mt-10">
            <h2 className="text-2xl font-bold mb-6 text-center">
                Apply for: <span className="text-primary">{loan.title}</span>
            </h2>

            <form onSubmit={handleSubmit(handleApplication)} className="space-y-6">
             
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                 
                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">Your Name</span>
                        </label>
                        <input
                            readOnly
                            className="input input-bordered w-full"
                            {...register("borrowerName")}
                        />
                    </div>

                   
                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">Your Email</span>
                        </label>
                        <input
                            readOnly
                            className="input input-bordered w-full"
                            {...register("borrowerEmail")}
                        />
                    </div>

                 
                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">Your Phone Number</span>
                        </label>
                        <input
                            type='tel'
                            pattern="^\+?[0-9]{1,3}?[0-9]{6,14}$"
                            placeholder="+880 1234 567890"
                            className="input input-bordered w-full"
                            {...register("borrowerPhoneNumber")}
                        />
                    </div>

                  
                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">Your NID Number</span>
                        </label>
                        <input
                            type='number'
                            className="input input-bordered w-full"
                            {...register("borrowerNID")}
                            placeholder='NID Number'
                        />
                    </div>

                
                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">Your Monthly Income</span>
                        </label>
                        <input
                            type='number'
                            className="input input-bordered w-full"
                            {...register("income")}
                            placeholder='Monthly Income'
                        />
                    </div>

                  
                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">Your Income Source</span>
                        </label>
                        <input
                            type='text'
                            className="input input-bordered w-full"
                            {...register("incomeSource")}
                            placeholder='Income Source'
                        />
                    </div>

                </div>

            
                <div>
                    <label className="label">
                        <span className="label-text font-semibold">Your Full Address</span>
                    </label>
                    <input
                        type='text'
                        className="input input-bordered w-full"
                        {...register("address")}
                        placeholder='Full Address'
                    />
                </div>

          
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">Loan Title</span>
                        </label>
                        <input
                            readOnly
                            className="input input-bordered w-full"
                            {...register("loanTitle")}
                        />
                    </div>


                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">Loan ID</span>
                        </label>
                        <input
                            readOnly
                            className="input input-bordered w-full"
                            {...register("loanId")}
                        />
                    </div>



                </div>

       
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">Max Limit</span>
                        </label>
                        <input
                            readOnly
                            className="input input-bordered w-full"
                            {...register("maxLimit")}
                        />
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">Interest Rate in %</span>
                        </label>
                        <input
                            readOnly
                            className="input input-bordered w-full"
                            {...register("interestRate")}
                        />
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">Category</span>
                        </label>
                        <input
                            readOnly
                            className="input input-bordered w-full"
                            {...register("category")}
                        />
                    </div>

                </div>

      
                <div>
                    <label className="label">
                        <span className="label-text font-semibold">Requested Amount</span>
                    </label>

                    <input
                        type="number"
                        className="input input-bordered w-full"
                        placeholder="Enter your desired loan amount"
                        {...register("requestedAmount", {
                            required: "Requested amount is required",
                            min: { value: 1, message: "Minimum is $1" },
                            max: {
                                value: loan.maxLimit,
                                message: `Amount cannot exceed $${loan.maxLimit}`,
                            },
                        })}
                    />

                    {errors.requestedAmount && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.requestedAmount.message}
                        </p>
                    )}
                </div>

        
                <div>
                    <label className="label">
                        <span className="label-text font-semibold">Reason for Application</span>
                    </label>

                    <textarea
                        className="textarea textarea-bordered w-full h-32"
                        placeholder="Explain your reason..."
                        {...register("reason", {
                            required: "A reason is required",
                            minLength: {
                                value: 10,
                                message: "Must be at least 10 characters",
                            },
                        })}
                    ></textarea>

                    {errors.reason && (
                        <p className="text-red-500 text-sm mt-1">{errors.reason.message}</p>
                    )}
                </div>

         
                <button type="submit" className="btn btn-primary w-full">
                    Submit Application
                </button>
            </form>
        </div>
    );
};

export default ApplyForLoan;