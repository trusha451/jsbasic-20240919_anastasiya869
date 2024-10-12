function highlight(table) {
  let tableBody = table.querySelector('tbody');
    for (let row of tableBody.rows){
      let age = row.cells[1]
      let gender = row.cells[2]
      let status = row.cells[3]

      row.classList.add(status.dataset.available === 'true' ? 'available' : 'unavailable')

      if (status.dataset.available === undefined) {
        row.hidden = true
      }


      row.classList.add(gender.innerHTML === 'm' ? 'male' : 'female')

      let mature = parseInt(age.innerHTML)
      if (mature < 18) {
        row.style.textDecoration = 'line-through';
    }
    }


}
