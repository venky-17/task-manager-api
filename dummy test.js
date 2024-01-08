// const newpro = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     //resolve("success")
//     reject("failed");
//   }, 2000);
// });

// newpro
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err, "error");
//   });
// PROMISES;

const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setInterval(() => {
      resolve(a + b);
    }, 2000);
  });
};

add(5, 9)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

add(3, 5)
  .then((sum) => {
    console.log(sum, "first then");
    return add(sum, 7);
  })
  .then((sum2) => {
    console.log(sum2, "second then");
    return add(sum2, 9);
  })
  .catch((err) => {
    console.log(err);
  });
