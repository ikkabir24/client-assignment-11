import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const HeroBanner = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };

    return (
        <div className="hero min-h-screen bg-base-200 relative z-1 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>
            </div>

            <motion.div
                className="hero-content flex-col lg:flex-row-reverse z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div
                    className="w-full lg:w-1/2 flex justify-center"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.img
                        src="https://img.freepik.com/free-vector/digital-wallet-concept-illustration_114360-7561.jpg?t=st=1709123456~exp=1709127056~hmac=6b9b3e1a8e1a8e1a8e1a8e1a8e1a8e1a"
                        alt="Financial Growth and Loans"
                        className="w-full max-w-md lg:max-w-lg rounded-2xl shadow-2xl mask mask-squircle"
                        animate={{ y: [0, -15, 0] }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </motion.div>
                
                <motion.div className="w-full lg:w-1/2 text-center lg:text-left mt-8 lg:mt-0">
                    <motion.h1
                        className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                        variants={itemVariants}
                    >
                        Empowering Your Dreams with <span className="text-primary">Fast & Fair</span> Loans
                    </motion.h1>

                    <motion.p
                        className="py-6 text-lg text-base-content/80"
                        variants={itemVariants}
                    >
                        LoanLink connects you with trusted financial resources. Whether you need
                        funds for a startup, education, or personal growth, we provide a
                        seamless, paperless approval process. Apply today and take the next step.
                    </motion.p>

                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                        variants={itemVariants}
                    >
                        {/* Primary CTA */}
                        <Link to="/all-loans">
                            <button className="btn btn-primary btn-lg w-full sm:w-auto shadow-lg hover:shadow-primary/50 transition-all duration-300">
                                Explore Loans
                            </button>
                        </Link>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default HeroBanner;