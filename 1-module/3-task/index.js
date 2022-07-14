function ucFirst(str) {
  if (typeof str != "string") return false;

  let firstLetter = str.slice(0, 1);

  return firstLetter.toUpperCase() + str.slice(1);
}

console.log(ucFirst("22"));
