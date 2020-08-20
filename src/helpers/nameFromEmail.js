const getName = email => {
  const arr = [...email];
  const newArr = [];
  arr.every(sign => (sign !== '@' ? newArr.push(sign) : false));
  return newArr.join('');
};

module.exports = getName;
