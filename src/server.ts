import express, { Request, Response } from "express"
import path from "path"

const PORT = 8005

const app = express()
app.use(express.json())
const productPath = path.join(process.cwd(), '/src/db/products.json')

app.get("/", (req: Request, res: Response) => {
    res.status(200).send({message:"hello world"})
})

app.listen(PORT, () => {
    console.log('application run on port ', PORT)
})