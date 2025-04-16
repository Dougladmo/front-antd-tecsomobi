import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      when: 'beforeChildren',
      staggerChildren: 0.3,
    },
  },
}

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const PageNotFound = () => {
  const navigate = useNavigate()

  const handleHome = () => {
    navigate('/')
  }

  return (
    <motion.div
      variants={containerVariant}
      initial="hidden"
      animate="visible"
      className="flex flex-col-reverse md:flex-row items-center justify-between w-full min-h-screen p-5 md:p-20 bg-[#F0F4FA]"
    >
      <motion.div
        variants={itemVariant}
        className="w-full md:w-1/2 flex flex-col items-start gap-4 px-5"
      >
        <motion.h1
          variants={itemVariant}
          className="text-4xl md:text-[56px] font-bold text-[#002D65]"
        >
          404 - Página Não Encontrada
        </motion.h1>
        <motion.p
          variants={itemVariant}
          className="text-lg md:text-2xl text-[#333] max-w-lg"
        >
          Ops! Parece que você se perdeu. Esta página não existe ou foi removida.
        </motion.p>
        <motion.button
          variants={itemVariant}
          onClick={handleHome}
          className="mt-6 bg-gradient-to-b from-[#175097] to-[#306EBC] text-white rounded-2xl px-6 py-4 text-lg cursor-pointer border border-transparent shadow-md hover:text-[#175097] hover:border-[#175097] hover:from-[#F0F0F0] hover:to-[#F0F0F0] transition duration-300"
        >
          Voltar ao Início
        </motion.button>
      </motion.div>
      
    </motion.div>
  )
}

export default PageNotFound
