const valuesOfPropertiesByMty = {
  propertiesToSearch : ['font-size','color', 'font-family'],
  listOfElements : document.querySelectorAll('*'),
  getComputedStyles(list) {
    let computedStyles = [];
    for (let element of list) {
      computedStyles.push(window.getComputedStyle(element));
    }
    return computedStyles;
  },
  removeWhiteSpaces(arr) {
    let arrWithoutSpaces = arr.filter(Boolean);
    return arrWithoutSpaces;
  },
  findAndCountUniqueValues(arr) {
    let uniqueValuesCount = {};
    for (let i = 0; i < arr.length; i++) {
      if (arr.indexOf(arr[i]) === i) {
        uniqueValuesCount[arr[i]] = 1;
      } else {
        uniqueValuesCount[arr[i]] = ++uniqueValuesCount[arr[i]];
      }
    };
    return uniqueValuesCount;
  },
  sortKeysByValue(obj) {
    let sortedObj = {};
    while (Object.keys(obj).length !== 0) {
      let maxValue = 0
      for (let key in obj) {
        if (maxValue < obj[key]) {
          maxValue = obj[key];
        }
      }
      let maxKey = Object.keys(obj).find(key => obj[key] === maxValue);
      sortedObj[maxKey] = maxValue;
      delete obj[maxKey];
    }
    return sortedObj;
  },
  getPropertyValues(propertyName) {
    let propertyValuesList = [];
    for (let allElementStyles of this.getComputedStyles(this.listOfElements)) {
      propertyValuesList.push(allElementStyles.getPropertyValue(propertyName));
    }
    propertyValuesList = this.removeWhiteSpaces(propertyValuesList);
    propertyValuesList = this.findAndCountUniqueValues(propertyValuesList);
    propertyValuesList = this.sortKeysByValue(propertyValuesList);
    return propertyValuesList;
  },
  run() {
    for (let propertyName of this.propertiesToSearch) {
      this[propertyName] = this.getPropertyValues(propertyName);
    }
  }
}

valuesOfPropertiesByMty.run();