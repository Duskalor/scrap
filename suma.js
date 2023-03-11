const sum = (num) => {
  let ns = 0;
  for (let i = num; i > 0; i--) {
    ns = ns + i;
  }
  return ns;
};

console.log(sum(4));
console.log(sum(10));
console.log(sum(15));
