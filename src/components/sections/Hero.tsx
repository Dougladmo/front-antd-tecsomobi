import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const containerVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, when: "beforeChildren", staggerChildren: 0.3 } },
};

const itemVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const Hero = () => {
  const navigate = useNavigate()
  
  const handleLinkClick = () => {
    navigate('/pontos-de-recarga')
  }

  return (
    <motion.div
      id="hero"
      whileInView="visible"
      variants={containerVariant}
      initial="hidden"
      animate="visible"
      className="flex flex-col-reverse md:flex-row w-full pt-10 md:pt-28 pb-10 md:pb-72 mx-auto max-w-[1400px]"
    >
      <motion.div whileInView="visible" variants={itemVariant} className="flex flex-col items-start justify-start w-full md:w-1/2 gap-2 px-5">
        <motion.h1 whileInView="visible" variants={itemVariant} className="text-2xl md:text-[47px] leading-normal text-left text-[#002D65]">
          Saiba onde carregar o seu cartão de transporte.
        </motion.h1>
        <motion.p whileInView="visible" variants={itemVariant} className="text-base md:text-lg leading-normal text-left max-w-xl">
          Com o Tecsomobi Charging Points, você encontra facilmente os pontos de recarga mais próximos para seu cartão de mobilidade urbana. Praticidade no seu dia a dia.
        </motion.p>
        <motion.a
          whileInView="visible" variants={itemVariant}
          onClick={handleLinkClick}
          className="from-[#175097] to-[#306EBC] cursor-pointer bg-gradient-to-b text-base md:text-lg mt-5 rounded-2xl px-5 py-5 text-[#F0F0F0] self-start border border-transparent shadow-md hover:text-[#175097] hover:border-[#175097] hover:from-[#F0F0F0] hover:to-[#F0F0F0] transition duration-300"
        >
          Encontre um ponto de recarga
        </motion.a>
        <motion.div whileInView="visible" variants={itemVariant} className="flex items-center gap-3">
          <motion.div whileInView="visible" variants={itemVariant} className="bg-[#FF5627] w-[45px] h-[25px] mt-14" />
          <motion.div whileInView="visible" variants={itemVariant} className="bg-[#175097] w-[45px] h-[25px] mt-14" />
          <motion.div whileInView="visible" variants={itemVariant} className="bg-[#84D6DA] w-[45px] h-[25px] mt-14" />
        </motion.div>
      </motion.div>
      <motion.div whileInView="visible" variants={itemVariant} className="w-full md:w-1/2 flex items-center justify-center mt-10 md:mt-0">
        <motion.img
          whileInView="visible" variants={itemVariant}
          src="/hero-bus.png"
          alt="foto da hero"
          className="w-11/12 md:w-full select-none"
        />
      </motion.div>
    </motion.div>
  );
};

export default Hero;
