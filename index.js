const fs = require("fs")
const puppeteer = require("puppeteer")
const url = "https://traversymedia.com"

async function run (){
    const browser = await puppeteer.launch()

    const page = await browser.newPage()

    await page.goto(`${url}`)


    //await page.screenshot({ path: "example.png", fullPage:true})
    // await page.pdf({ path: "example.pdf", format: "A4"})

    // const html = await page.content()
    // console.log(html)

    // const title = await page.evaluate(()=> document.title)
    // console.log(title)

    // const text = await page.evaluate(() => document.body.innerText)
    // console.log(text)

    // const links = await page.evaluate(()=> Array.from(document.querySelectorAll("a"), (e) => e.href))
    // console.log(links)

    // const courses = await page.evaluate(()=> Array.from(document.querySelectorAll("#courses .card"), (e) => ({
    //     title : e.querySelector(".card-body h3").innerText,
    //     url : e.querySelector(".card-footer a").href
    // })))
    // console.log(courses)


    
    /////////////          BETTER ALTERNATIVE using $$eval()           //////////////

    const courses = await page.$$eval("#courses .card", (element) => element.map(e => ({
        title : e.querySelector(".card-body h3").innerText,
        url : e.querySelector(".card-footer a").href
    })))
    // console.log(courses)

    /////////////          SAVE DATA TO JSON FILE          //////////////
    fs.writeFile("courses.json", JSON.stringify(courses), err => {
        if (err) throw err
        console.log("File saved!")
    })


    await browser.close()
}

run()