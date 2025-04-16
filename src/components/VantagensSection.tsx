import { motion } from "framer-motion";

export default function VantagensSection() {
  return (
    <motion.div
      id="vantagens"
      className=" flex flex-col md:flex-row w-full items-center pb-20 md:pb-72 mx-auto max-w-7xl overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="w-full md:w-1/2 flex items-center justify-center "
        initial={{ x: -50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <img
          src="/blue-bus.png"
          alt="foto da hero"
          className="hidden md:block w-5/12 absolute left-0 top-[150px]"
        />
      </motion.div>

      <motion.div
        className=" flex flex-col items-start justify-start w-full md:w-1/2 gap-2 px-5 mt-10 md:mt-0"
        initial={{ x: 50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl md:text-5xl leading-normal text-right text-[#000]">
          Vantagens do Tecsomobi Charging Points{" "}
          <motion.img
            src="/semaforo.gif"
            alt="gif semaforo"
            className="hidden md:block absolute w-[600px] lg:w-[700px] xl:w-[800px] -right-44 top-[180px] z-10"
            initial={{ rotate: -10, opacity: 0 }}
            whileInView={{ rotate: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
        </h2>
        <p className="text-base md:text-xl leading-normal text-right">
          Localize pontos de recarga próximos, com informações completas e
          acesso fácil pelo celular ou computador, tudo de forma gratuita e
          sem cadastro.
        </p>
        <a
          className="from-[#175097] to-[#306EBC] bg-gradient-to-b text-sm md:text-lg mt-12 rounded-2xl px-5 py-5 text-white self-end"
          href="#"
        >
          Encontre um ponto de recarga
        </a>
      </motion.div>
    </motion.div>
  );
}
