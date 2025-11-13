export type QuestionType = 'critical-thinking' | 'pattern-recognition' | 'numeral';

export interface Question {
  type: QuestionType;
  question: string;
  code?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const quizData: Question[] = [
  // Critical Thinking Questions
  {
    type: 'critical-thinking',
    question: 'What is the output of the following code?',
    code: `console.log(typeof typeof 1);`,
    options: ['number', 'string', 'undefined', 'object'],
    correctAnswer: 1,
    explanation: 'typeof 1 returns "number" (a string). Then typeof "number" returns "string".',
  },
  {
    type: 'critical-thinking',
    question: 'What will be logged to the console?',
    code: `const arr = [1, 2, 3];
arr[10] = 99;
console.log(arr.length);`,
    options: ['3', '4', '10', '11'],
    correctAnswer: 3,
    explanation: 'Setting arr[10] = 99 creates an array with length 11. Indices 3-9 will be empty slots.',
  },
  {
    type: 'critical-thinking',
    question: 'Which statement about async/await is true?',
    options: [
      'async functions always return a Promise',
      'await can be used outside async functions in modern JavaScript',
      'await pauses the entire JavaScript runtime',
      'async/await is slower than callbacks',
    ],
    correctAnswer: 0,
    explanation: 'Async functions automatically wrap their return value in a Promise, even if you return a non-Promise value.',
  },
  {
    type: 'critical-thinking',
    question: 'What is the time complexity of the following operation?',
    code: `const arr = [1, 2, 3, 4, 5];
arr.shift();`,
    options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
    correctAnswer: 1,
    explanation: 'Array.shift() removes the first element and shifts all remaining elements, making it O(n) where n is the array length.',
  },
  {
    type: 'critical-thinking',
    question: 'What design pattern is demonstrated here?',
    code: `class Database {
  static instance = null;
  
  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}`,
    options: ['Factory Pattern', 'Singleton Pattern', 'Observer Pattern', 'Strategy Pattern'],
    correctAnswer: 1,
    explanation: 'This is the Singleton pattern, which ensures only one instance of a class exists throughout the application.',
  },

  // Pattern Recognition Questions
  {
    type: 'pattern-recognition',
    question: 'Complete the sequence: 2, 4, 8, 16, 32, ?',
    options: ['48', '64', '128', '256'],
    correctAnswer: 1,
    explanation: 'Each number is multiplied by 2. The pattern is powers of 2: 2¹, 2², 2³, 2⁴, 2⁵, 2⁶ = 64.',
  },
  {
    type: 'pattern-recognition',
    question: 'What comes next in the pattern: A1, C3, E5, G7, ?',
    options: ['H8', 'I9', 'I8', 'J9'],
    correctAnswer: 1,
    explanation: 'The pattern skips one letter (A→C→E→G→I) and adds 2 to the number (1→3→5→7→9).',
  },
  {
    type: 'pattern-recognition',
    question: 'Complete the series: 1, 1, 2, 3, 5, 8, 13, ?',
    options: ['18', '19', '21', '24'],
    correctAnswer: 2,
    explanation: 'This is the Fibonacci sequence where each number is the sum of the two preceding numbers: 8 + 13 = 21.',
  },
  {
    type: 'pattern-recognition',
    question: 'What is the next number: 1, 4, 9, 16, 25, ?',
    options: ['30', '36', '49', '64'],
    correctAnswer: 1,
    explanation: 'These are perfect squares: 1², 2², 3², 4², 5², 6² = 36.',
  },
  {
    type: 'pattern-recognition',
    question: 'Find the missing number: 3, 7, 15, 31, 63, ?',
    options: ['95', '127', '128', '255'],
    correctAnswer: 1,
    explanation: 'Each number is (previous × 2) + 1. This gives us powers of 2 minus 1: 2ⁿ - 1. Next: 63 × 2 + 1 = 127.',
  },
  {
    type: 'pattern-recognition',
    question: 'What comes next: 2, 6, 12, 20, 30, ?',
    options: ['40', '42', '44', '48'],
    correctAnswer: 1,
    explanation: 'The differences are 4, 6, 8, 10, 12. Each difference increases by 2. So 30 + 12 = 42.',
  },

  // Numeral Questions
  {
    type: 'numeral',
    question: 'What is 0b1010 + 0b0101 in decimal?',
    options: ['10', '12', '15', '20'],
    correctAnswer: 2,
    explanation: '0b1010 is 10 in decimal, 0b0101 is 5 in decimal. 10 + 5 = 15.',
  },
  {
    type: 'numeral',
    question: 'Convert hexadecimal 0xFF to decimal:',
    options: ['155', '255', '355', '455'],
    correctAnswer: 1,
    explanation: '0xFF represents F × 16¹ + F × 16⁰ = 15 × 16 + 15 = 240 + 15 = 255.',
  },
  {
    type: 'numeral',
    question: 'What is the result of 13 ^ 7 (XOR operation)?',
    options: ['6', '8', '10', '20'],
    correctAnswer: 2,
    explanation: '13 in binary is 1101, 7 is 0111. XOR: 1101 ^ 0111 = 1010 which is 10 in decimal.',
  },
  {
    type: 'numeral',
    question: 'How many bits are needed to represent the number 1000 in binary?',
    options: ['8', '9', '10', '11'],
    correctAnswer: 2,
    explanation: '1000 in binary is 1111101000, which requires 10 bits. 2⁹ = 512, 2¹⁰ = 1024.',
  },
  {
    type: 'numeral',
    question: 'What is the two\'s complement of 5 in 8-bit representation?',
    options: ['11111010', '11111011', '11111100', '11111101'],
    correctAnswer: 1,
    explanation: '5 is 00000101. Invert bits: 11111010. Add 1: 11111011. This represents -5 in two\'s complement.',
  },
  {
    type: 'numeral',
    question: 'What is 100 in octal (base 8) converted to decimal?',
    options: ['8', '64', '100', '512'],
    correctAnswer: 1,
    explanation: '100 in octal = 1 × 8² + 0 × 8¹ + 0 × 8⁰ = 64 + 0 + 0 = 64 in decimal.',
  },
  {
    type: 'numeral',
    question: 'What does the bitwise operation (8 << 2) equal?',
    options: ['2', '4', '16', '32'],
    correctAnswer: 3,
    explanation: 'Left shift by 2 positions multiplies by 2². 8 << 2 = 8 × 4 = 32. Binary: 1000 becomes 100000.',
  },
];
