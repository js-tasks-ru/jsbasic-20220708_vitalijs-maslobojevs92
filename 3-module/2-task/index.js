function filterRange(arr, a, b) {
  let newArr = arr.slice(0);

  return newArr.filter((element) => {
    for (let i = a; i <= b; i++) {
      if (i === element) return true;
    }
  });
}
