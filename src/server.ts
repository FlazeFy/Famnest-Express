import express, { Request, Response } from "express"

const PORT = 8005

const app = express()
app.use(express.json())

app.get("/", (req: Request, res: Response) => {
    res.status(200).send({message:"hello world"})
})

app.listen(PORT, () => {
    console.log('application run on port ', PORT)
})