const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 text-center">
      <div className="container mx-auto px-4">
        <div className="text-sm">
          &copy; {new Date().getFullYear()} cookthecode.io - No actual code was harmed in the making of this website
        </div>
        <div className="italic mt-3 text-sm text-gray-300">
          How many programmers does it take to change a light bulb? None, that's a hardware problem!
        </div>
      </div>
    </footer>
  );
};

export default Footer;