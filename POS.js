
const view = {
  renderDrinkList () {
    const drinkTable = document.querySelector('.drink-list')
    drinkTable.innerHTML = ''
    model.drinkList.forEach(item => {
      return drinkTable.innerHTML += `
        <div class="card">
          <label class="card-body">
            <h5 class="card-title">${item}</h5>
            <input type="radio" name="drink" value="${item}">
          </label>
        </div>
      `
    })
  }
}

const model = {
  drinkList: ['Milk tea', 'Black tea', 'Green tea', 'Lemon tea', 'Oolong tea', 'Matcha latte', 'London fog', 'Coffee latte'],

  drinkPrice (drinkName) {
    switch (drinkName) {
      case 'Black Tea':
      case 'Oolong Tea':
      case 'Baozong Tea':
      case 'Green Tea':
        return 30
      case 'Bubble Milk Tea':
      case 'Lemon Green Tea':
        return 50
      case 'Black Tea Latte':
      case 'Matcha Latte':
        return 55
      default:
        alert('No this drink')
    }
  }
}

view.renderDrinkList()