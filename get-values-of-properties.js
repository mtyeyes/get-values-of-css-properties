( function(propertiesToSearch) {
  getComputedStyles = (arr) => {
    let computedStyles = [];
    for (let element of arr) {
      computedStyles.push(window.getComputedStyle(element));
    }
    return computedStyles;
  };

  removeWhiteSpaces = (arr) => {
    let arrWithoutSpaces = arr.filter(Boolean);
    return arrWithoutSpaces;
  };

  findAndCountUniqueValues = (arr) => {
    let uniqueValuesCount = {};
    for (let i = 0; i < arr.length; i++) {
      if (arr.indexOf(arr[i]) === i) {
        uniqueValuesCount[arr[i]] = 1;
      } else {
        ++uniqueValuesCount[arr[i]];
      }
    };
    return uniqueValuesCount;
  };

  sortKeysByValue = (obj) => {
    let sortedArr = [];
    while (Object.keys(obj).length !== 0) {
      let maxValue = 0
      for (let key in obj) {
        if (maxValue < obj[key]) {
          maxValue = obj[key];
        }
      }
      let maxKey = Object.keys(obj).find(key => obj[key] === maxValue);
      sortedArr.push(maxKey+' : '+maxValue);
      delete obj[maxKey];
    }
    return sortedArr;
  };

  getPropertyValues = (propertyName) => {
    let allElements = document.querySelectorAll('*');
    let propertyValues = [];
    for (let allElementStyles of getComputedStyles(allElements)) {
      propertyValues.push(allElementStyles.getPropertyValue(propertyName));
    }
    propertyValues = removeWhiteSpaces(propertyValues);
    propertyValues = findAndCountUniqueValues(propertyValues);
    propertyValues = sortKeysByValue(propertyValues);
    return propertyValues;
  };

  run = () => {
    let result;
    if (typeof propertiesToSearch === 'string') {
      result = getPropertyValues(propertiesToSearch);
    } else if (Array.isArray(propertiesToSearch)) {
      propertiesToSearch.forEach(property => result[property] = getPropertyValues(property))
    } else {
      result = 'invalid input';
    };
    return result;
  };

  return run();
})(['font-size','color', 'font-family']);