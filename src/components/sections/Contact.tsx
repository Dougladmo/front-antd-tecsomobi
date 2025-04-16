const Contact = () => {
  return (
    <div
      id="contact"
      className="flex flex-col items-center md:flex-row w-full py-10 md:py-24 mx-auto max-w-7xl"
    >
      <div className="flex flex-col items-start justify-start w-full md:w-1/2 gap-2 px-5">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-[#FF5627] w-[47px] h-[22px] mt-14"></div>
          <div className="bg-[#175097] w-[45px] h-[22px] mt-14"></div>
          <div className="bg-[#84D6DA] w-[45px] h-[22px] mt-14"></div>
        </div>
        <h2 className="text-2xl md:text-[47px] leading-normal text-left text-[#002D65]">
          Contatos
        </h2>
        <p className="text-base md:text-xl leading-normal text-left">
          Tel (11)3060-3912
        </p>
        <p className="text-base md:text-xl leading-normal text-left">
          comercial@tecsomobi.com.br
        </p>
        <p className="max-w-sm mt-10 text-base md:text-xl leading-normal text-left">
          Coronel Joaquim Ferreira Lobo 253, Subsl 01, 04544150, Vila Nova
          Conceição, São Paulo São Paulo
        </p>
      </div>
      <div className="flex items-center justify-center w-full md:w-1/2 mt-10 md:mt-0">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.306517681651!2d-46.68463602388287!3d-23.593337662769226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce574f87c15b8d%3A0x610a339612a19633!2sEstacionamento%20-%20R.%20Cel.%20Joaquim%20Ferreira%20Lobo%2C%20253%20-%20Vila%20Nova%20Concei%C3%A7%C3%A3o%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2004544-150!5e0!3m2!1spt-BR!2sbr!4v1744768657882!5m2!1spt-BR!2sbr"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-11/12 md:w-10/12 shadow-2xl rounded-2xl h-72"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
