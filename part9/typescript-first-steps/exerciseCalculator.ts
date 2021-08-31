interface ExerciseInput {
    targetValue: number;
    dailyValues: number[];
}

const parseArguments = (args: Array<string>): ExerciseInput => {
    if (args.length < 4) throw new Error('Not enough arguments. You must include target and daily values.');

    if (isNaN(Number(args[2]))) {
        throw new Error('Provided target value was not a number.');
    }

    let valuesArray = [];
    for (let i = 3; i < args.length; i++) {
        if (!isNaN(Number(args[i]))) {
            valuesArray.push(Number(args[i]));
        } else {
            throw new Error('Provided daily values were not numbers');
        }
    }

    return { targetValue: Number(args[2]), dailyValues: valuesArray };
}

interface ExerciseResults {
    periodLength: number;
    trainingDays: number;
    target: number;
    averageTime: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
}

const calculateExercises = (target: number, dailyValues: number[]): ExerciseResults => {
    let countDays = 0;
    let sum = 0;
    for (let i = 0; i < dailyValues.length; i++) {
        sum = +dailyValues[i];
        if (dailyValues[i] > 0) {
            countDays++;
        }
    }
    const arrSum = dailyValues.reduce((a, b) => a + b, 0);
    const average = arrSum / dailyValues.length;

    let rating = 0;
    let ratingString = '';
    if (average >= target) {
        rating = 3;
        ratingString = 'Perfect, you reached the target!'
    }
    else if (average > 0.8 * target) {
        rating = 2;
        ratingString = 'Not too bad (over 80% of target) but you could still do better.'
    }
    else {
        rating = 1;
        ratingString = 'You did not do so well... Please try to get closer to your target!';
    }

    return {
        periodLength: dailyValues.length,
        trainingDays: countDays,
        target: target,
        averageTime: average,
        success: average >= target ? true : false,
        rating: rating,
        ratingDescription: ratingString
    }

}

try {
    const { targetValue, dailyValues } = parseArguments(process.argv);
    console.log(calculateExercises(targetValue, dailyValues));
} catch (e) {
    console.log('Error encountered, message: ', e.message);
}

// Run the program with command:
// npm run calculateExercises target [dailyValues]
// target => must be a number eg. 2
// [dailyValues] => must be a sequence of numbers eg. 2 2 1 0 1 0 1