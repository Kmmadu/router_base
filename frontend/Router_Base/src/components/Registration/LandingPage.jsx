import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <motion.div
      className="min-h-screen text-white flex flex-col justify-center items-center relative bg-[#F5F5F5]"
      // style={{ background: "url(/endless-constellation.svg)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.img
        src="/router.png"
        alt="Router"
        className="w-40 md:w-52 lg:w-64 h-auto mt-10 absolute top-5 right-5 md:bottom-5 md:right-5 lg:bottom-5 lg:right-5 rotate-45"
        initial={{ y: 0 }}
        animate={{ y: [0, -20, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      <motion.div
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeIn" }}
        // style={{ textShadow: "2px 2px 10px rgba(0, 0, 0, 0.8)" }}
        className="top-2 absolute left-2"
      >
        <h1 className="text-lg text-[#fbbc05] md:text-xl lg:text-2xl font-bold ">
          Router
          <span
            className="text-[#1a73e8]"
            // style={{ textShadow: "2px 2px 10px rgba(255, 101, 0, 0.8)" }}
          >
            _Base
          </span>
        </h1>
      </motion.div>

      <section className="relative flex md:px-32 flex-col items-center justify-center  ">
        <motion.h1
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1a73e8] mb-6 text-center px-4"
          // style={{ textShadow: "2px 2px 10px rgba(0, 0, 0, 0.8)" }}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Welcome to RouterBase, where seamless connectivity meets innovation.
          Experience fast, reliable, and secure networking like never before.
        </motion.h1>

        <motion.p
          className="text-sm md:text-lg text-[#fbbc05] mb-4"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          The best ISP customer management solution.
        </motion.p>
        <motion.div
          className="flex gap-4 -bottom-20 md:-bottom-24 absolute"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <Link
            to="/signup"
            className="px-6 py-3 bg-[#1a73e8] text-darkBg rounded-lg shadow-lg shadow-black hover:bg-opacity-80"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 border border-[#1a73e8] text-[#1a73e8] rounded-lg shadow-lg hover:bg-[#1a73e8] hover:text-[#121212] transition-all duration-300"
          >
            Login
          </Link>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default LandingPage;
