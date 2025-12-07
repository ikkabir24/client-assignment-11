import { motion } from "framer-motion";
import { FaWpforms, FaCheckCircle, FaMoneyBillWave, FaUserShield } from "react-icons/fa";

const HowItWorks = () => {

    const steps = [
        {
            id: 1,
            icon: <FaWpforms className="text-4xl text-primary" />,
            title: "Submit Loan Request",
            desc: "Fill out a simple loan application form with your basic details and required documents.",
        },
        {
            id: 2,
            icon: <FaUserShield className="text-4xl text-primary" />,
            title: "Loan Verification",
            desc: "Our loan officer reviews the application and verifies the provided information.",
        },
        {
            id: 3,
            icon: <FaCheckCircle className="text-4xl text-primary" />,
            title: "Approval Process",
            desc: "Once reviewed, the manager approves or rejects the loan application.",
        },
        {
            id: 4,
            icon: <FaMoneyBillWave className="text-4xl text-primary" />,
            title: "Receive Your Loan",
            desc: "Upon approval, the loan amount is disbursed and the repayment cycle begins.",
        },
    ];

    return (
        <section className="py-16 bg-base-100">
            <div className="max-w-6xl mx-auto px-4">
                
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-bold text-center mb-12"
                >
                    How It Works
                </motion.h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="bg-base-200 p-6 rounded-xl shadow-md hover:shadow-xl transition-all"
                        >
                            <div className="flex justify-center mb-4">{step.icon}</div>

                            <h3 className="text-xl font-semibold text-center mb-2">
                                {step.title}
                            </h3>

                            <p className="text-center text-gray-600 dark:text-gray-300">
                                {step.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
