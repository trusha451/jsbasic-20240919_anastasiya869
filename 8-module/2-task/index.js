import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.elem = createElement(`
      <div class="products-grid">
        <div class="products-grid__inner">
        </div>
      </div>`)

    this.render()
  }

  render() {
    const innerElem = this.elem.querySelector('.products-grid__inner')
    innerElem.innerHTML = ''

    for (let product of this.products) {
      if (this.filters.noNuts && product.nuts)
        continue

      if (this.filters.vegeterianOnly && !product.vegeterian)
        continue

      if (this.filters.maxSpiciness !== undefined &&
        product.spiciness > this.filters.maxSpiciness)
        continue

      if (this.filters.category && product.category != this.filters.category)
        continue

      const productObj = new ProductCard(product)
      innerElem.appendChild(productObj.elem)
    }
  }

  updateFilter(filters) {
    Object.assign(this.filters, filters)
    this.render()
  }
}