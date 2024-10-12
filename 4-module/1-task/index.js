function makeFriendsList(friends) {
  let ul = document.createElement('ul')
    for (let item of friends) {
        let li = document.createElement('li')
        li.innerHTML = `${item.firstName} ${item.lastName}`
        ul.appendChild(li);
      }
      return ul 
}
