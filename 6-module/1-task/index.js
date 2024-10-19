/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.rows = rows
    this.render();
    this.addEventListeners();
  }

  render() {
    this.elem = document.createElement('TABLE')
    this.elem.innerHTML = this.rows.map(({ name, age, salary, city }) => `
    <tr>
    <td>${name}</td>
    <td>${age}</td> 
    <td>${salary}</td>   
    <td>${city}</td>  
    <td><button>X</button></td>
    </tr>
    `)

  }

  addEventListeners() {
    this.elem.addEventListener('click', event => {
      let btn = event.target.closest('button');
      let tr = event.target.closest('tr');
      if (btn) {
        tr.remove();
      }
    })
    
  }
}
