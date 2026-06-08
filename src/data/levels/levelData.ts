// Level 1 - Introduction to English
export const level1 = {
  id: 1,
  chapterId: 1,
  title: "Hello, World!",
  description: "Learn basic greetings and introductions",
  questions: [
    {
      id: "l1_q1",
      type: "vocabulary" as const,
      question: "What is the English word for '你好'?",
      options: ["Hello", "Goodbye", "Thank you", "Sorry"],
      correctAnswer: "Hello",
      explanation: "'Hello' is the most common greeting in English.",
      difficulty: 1
    },
    {
      id: "l1_q2",
      type: "vocabulary" as const,
      question: "How do you say '再见' in English?",
      options: ["Hello", "Goodbye", "Welcome", "Sorry"],
      correctAnswer: "Goodbye",
      explanation: "'Goodbye' is used when parting.",
      difficulty: 1
    },
    {
      id: "l1_q3",
      type: "grammar" as const,
      question: "Complete: Hello, my ___ is Matilda.",
      options: ["name", "book", "house", "car"],
      correctAnswer: "name",
      explanation: "We use 'name' when introducing ourselves.",
      difficulty: 1
    }
  ],
  requiredStars: 0,
  rewards: {
    coins: 50,
    experience: 10
  }
}

// Level 2 - Numbers
export const level2 = {
  id: 2,
  chapterId: 1,
  title: "Counting Fun",
  description: "Learn numbers 1-10",
  questions: [
    {
      id: "l2_q1",
      type: "vocabulary" as const,
      question: "What number is '一'?",
      options: ["One", "Two", "Three", "Four"],
      correctAnswer: "One",
      explanation: "'One' is the first number.",
      difficulty: 1
    },
    {
      id: "l2_q2",
      type: "vocabulary" as const,
      question: "What number is '七'?",
      options: ["Five", "Six", "Seven", "Eight"],
      correctAnswer: "Seven",
      explanation: "Seven is the number after six.",
      difficulty: 1
    },
    {
      id: "l2_q3",
      type: "vocabulary" as const,
      question: "How many fingers do you have?",
      options: ["Five", "Ten", "Eight", "Two"],
      correctAnswer: "Ten",
      explanation: "We have 10 fingers (5 on each hand).",
      difficulty: 1
    }
  ],
  requiredStars: 0,
  rewards: {
    coins: 60,
    experience: 15
  }
}

// Level 3 - Colors
export const level3 = {
  id: 3,
  chapterId: 1,
  title: "Rainbow Colors",
  description: "Learn basic colors",
  questions: [
    {
      id: "l3_q1",
      type: "vocabulary" as const,
      question: "What color is the sky?",
      options: ["Blue", "Red", "Green", "Yellow"],
      correctAnswer: "Blue",
      explanation: "The sky is typically blue.",
      difficulty: 1
    },
    {
      id: "l3_q2",
      type: "vocabulary" as const,
      question: "What color is grass?",
      options: ["Blue", "Red", "Green", "Purple"],
      correctAnswer: "Green",
      explanation: "Grass is green.",
      difficulty: 1
    },
    {
      id: "l3_q3",
      type: "vocabulary" as const,
      question: "What color is the sun?",
      options: ["Orange", "Yellow", "White", "Black"],
      correctAnswer: "Yellow",
      explanation: "The sun is yellow.",
      difficulty: 1
    }
  ],
  requiredStars: 3,
  rewards: {
    coins: 70,
    experience: 20
  }
}

// Level 4 - Family
export const level4 = {
  id: 4,
  chapterId: 1,
  title: "My Family",
  description: "Learn family members",
  questions: [
    {
      id: "l4_q1",
      type: "vocabulary" as const,
      question: "Who is your mother's mother?",
      options: ["Sister", "Grandmother", "Aunt", "Daughter"],
      correctAnswer: "Grandmother",
      explanation: "Your grandmother is your mother's or father's mother.",
      difficulty: 2
    },
    {
      id: "l4_q2",
      type: "vocabulary" as const,
      question: "What do you call your father's son?",
      options: ["Brother", "Cousin", "Nephew", "Uncle"],
      correctAnswer: "Brother",
      explanation: "Your father's son is your brother.",
      difficulty: 2
    }
  ],
  requiredStars: 6,
  rewards: {
    coins: 80,
    experience: 25
  }
}

// Level 5 - Food
export const level5 = {
  id: 5,
  chapterId: 1,
  title: "Yummy Food",
  description: "Learn food vocabulary",
  questions: [
    {
      id: "l5_q1",
      type: "vocabulary" as const,
      question: "What fruit is red and sweet?",
      options: ["Apple", "Banana", "Orange", "Grape"],
      correctAnswer: "Apple",
      explanation: "Apples are red or green and taste sweet.",
      difficulty: 2
    },
    {
      id: "l5_q2",
      type: "vocabulary" as const,
      question: "What do you drink in the morning?",
      options: ["Water", "Coffee", "Juice", "All of above"],
      correctAnswer: "All of above",
      explanation: "You can drink any of these in the morning.",
      difficulty: 2
    }
  ],
  requiredStars: 9,
  rewards: {
    coins: 90,
    experience: 30
  }
}

// Level 6 - Animals
export const level6 = {
  id: 6,
  chapterId: 2,
  title: "Animal World",
  description: "Learn animal names",
  questions: [
    {
      id: "l6_q1",
      type: "vocabulary" as const,
      question: "What animal says 'meow'?",
      options: ["Dog", "Cat", "Cow", "Duck"],
      correctAnswer: "Cat",
      explanation: "Cats say 'meow'.",
      difficulty: 2
    },
    {
      id: "l6_q2",
      type: "vocabulary" as const,
      question: "What is the largest animal on Earth?",
      options: ["Elephant", "Blue Whale", "Giraffe", "Shark"],
      correctAnswer: "Blue Whale",
      explanation: "Blue whales are the largest animals.",
      difficulty: 2
    }
  ],
  requiredStars: 12,
  rewards: {
    coins: 100,
    experience: 35
  }
}

// Level 7 - Time
export const level7 = {
  id: 7,
  chapterId: 2,
  title: "What Time Is It?",
  description: "Learn to tell time",
  questions: [
    {
      id: "l7_q1",
      type: "vocabulary" as const,
      question: "What comes after Monday?",
      options: ["Sunday", "Tuesday", "Wednesday", "Friday"],
      correctAnswer: "Tuesday",
      explanation: "Days: Monday, Tuesday, Wednesday...",
      difficulty: 2
    },
    {
      id: "l7_q2",
      type: "vocabulary" as const,
      question: "How many days are in a week?",
      options: ["Five", "Six", "Seven", "Eight"],
      correctAnswer: "Seven",
      explanation: "There are 7 days in a week.",
      difficulty: 2
    }
  ],
  requiredStars: 15,
  rewards: {
    coins: 110,
    experience: 40
  }
}

// Level 8 - Places
export const level8 = {
  id: 8,
  chapterId: 2,
  title: "Places Around Us",
  description: "Learn places in the community",
  questions: [
    {
      id: "l8_q1",
      type: "vocabulary" as const,
      question: "Where do you buy books?",
      options: ["Library", "Bookstore", "Restaurant", "Hospital"],
      correctAnswer: "Bookstore",
      explanation: "You buy books at a bookstore.",
      difficulty: 3
    },
    {
      id: "l8_q2",
      type: "vocabulary" as const,
      question: "Where does a doctor work?",
      options: ["School", "Hospital", "Library", "Restaurant"],
      correctAnswer: "Hospital",
      explanation: "Doctors work in hospitals.",
      difficulty: 3
    }
  ],
  requiredStars: 18,
  rewards: {
    coins: 120,
    experience: 45
  }
}

// Level 9 - Weather
export const level9 = {
  id: 9,
  chapterId: 2,
  title: "Weather Report",
  description: "Learn weather vocabulary",
  questions: [
    {
      id: "l9_q1",
      type: "vocabulary" as const,
      question: "What is the weather like when it's very hot?",
      options: ["Sunny", "Rainy", "Snowy", "Cloudy"],
      correctAnswer: "Sunny",
      explanation: "Sunny weather means it's hot and bright.",
      difficulty: 3
    },
    {
      id: "l9_q2",
      type: "vocabulary" as const,
      question: "What falls from clouds?",
      options: ["Leaves", "Rain", "Birds", "Airplanes"],
      correctAnswer: "Rain",
      explanation: "Rain falls from clouds.",
      difficulty: 3
    }
  ],
  requiredStars: 21,
  rewards: {
    coins: 130,
    experience: 50
  }
}

// Level 10 - Actions
export const level10 = {
  id: 10,
  chapterId: 2,
  title: "Action Words",
  description: "Learn action verbs",
  questions: [
    {
      id: "l10_q1",
      type: "grammar" as const,
      question: "What are you doing? - I ___ a book.",
      options: ["read", "reading", "reads", "readed"],
      correctAnswer: "reading",
      explanation: "Present continuous: I am reading.",
      difficulty: 3
    },
    {
      id: "l10_q2",
      type: "grammar" as const,
      question: "She ___ to school every day.",
      options: ["go", "goes", "going", "gone"],
      correctAnswer: "goes",
      explanation: "Third person singular: goes.",
      difficulty: 3
    }
  ],
  requiredStars: 24,
  rewards: {
    coins: 150,
    experience: 60
  }
}

// Export all levels
export const levels = [level1, level2, level3, level4, level5, level6, level7, level8, level9, level10]

// Chapter data
export const chapters = [
  {
    id: 1,
    title: "Basic Basics",
    description: "Learn fundamental English words",
    coverImage: "/images/chapter1.jpg",
    isUnlocked: true,
    levelIds: [1, 2, 3, 4, 5]
  },
  {
    id: 2,
    title: "Daily Life",
    description: "English for everyday situations",
    coverImage: "/images/chapter2.jpg",
    isUnlocked: false,
    levelIds: [6, 7, 8, 9, 10]
  }
]
