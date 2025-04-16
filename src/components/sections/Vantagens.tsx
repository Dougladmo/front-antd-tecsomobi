import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, when: "beforeChildren", staggerChildren: 0.3 },
  },
};

const itemVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};



const Vantagens = () => {
  const navigate = useNavigate()
  
  const handleLinkClick = () => {
    navigate('/pontos-de-recarga')
  }
  
  return (
    <motion.div
      id="vantagens"
      whileInView="visible" 
      variants={containerVariant}
      initial="hidden"
      animate="visible"
      className="flex flex-col md:flex-row w-full items-center pb-10 md:pb-72 mx-auto max-w-7xl relative"
    >
      <motion.div whileInView="visible" variants={itemVariant} className="w-full md:w-1/2 flex items-center justify-center">
        <motion.img
          whileInView="visible" variants={itemVariant}
          src="/blue-bus.png"
          alt="foto da hero"
          className="hidden md:block w-6/12 absolute xl:-left-80 xl:-top-[120px]"
        />
      </motion.div>
      <motion.div
        whileInView="visible" variants={itemVariant}
        className="flex flex-col items-end justify-end w-full md:w-1/2 gap-2 px-5 mt-10 md:mt-0"
      >
        <motion.h2
          whileInView="visible" variants={itemVariant}
          className="text-2xl md:text-5xl leading-normal text-right text-[#000]"
        >
          Vantagens do Tecsomobi Charging Points{" "}
          <motion.img
            whileInView="visible" variants={itemVariant}
            src="/semaforo.gif"
            className="hidden md:block absolute w-[350px] md:right-0 md:-top-[350px] xl:-right-[312px] xl:-top-[110px] z-10"
            alt="gif semaforo"
          />
        </motion.h2>
        <motion.p
          whileInView="visible" variants={itemVariant}
          className="text-base md:text-xl leading-normal text-right"
        >
          Localize pontos de recarga próximos, com informações completas e acesso fácil
          pelo celular ou computador, tudo de forma gratuita e sem cadastro.
        </motion.p>
        <motion.a
          whileInView="visible" variants={itemVariant}
          onClick={handleLinkClick}
          className="from-[#175097] to-[#306EBC] cursor-pointer bg-gradient-to-b text-base md:text-lg mt-12 rounded-2xl px-5 py-5 text-white self-end border border-transparent shadow-md hover:text-[#175097] hover:border-[#175097] hover:from-[#F0F0F0] hover:to-[#F0F0F0] transition duration-300"
        >
          Encontre um ponto de recarga
        </motion.a>
      </motion.div>
    </motion.div>
  );
};

export default Vantagens;
