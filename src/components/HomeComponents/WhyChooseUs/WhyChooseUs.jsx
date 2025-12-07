import { motion } from "framer-motion";
import { ShieldCheck, Clock, TrendingUp, Wallet } from "lucide-react";

const WhyChooseUs = () => {

    const benefits = [
        {
            id: 1,
            icon: <ShieldCheck className="w-10 h-10 text-primary" />,
            title: "Secure & Trusted",
            description:
                "Your loan data and personal information are fully protected with industry-standard security.",
        },
        {
            id: 2,
            icon: <Clock className="w-10 h-10 text-primary" />,
            title: "Fast Approval",
            description:
                "Get your loan approved within hours thanks to our smart and reliable verification system.",
        },
        {
            id: 3,
            icon: <TrendingUp className="w-10 h-10 text-primary" />,
            title: "Flexible EMI Plans",
            description:
                "Choose repayment schedules that fit your income and financial situation with comfort.",
        },
        {
            id: 4,
            icon: <Wallet className="w-10 h-10 text-primary" />,
            title: "Low Interest Rates",
            description:
                "Enjoy one of the most competitive interest rate structures designed for all borrowers.",
        },
    ];

    return (
        <section className="py-16 bg-base-200">
            <div className="max-w-7xl mx-auto px-4">

                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-bold text-center mb-10"
                >
                    Why Choose LoanLink?
                </motion.h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={benefit.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            viewport={{ once: true }}
                            className="p-6 bg-base-100 shadow-md hover:shadow-xl rounded-xl text-center transition-all"
                        >
                            <div className="flex justify-center mb-4">{benefit.icon}</div>

                            <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                {benefit.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default WhyChooseUs;
