import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { when: "beforeChildren", staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const StepByStep = () => {
  const navigate = useNavigate()
  
  const handleLinkClick = () => {
    navigate('/pontos-de-recarga')
  }

  return (
    <motion.div
      id="steps"
      whileInView="visible"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full mx-auto flex flex-col md:flex-row items-center bg-[#012757] py-10 md:py-28"
    >
      <motion.div
        whileInView="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto flex md:flex-row flex-col items-center justify-center"
      >
        <motion.div
          whileInView="visible"
          variants={itemVariants}
          className="w-full md:w-1/2 px-5 flex flex-col justify-start items-start gap-2 text-[#fff]"
        >
          <motion.h2
            whileInView="visible"
            variants={itemVariants}
            className="text-2xl md:text-5xl font-semibold leading-normal text-right"
          >
            Passo a passo
          </motion.h2>
          <motion.ol
            whileInView="visible"
            variants={itemVariants}
            className="flex flex-col gap-8 text-base md:text-xl font-medium mt-5"
          >
            <motion.li whileInView="visible"
            variants={itemVariants} className="flex items-center gap-4 md:gap-8">
              <span className="text-4xl md:text-[64px] font-[quicksand] font-normal">1</span>
              Acesse a plataforma.
            </motion.li>
            <motion.li whileInView="visible"
            variants={itemVariants} className="flex items-center gap-4 md:gap-8">
              <span className="text-4xl md:text-[64px] font-[quicksand] font-normal">2</span>
              Permita acesso ao GPS para vermos os pontos mais proximos.
            </motion.li>
            <motion.li whileInView="visible"
            variants={itemVariants} className="flex items-center gap-4 md:gap-8">
              <span className="text-4xl md:text-[64px] font-[quicksand] font-normal">3</span>
              Visualize os pontos de recarga no mapa.
            </motion.li>
            <motion.li whileInView="visible"
            variants={itemVariants} className="flex items-center gap-4 md:gap-8">
              <span className="text-4xl md:text-[64px] font-[quicksand] font-normal">4</span>
              Escolha o ponto ideal para você e recarregue seu cartão com facilidade apenas aproximando da máquina.
            </motion.li>
          </motion.ol>
        </motion.div>
        <motion.div
          whileInView="visible"
          variants={itemVariants}
          className="w-full md:w-1/2 flex flex-col items-center justify-center gap-5 mt-10 md:mt-0"
        >
          <motion.div whileInView="visible"
          variants={itemVariants} className="flex items-end justify-end w-full">
            <motion.video
              whileInView="visible"
              variants={itemVariants}
              src="/recharge.mp4"
              autoPlay
              loop
              muted
              className="object-cover rounded-full w-11/12 md:w-auto"
            />
          </motion.div>
          <motion.a
            whileInView="visible"
            variants={itemVariants}
            onClick={handleLinkClick}
            className="from-[#fff] to-[#fff] bg-gradient-to-b cursor-pointer text-base md:text-lg mt-5 rounded-2xl px-5 py-5 text-[#175097] shadow-md hover:text-[#F0F0F0] hover:from-[#175097] hover:to-[#306EBC] transition duration-300"
          >
            Encontre um ponto de recarga
          </motion.a>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default StepByStep;
