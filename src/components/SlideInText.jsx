import { motion } from "framer-motion";

const SlideInText = ({ text, className = "" }) => {
  return (
    <p className={className}>
      {text.split('').map((char, i) => {
        if (char === ' ') {
          return <span key={i}> </span>;
        }
        return (
          <motion.span
            key={i}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.01, ease: "easeOut" }}
            className="inline-block"
          >
            {char}
          </motion.span>
        );
      })}
    </p>
  );
};

export default SlideInText;
