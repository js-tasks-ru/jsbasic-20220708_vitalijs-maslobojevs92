function truncate(str, maxlength) {
  if (str.length > maxlength) {
    let truncedStr = str.slice(0, maxlength - 1);

    return truncedStr + "…";
  }

  return str;
}

console.log(truncate("Вот, что мне хотелось бы сказать на эту тему:", 20));
