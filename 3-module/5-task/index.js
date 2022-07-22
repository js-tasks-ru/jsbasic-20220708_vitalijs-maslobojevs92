function getMinMax(str) {
  let numbers = str.split(" ").filter((element) => {
    return !isNaN(Number(element));
  });

  return {
    min: Math.min.apply(null, numbers),
    max: Math.max.apply(null, numbers),
  };
}
