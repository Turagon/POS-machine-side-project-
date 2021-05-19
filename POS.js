
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
  },

  renderOption (className) {
    let domObj = document.querySelector(`.${className}`)
    domObj.innerHTML = `<div class="selection">${className} : </div>`
    model[className].forEach(item => {
      return domObj.innerHTML += `
        <label class="btn btn-outline-primary">
          <input type="radio" name="${className}" value="${item}" />${item}
        </label>
      `
    })
  }
}

const model = {
  drinkList: ['Milk tea', 'Black tea', 'Green tea', 'Lemon tea', 'Oolong tea', 'Matcha latte', 'London fog', 'Coffee latte'],

  type: ['cold', 'hot'],

  ice: ['no ice', 'less ice', 'half ice', 'normal'],

  sugar: ['no sugar', 'less sugar', 'half sugar', 'normal'],

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
view.renderOption('type')
view.renderOption('ice')
view.renderOption('sugar')