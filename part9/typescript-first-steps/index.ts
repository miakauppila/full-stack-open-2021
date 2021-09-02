import express from 'express';
const app = express();
import calculateBmi from './bmiCalculator';

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    console.log(req.query);
    if(!req.query.height || !req.query.weight) {
        res.status(404).json({
            error: "parameters missing"
        });
    }
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    if (isNaN(height) || isNaN(weight)) {
        res.status(400).json({
            error: "malformatted parameters"
        });
    }
    const result = calculateBmi(height, weight);
    res.json({
        weight: weight,
        height: height,
        bmi: result
    });
});

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});