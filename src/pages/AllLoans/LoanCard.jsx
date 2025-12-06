import React from 'react';

const LoanCard = ({ loan }) => {
    return (
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl duration-300">
            {/* Image */}
            <figure className="h-48 overflow-hidden">
                <img
                    src={loan.imageURL}
                    referrerPolicy='no-referrer'
                    alt={loan.title}
                    className="w-full h-[200px] object-cover"
                />
            </figure>

            {/* Body */}
            <div className="card-body space-y-2">
                {/* Title */}
                <h2 className="card-title text-xl font-bold">{loan.title}</h2>

                {/* Category + Interest */}
                <div className="flex items-center justify-between">
                    <span className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary font-medium">
                        {loan.category}
                    </span>
                    <span className="text-sm font-semibold text-secondary">
                        {loan.interestRate}% Interest
                    </span>
                </div>

                {/* Max Limit */}
                <p className="text-sm text-gray-500">
                    Max Loan Limit:{" "}
                    <span className="font-semibold text-gray-700">
                        ${loan.maxLimit}
                    </span>
                </p>

                {/* View Details Button */}
                <div className="card-actions mt-3">
                    <a
                        href={`/loan/${loan._id}`}
                        className="btn btn-primary w-full"
                    >
                        View Details
                    </a>
                </div>
            </div>
        </div>
    );
};

export default LoanCard;