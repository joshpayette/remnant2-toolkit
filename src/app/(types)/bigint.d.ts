interface BigInt {
  /** Convert to BigInt to string form in JSON.stringify */
  toJSON: () => string
}
BigInt.prototype.toJSON = function () {
  return this.toString()
}
