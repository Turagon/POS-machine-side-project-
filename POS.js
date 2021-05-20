
const orderLists = document.querySelector('.checkout')
const addDrinkButton = document.querySelector('.drink-confirm')
const checkoutButton = document.querySelector('.checkout-btn')
function acPOS() {}
const acPOS1 = new acPOS()

acPOS.prototype.getCheckedValue = function (inputName) {
  let selectedContent = ''
  document.querySelectorAll(`[name=${inputName}]`).forEach(item => {
    if (item.checked) {
      selectedContent = item.value
    }
  })
  return selectedContent
}

acPOS.prototype.addDrink = function (drink) {
  let orderListsCard = `
  <div class="card-container">
    <div class="card-upper">
      <div class="text-right delete">
        <span data-alpha-pos="delete-drink">×</span>
      </div>
      <h6 class="card-title">${drink.name}</h6>
      <div class="card-text">${drink.type}</div>
      <div class="card-text">${drink.ice}</div>
      <div class="card-text">${drink.sugar}</div>
    </div>
    <div class="card-footer text-right">
      <div class="card-text text-muted">$ <span data-drink-price>${model.drinkPrice(drink.name)}</span></div>
    </div>
  </div>
  `

  orderLists.insertAdjacentHTML('afterbegin', orderListsCard)
}

acPOS.prototype.deleteDrink = function (target) {
  target.remove()
}

acPOS.prototype.checkout = function () {
  let totalAmount = 0
  document.querySelectorAll('[data-drink-price]').forEach(function (drink) {
    totalAmount += Number(drink.textContent)
  })
  return totalAmount
}

acPOS.prototype.clearOrder = function (target) {
  target.querySelectorAll('.card-container').forEach(function (card) {
    card.remove()
  })
}

function Drink (name, type, ice, sugar) {
  this.name = name
  this.type = type
  this.ice = ice
  this.sugar = sugar
}

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
  drinkList: ['Milk Tea', 'Black Tea', 'Green Tea', 'Lemon Tea', 'Oolong Tea', 'Matcha Latte', 'London Fog', 'Coffee Latte'],

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
      case 'Milk Tea':
      case 'Lemon Tea':
        return 35
      case 'Bubble Milk Tea':
      case 'Lemon Green Tea':
      case 'London Fog':
        return 50
      case 'Black Tea Latte':
      case 'Matcha Latte':
      case 'Coffee Latte':
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

addDrinkButton.addEventListener('click', function () {
  const drinkName = acPOS1.getCheckedValue('drink')
  const type = acPOS1.getCheckedValue('type')
  const ice = acPOS1.getCheckedValue('ice')
  const sugar = acPOS1.getCheckedValue('sugar')
  
  if (!drinkName) {
    alert('Please choose at least one item.')
    return
  }

  const drink = new Drink(drinkName, type, ice, sugar)
  acPOS1.addDrink(drink)
})

orderLists.addEventListener('click', function (event) {
  let isDeleteButton = event.target.matches('[data-alpha-pos="delete-drink"]')
  if (!isDeleteButton) {
    return
  }

  acPOS1.deleteDrink(event.target.parentElement.parentElement.parentElement)
})

checkoutButton.addEventListener('click', function () {
  // 1. 計算訂單總金額
  alert(`Total amount of drinks：$${acPOS1.checkout()}`)

  // 2. 清空訂單
  acPOS1.clearOrder(orderLists)
})