function showSalary(users, age) {
  let arr = users
    .filter((user) => {
      if (user.age <= age) return user;
    })
    .map((user, index, arr) => {
      return index === arr.length - 1
        ? `${user.name}, ${user.balance}`
        : `${user.name}, ${user.balance}\n`;
    });

  return arr.join("");
}
