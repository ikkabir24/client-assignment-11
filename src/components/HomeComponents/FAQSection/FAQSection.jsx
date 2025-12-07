import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs = [
    {
        q: "How do I apply for a loan?",
        a: "You can apply online by creating an account, completing your profile, uploading documents, and selecting a loan package."
    },
    {
        q: "How long does approval take?",
        a: "Most microloans are reviewed and approved within 24–48 hours depending on document verification."
    },
    {
        q: "What documents are required?",
        a: "NID, Birth Certificate, and TIN Certificate are typically required for verification."
    },
    {
        q: "Is my personal information secure?",
        a: "Yes, we use industry-standard encryption and strict privacy protection for all user data."
    },
    {
        q: "Can I repay early?",
        a: "Absolutely! Early repayment is allowed with no hidden penalties."
    }
];

    return (
        <section className="py-16">
            <div className="max-w-5xl mx-auto px-4">

                <motion.h2
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl md:text-4xl font-bold text-center mb-10"
                >
                    Frequently Asked <span className="text-primary">Questions</span>
                </motion.h2>

                <div className="space-y-4">
                    {faqs.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="border border-gray-200 rounded-xl overflow-hidden"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex justify-between items-center p-5 text-left bg-base-300 hover:bg-base-100"
                            >
                                <span className="font-medium">{item.q}</span>
                                <motion.div
                                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ChevronDown className="w-5 h-5" />
                                </motion.div>
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="px-5 pb-5"
                                    >
                                        {item.a}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FAQSection;