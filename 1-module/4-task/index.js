function checkSpam(str) {
  let pureString = str.toLowerCase();

  return pureString.includes("1xbet") || pureString.includes("xxx");
}

console.log(checkSpam("test1xBettest"));
