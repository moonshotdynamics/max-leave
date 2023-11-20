
const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-mediumTurquoise to-mutedTurquoise text-white fixed inset-x-0 bottom-0">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <p className="text-white text-sm text-center sm:text-left">
            © {new Date().getFullYear()} Leave Maximizer
          </p>

          <a
            href="https://www.buymeacoffee.com/isaac7"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white hover:text-yellow-300 transition-colors duration-300"
          >
            <div className="flex items-center font-bold">
              <span role="img" aria-label="coffee" className="w-5 h-5 mr-2 ">
                ☕
              </span>
              Buy Me a Coffee
            </div>
          </a>
        </div>
      </div>
    </footer>
  );
};


export default Footer;
