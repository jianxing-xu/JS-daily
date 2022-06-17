console.log('start')
console.log(process.nextTick)
process.nextTick(() => {
  console.log('ticker')
})
console.log('end')

