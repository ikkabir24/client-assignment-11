import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";


const CustomerFeedback = () => {

    const feedbacks = [
        {
            id: 1,
            name: "Rahim Uddin",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNfWDN4AwsmQHxtFDIG_b9xP9Dvs6PH40ffg&s",
            message:
                "LoanLink made my loan application easier than ever. The approval was fast and transparent. Highly recommended!",
        },
        {
            id: 2,
            name: "Sadia Akter",
            image: "https://i1.rgstatic.net/ii/profile.image/1112926656167937-1642353800627_Q512/Sadia-Akter-14.jpg",
            message:
                "The EMI options and affordable interest rate helped me grow my small business. Fantastic service!",
        },
        {
            id: 3,
            name: "Lionel Messi",
            image: "https://i.guim.co.uk/img/media/5ad0e8737bbfb16866951dca481155cdbc9b7b06/0_130_2746_1648/master/2746.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=00c6109466591a4d2c211ce77aecb4de",
            message:
                "Que miras bobo!",
        },
        {
            id: 4,
            name: "Nusrat Jahan",
            image: "https://image.tmdb.org/t/p/w500/jIhr2Ookz1qba79Mn00q44L5VH7.jpg",
            message:
                "Customer service was very friendly and helpful. LoanLink is truly a lifesaver.",
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
                    What Our Customers Say
                </motion.h2>

                <Swiper
                    modules={[Pagination, Navigation, Autoplay]}
                    slidesPerView={1}
                    spaceBetween={20}
                    pagination={{ clickable: true }}
                    navigation={true}
                    autoplay={{ delay: 3500, disableOnInteraction: false }}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    className="pb-10"
                >
                    {feedbacks.map((fb) => (
                        <SwiperSlide key={fb.id}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4 }}
                                viewport={{ once: true }}
                                className="bg-base-200 p-6 rounded-xl shadow-md hover:shadow-xl transition-all"
                            >
                                <div className="card h-52 flex flex-col items-center justify-center text-center">
                                    <img
                                        src={fb.image}
                                        alt={fb.name}
                                        className="w-20 h-20 rounded-full mb-4 object-cover shadow"
                                    />
                                    <h3 className="text-xl font-semibold mb-2">{fb.name}</h3>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        {fb.message}
                                    </p>
                                </div>
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default CustomerFeedback;
