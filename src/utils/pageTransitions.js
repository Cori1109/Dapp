
const pageVariants = {
    initial: {
      opacity: 0,
      x: "-100vw",
      scale: 1
    },
    in: {
      opacity: 1,
      x: 0,
      scale: 1
    },
    out: {
      opacity: 0,
      x: "100vw",
      scale: 1
    }
};

const pageVariantsLeft = {
  initial: {
    opacity: 0,
    x: "100vw",
    scale: 1
  },
  in: {
    opacity: 1,
    x: 0,
    scale: 1
  },
  out: {
    opacity: 0,
    x: "-100vw",
    scale: 1
  }
};
  
const pageTransition = {
    type: "spring",
    duration: 0.5
};
  
export { pageVariants, pageTransition, pageVariantsLeft }