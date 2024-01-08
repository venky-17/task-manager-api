const {celsiusToFarh, farhtoCelsius} = require('./math')

test('xelsius to far', ()=>{
    expect(celsiusToFarh(0)).toBe(32)
})

test("farg to cel", ()=>{
    expect(farhtoCelsius(32)).toBe(0)
})

// test("fail bound", (done)=>{
//    setTimeout(()=>{
//     expect(2).toBe(2)
//     done()
//    },2000)
// })