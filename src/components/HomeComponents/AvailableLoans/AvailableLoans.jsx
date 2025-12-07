import React from "react";
import { motion } from "framer-motion";
import LoanCard from "../../../pages/AllLoans/LoanCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../Shared/LoadingSpinner";


const AvailableLoans = () => {

    const { data: loans = [], isLoading } = useQuery({
        queryKey: ['loans-to-display'],
        queryFn: async () => {
            const result = await axios(`${import.meta.env.VITE_API_URL}/loan-cards-display`)
            return result.data;
        }
    })

    const cardVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.15, // stagger animation
                duration: 0.5,
                ease: "easeOut",
            },
        }),
    };

    if(isLoading) return <LoadingSpinner></LoadingSpinner>

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-10">
           
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-center mb-8"
            >
                Available Loan Options
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {loans.map((loan, index) => (
                    <motion.div
                        key={index}
                        custom={index}
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.03 }}
                        className="card bg-base-100 shadow-xl rounded-xl border border-gray-200 hover:shadow-2xl transition duration-300"
                    >
                        <LoanCard loan={loan}></LoanCard>

                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default AvailableLoans;
