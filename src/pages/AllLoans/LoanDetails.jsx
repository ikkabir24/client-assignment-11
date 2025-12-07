import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import useRole from '../../hooks/useRole';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const LoanDetails = () => {

    const { id } = useParams();
    const [role, isRoleLoading] = useRole();
    const {user, loading} = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: loan = {}, isLoading } = useQuery({
        queryKey: ['loan', id],
        queryFn: async () => {
            const result = await axiosSecure(`/loan/${id}`)
            return result.data;
        }
    })

    if (isLoading || isRoleLoading || loading) return <LoadingSpinner></LoadingSpinner>
    return (
        <div className="max-w-6xl mx-auto p-6">

            <h1 className="text-3xl font-semibold mb-6">
                Loan Details
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">


                <div className="w-full h-80 rounded-xl overflow-hidden shadow-lg">
                    <img
                        src={loan.imageURL}
                        alt={loan.title}
                        className="w-full h-full object-cover"
                    />
                </div>


                <div className="space-y-5 p-4 lg:p-0">
                    <h2 className="text-3xl font-bold">{loan.title}</h2>


                    <div className="flex items-center gap-4">
                        <span className="px-4 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm">
                            {loan.category}
                        </span>
                        <span className="text-lg font-semibold text-secondary">
                            {loan.interestRate}% Interest
                        </span>
                    </div>


                    <p className="text-lg">
                        <span className="font-semibold">Max Loan Limit:</span>{" "}
                        ${loan.maxLimit}
                    </p>

                    <p className="leading-relaxed">
                        {loan.description}
                    </p>

                    <div>
                        <h3 className="font-semibold text-lg">Required Documents:</h3>
                        <ul className="list-disc ml-6">
                            {loan.requiredDocuments}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg">Available EMI Plans:</h3>
                        <div className="flex flex-wrap gap-3 mt-2">
                            {loan.emiPlans} month
                        </div>
                    </div>
                    {
                        user && role === 'borrower' &&
                        <div className="pt-3">
                            <Link to={`/apply/${loan._id}`} className="btn btn-primary w-full">
                                Apply Now
                            </Link>
                        </div>
                    }

                </div>
            </div>


            <div className="mt-12 p-6 bg-base-200 rounded-xl shadow-sm">
                <h3 className="text-xl font-bold mb-3">Important Notes</h3>
                <p className="leading-relaxed">
                    Ensure that you provide accurate information and required documents.
                    The loan officer will verify your application and income details.
                    Once approved, EMI plans will be calculated based on your preferred
                    installment schedule.
                </p>
            </div>
        </div>
    );
};

export default LoanDetails;