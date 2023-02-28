// get number and return in persian number
function persianNum(number) {
    return new Promise(resolve => {
        number = typeof number === "string" ? number : String(number);
        const persianNumbers = { 0: '۰', 1: '۱', 2: '۲', 3: '۳', 4: '۴', 5: '۵', 6: '۶', 7: '۷', 8: '۸', 9: '۹' };
        let perNum = [...number].map(x => { return persianNumbers[x] });
        resolve(perNum.join(''));
    });
}

// get number and return in words
function numberToWords(number) {
    number = typeof number === "string" ? number : String(number);
    return new Promise(async (resolve) => {
        while (number.length % 3 !== 0) {
            number = '0' + number;
        }
        scopeBreak = number.match(/.{1,3}/g);
        intScopeBreak = scopeBreak.map(x => { return parseInt(x) });

        const scopes = ['', '', 'هزار', 'میلیون', 'میلیارد'];
        let numberString = '';
        for (let i = 0; i < intScopeBreak.length; i++) {
            numberString += intScopeBreak[i] ? await persianNum(intScopeBreak[i]) + ' ' + scopes[intScopeBreak.length - i] : '';
            numberString += intScopeBreak[i + 1] ? ' و ' : '';
        }
        resolve(numberString);
    });
}

// get number and return in human readbale format
function makeReadablePrice(price) {
    price = typeof price === "string" ? price : String(price);
    return new Promise(resolve => {
        let readablePrice = '';
        let counter = 0;
        for (let i = price.length - 1; i >= 0; i--) {
            if (counter == 3) {
                readablePrice = ',' + readablePrice;
                counter = 0;
            }
            readablePrice = price.charAt(i) + readablePrice;
            counter++
        }
        resolve(readablePrice);
    });
}
