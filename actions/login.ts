'use server'

import { NextResponse } from "next/server"

// TODO: Testing for now
export const login = (values: any) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (values.email === 'admin@gmail.com' && values.password === 'admin') {
        console.log(values)
        resolve(true)
        console.log('Login success')
      } else {
        reject(new Error('Login failed'))
      }
    }, 1000)
  })
}

