import express from 'express';
import calculateBmi from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    console.log(req.query);
    if (!req.query.height || !req.query.weight) {
        res.status(404).json({
            error: "parameters missing"
        });
        return;
    }
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    if (isNaN(height) || isNaN(weight)) {
        res.status(400).json({
            error: "malformatted parameters"
        });
    }
    else {
        const result = calculateBmi(height, weight);
        res.json({
            weight: weight,
            height: height,
            bmi: result
        });
    }
});

app.post('/exercises', (req, res) => {
    console.log(req.body);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!req.body.daily_exercises || !req.body.target) {
        res.status(404).json({
            error: 'parameters missing'
        });
        return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const values: any = req.body.daily_exercises;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const target = Number(req.body.target);

    if (!Array.isArray(values) || isNaN(target)) {
        res.status(400).json({
            error: "malformatted parameters"
        });
    }
    else {
        // converts all items in the array to number and checks that none is NaN 
        const numberValues = values.map(item => Number(item));
        if (numberValues.some(item => isNaN(item))) {
            res.status(400).json({
                error: "malformatted parameters"
            });
        }
        else {
            const result = calculateExercises(target, numberValues);
            res.send(result);
        }
    }
});

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});