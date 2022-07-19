function camelize(str) {
  let arr = str.split("").map((element, index, arr) => {
    if (element === "-") return;
    if (arr[index - 1] === "-") return element.toUpperCase();

    return element;
  });

  return arr.join("");
}

console.log(camelize("-webkit-transition"));
