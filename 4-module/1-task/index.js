function makeFriendsList(friends) {
  let friendsList = document.createElement("UL");

  for (let friend of friends) {
    friendsList.insertAdjacentHTML(
      "beforeend",
      `<li>${friend.firstName} ${friend.lastName}</li>`
    );
  }

  return friendsList;
}
