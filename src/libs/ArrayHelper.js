function* entries(obj) {
    for (let key of Object.keys(obj)) {
      yield [key, obj[key]];
    }  
  }

const checkEqualityElements = (element1, element2) => {
    for (let [key, value] of entries(element1)) {
        if (!element2.hasOwnProperty(key)) return false;
        if (value !== element2[key]) return false;
    }

    return true;
}

const arrayIndexOf = (array, value) => {
    for (let i = 0 ; i < array.length; ++i) {
        if(checkEqualityElements(array[i], value)) return i;
    }

    return -1;
}

const arrayEqual = (array1, array2) => {
    if (array1.length !== array2.length) return false;

    for(let i = 0; i< array1.length; ++i) {
        let result = false;
        for(let j = 0; j < array2.length; ++i) {
            if (checkEqualityElements(array1[i], array2[j])) {
                result = true;
                break;
            }
        }

        if(!result) return false;
    }

    return true;
}

export {arrayIndexOf, arrayEqual};