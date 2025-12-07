import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaCheckCircle } from 'react-icons/fa';

const PaymentSuccess = () => {

    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const axiosSecure = useAxiosSecure();
    const [paymentInfo, setPaymentInfo] = useState({});

    useEffect(() => {
        if (sessionId) {
            axiosSecure.patch(`payment-success?session_id=${sessionId}`)
                .then(res => {
                    setPaymentInfo({
                        transactionId: res.data.transactionId,
                    })
                })
        }
    }, [sessionId, axiosSecure])

    return (
        <div className="flex items-center justify-center">
            <div className="card w-full max-w-md shadow-xl bg-base-200">
                <div className="card-body items-center text-center">
                
                    <FaCheckCircle className="text-green-500 text-6xl mb-4" />

              
                    <h2 className="card-title text-2xl font-bold text-green-600">
                        Payment Successful!
                    </h2>

               
                    <p className="text-gray-600 mt-2">
                        Thank you for your purchase. Your transaction has been completed successfully.
                    </p>

                
                    <div className="mt-4 w-full">
                        <div className="alert alert-success shadow-lg">
                            <div className='flex items-center gap-4'>
                                <FaCheckCircle className='text-xl text-white' />
                                <span className='text-white text-lg font-semibold'>Transaction ID: <br />{paymentInfo.transactionId}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;