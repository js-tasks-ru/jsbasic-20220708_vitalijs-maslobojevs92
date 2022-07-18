function sumSalary(salaries) {
  let result = 0;

  for (salary in salaries) {
    if (typeof salaries[salary] == "number" && isFinite(salaries[salary])) {
      result += salaries[salary];
    }
  }

  return result;
}
