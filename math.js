function fibonacci(n) {
  let a = 0, b = 1;
  const arr = [];

  for (let i = 0; i < n; i++) {
    arr.push(a);
    [a, b] = [b, a + b];
  }
  return arr;
}




function isPrime(num) {
  if (num <= 1) return false;
  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) return false;
  }
  return true;
}






function getPrimes(arr) {
  return arr.filter(x => Number.isInteger(x) && isPrime(x));
}




function gcd(a, b) {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}






function hcf(arr) {
  return arr.reduce((a, b) => gcd(a, b));
}





function lcmTwo(a, b) {
  return Math.abs(a * b) / gcd(a, b);
}








function lcm(arr) {
  return arr.reduce((a, b) => lcmTwo(a, b));
}




module.exports = { fibonacci, getPrimes, hcf, lcm };
