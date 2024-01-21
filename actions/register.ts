export const register = (values: any) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // TODO: Obviously you don't do this 😂 Just testing
      if (values.email === "fake@email.com" && values.password === "12345678" && values.name === "12345678") {
        resolve(true)
        console.log(values)
        console.log('Register Successful')
      }
      else {
        reject(new Error("Something went wrong [REGISTER]"))
      }
    }, 1000)
  })
}