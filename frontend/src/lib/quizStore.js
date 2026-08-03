// Utility module for storing quiz data, questions, and attempt results in localStorage

export const sampleQuizQuestions = {
  "1": [
    {
      id: "ml1",
      question: "What is the primary goal of Supervised Learning?",
      options: [
        "To find hidden patterns in unlabeled data",
        "To map input variables to a target output variable using labeled training data",
        "To learn optimal actions through trial and error rewards",
        "To reduce dimensionality without target labels"
      ],
      correctAnswer: 1,
      explanation: "Supervised learning relies on labeled training datasets to learn a mapping function from input variables (X) to target outputs (Y)."
    },
    {
      id: "ml2",
      question: "Which of the following algorithms is commonly used for Classification problems?",
      options: [
        "Linear Regression",
        "K-Means Clustering",
        "Logistic Regression",
        "Principal Component Analysis (PCA)"
      ],
      correctAnswer: 2,
      explanation: "Despite its name, Logistic Regression is a classic supervised classification algorithm used for predicting discrete categories."
    },
    {
      id: "ml3",
      question: "What does 'Overfitting' mean in Machine Learning?",
      options: [
        "The model performs poorly on training data and test data",
        "The model performs exceptionally well on training data but generalizes poorly to new unseen test data",
        "The model is too simple to capture underlying patterns",
        "The model has too few parameters"
      ],
      correctAnswer: 1,
      explanation: "Overfitting occurs when a model learns noise and specific details of the training data rather than general patterns."
    },
    {
      id: "ml4",
      question: "Which matrix is used to evaluate the performance of a classification model?",
      options: [
        "Correlation Matrix",
        "Confusion Matrix",
        "Covariance Matrix",
        "Adjacency Matrix"
      ],
      correctAnswer: 1,
      explanation: "A Confusion Matrix summarizes True Positives, True Negatives, False Positives, and False Negatives."
    },
    {
      id: "ml5",
      question: "What is Gradient Descent used for?",
      options: [
        "Optimizing parameters to minimize a loss function",
        "Cleaning missing values in data preprocessing",
        "Splitting datasets into training and testing sets",
        "Generating synthetic image data"
      ],
      correctAnswer: 0,
      explanation: "Gradient Descent is an optimization algorithm used to adjust parameters iteratively to minimize loss."
    },
    {
      id: "ml6",
      question: "What is the purpose of cross-validation in machine learning?",
      options: [
        "To speed up model training",
        "To evaluate model performance and prevent overfitting across different data folds",
        "To convert categorical features to numeric representations",
        "To compress large neural networks"
      ],
      correctAnswer: 1,
      explanation: "Cross-validation splits the data into multiple folds to test how accurately a predictive model will perform in practice."
    },
    {
      id: "ml7",
      question: "Which algorithm is an unsupervised clustering technique?",
      options: [
        "Decision Trees",
        "K-Means",
        "Random Forest",
        "Support Vector Machines (SVM)"
      ],
      correctAnswer: 1,
      explanation: "K-Means is an unsupervised learning algorithm that partitions dataset observations into K distinct clusters."
    },
    {
      id: "ml8",
      question: "What is L1 Regularization (Lasso) known for?",
      options: [
        "Setting feature weights to exactly zero, resulting in feature selection",
        "Squaring feature coefficients without feature selection",
        "Increasing model complexity automatically",
        "Normalizing color channels in image classification"
      ],
      correctAnswer: 0,
      explanation: "L1 regularization adds an absolute value penalty to weights, driving uninformative feature coefficients to zero."
    },
    {
      id: "ml9",
      question: "What is the function of an activation function in a Neural Network?",
      options: [
        "To initialize model weights randomly",
        "To introduce non-linearity so the network can learn complex functional patterns",
        "To compute matrix multiplication faster",
        "To scale features between 0 and 1"
      ],
      correctAnswer: 1,
      explanation: "Without non-linear activation functions (like ReLU or Sigmoid), neural networks could only learn linear transformations."
    },
    {
      id: "ml10",
      question: "What metric is most suitable for evaluating imbalanced classification datasets?",
      options: [
        "Accuracy Rate",
        "Precision, Recall, and F1-Score",
        "Mean Squared Error (MSE)",
        "R-Squared"
      ],
      correctAnswer: 1,
      explanation: "For imbalanced datasets, raw Accuracy can be misleading. F1-Score balances Precision and Recall effectively."
    }
  ],

  "2": [
    {
      id: "js1",
      question: "What is a 'Closure' in JavaScript?",
      options: [
        "A method to close browser windows",
        "A function bundled together with references to its surrounding lexical environment",
        "A block statement wrapped in curly braces",
        "An error handling mechanism using try...catch"
      ],
      correctAnswer: 1,
      explanation: "A closure gives an inner function access to an outer function's scope even after the outer function has returned."
    },
    {
      id: "js2",
      question: "What will `console.log(typeof null)` output?",
      options: [
        "'null'",
        "'undefined'",
        "'object'",
        "'boolean'"
      ],
      correctAnswer: 2,
      explanation: "In JavaScript, `typeof null` returns `'object'`. This is a legacy behavior dating back to the first implementation of JavaScript."
    },
    {
      id: "js3",
      question: "Which keyword creates a block-scoped variable that cannot be reassigned?",
      options: [
        "var",
        "let",
        "const",
        "static"
      ],
      correctAnswer: 2,
      explanation: "`const` declares a block-scoped variable whose value binding cannot be reassigned."
    },
    {
      id: "js4",
      question: "What does `Promise.all()` do if one of the input promises rejects?",
      options: [
        "It waits for all other promises to settle",
        "It immediately rejects with the reason of the first promise that rejected",
        "It ignores the rejected promise and returns fulfilled ones",
        "It retries the rejected promise 3 times"
      ],
      correctAnswer: 1,
      explanation: "`Promise.all` follows an 'all-or-nothing' rejection model: if any input promise rejects, the returned promise immediately rejects."
    },
    {
      id: "js5",
      question: "What is the Event Loop responsible for in JavaScript?",
      options: [
        "Compiling JavaScript into machine code",
        "Monitoring the Call Stack and Task Queue to execute asynchronous callbacks",
        "Managing DOM CSS styling recalculations",
        "Enforcing strict type checking"
      ],
      correctAnswer: 1,
      explanation: "The Event Loop continuously checks if the Call Stack is empty, pushing tasks from the Task Queue to the Call Stack."
    },
    {
      id: "js6",
      question: "Which array method creates a new array populated with the results of calling a provided function on every element?",
      options: [
        "forEach()",
        "map()",
        "filter()",
        "reduce()"
      ],
      correctAnswer: 1,
      explanation: "`Array.prototype.map()` creates a new array containing the transformed elements."
    },
    {
      id: "js7",
      question: "What is the main difference between `==` and `===` in JavaScript?",
      options: [
        "`==` compares object references while `===` compares values",
        "`==` performs type coercion before comparison, whereas `===` checks both value and type without coercion",
        "`===` converts both operands to strings first",
        "There is no difference"
      ],
      correctAnswer: 1,
      explanation: "Strict equality `===` evaluates to true only if both value and type match without implicit type conversion."
    },
    {
      id: "js8",
      question: "How do arrow functions handle the `this` context?",
      options: [
        "They bind `this` to the function object itself",
        "They inherit `this` lexically from the enclosing outer execution context",
        "They reset `this` to global window object",
        "They allow re-binding `this` using `.bind()`"
      ],
      correctAnswer: 1,
      explanation: "Arrow functions do not have their own `this` binding; they capture `this` lexically from the surrounding scope."
    },
    {
      id: "js9",
      question: "What is the output of `[1, 2, 3] + [4, 5, 6]` in JavaScript?",
      options: [
        "[1, 2, 3, 4, 5, 6]",
        "'1,2,34,5,6'",
        "NaN",
        "TypeError"
      ],
      correctAnswer: 1,
      explanation: "The addition operator coerces arrays into strings (`'1,2,3'` and `'4,5,6'`), resulting in string concatenation `'1,2,34,5,6'`."
    },
    {
      id: "js10",
      question: "Which feature allows extracting data from arrays or objects into distinct variables?",
      options: [
        "Prototypal Inheritance",
        "Destructuring Assignment",
        "Spread Operator",
        "Template Literals"
      ],
      correctAnswer: 1,
      explanation: "Destructuring assignment syntax is a JavaScript expression that makes it easy to extract values from arrays or properties from objects."
    }
  ],

  "3": [
    {
      id: "ds1",
      question: "What is the average time complexity for searching an element in a Balanced Binary Search Tree (BST)?",
      options: [
        "O(1)",
        "O(n)",
        "O(log n)",
        "O(n^2)"
      ],
      correctAnswer: 2,
      explanation: "In a balanced BST, each comparison halves the search space, giving logarithmic time complexity O(log n)."
    },
    {
      id: "ds2",
      question: "Which data structure operates on a Last-In, First-Out (LIFO) basis?",
      options: [
        "Queue",
        "Stack",
        "Linked List",
        "Heap"
      ],
      correctAnswer: 1,
      explanation: "A Stack follows the LIFO principle where the last element inserted is the first one removed."
    },
    {
      id: "ds3",
      question: "Which algorithm finds the shortest path between nodes in a weighted graph with non-negative edge weights?",
      options: [
        "Dijkstra's Algorithm",
        "Breadth-First Search (BFS)",
        "Kruskal's Algorithm",
        "Depth-First Search (DFS)"
      ],
      correctAnswer: 0,
      explanation: "Dijkstra's algorithm is designed for greedy shortest path determination in weighted non-negative graphs."
    },
    {
      id: "ds4",
      question: "What is the worst-case time complexity of QuickSort?",
      options: [
        "O(n log n)",
        "O(n^2)",
        "O(n)",
        "O(log n)"
      ],
      correctAnswer: 1,
      explanation: "Worst-case QuickSort time complexity is O(n^2) when poor pivots are repeatedly selected (e.g. sorted arrays without random pivot)."
    },
    {
      id: "ds5",
      question: "Which data structure is ideal for implementing Breadth-First Search (BFS) traversal of a graph?",
      options: [
        "Stack",
        "Queue",
        "Priority Queue",
        "Hash Map"
      ],
      correctAnswer: 1,
      explanation: "BFS uses a Queue (FIFO) to explore graph nodes level by level."
    },
    {
      id: "ds6",
      question: "What is a Hash Collision?",
      options: [
        "When two distinct keys produce the exact same hash code output",
        "When a hash map exceeds memory storage",
        "When array indices are out of bounds",
        "When a key is deleted from a hash table"
      ],
      correctAnswer: 0,
      explanation: "A Hash Collision happens when two different keys map to the same bucket index via the hash function."
    },
    {
      id: "ds7",
      question: "Which data structure guarantees Min/Max element access in O(1) time?",
      options: [
        "Singly Linked List",
        "Heap / Priority Queue",
        "Array",
        "AVL Tree"
      ],
      correctAnswer: 1,
      explanation: "In a Min-Heap or Max-Heap, the root element always stores the minimum or maximum value, accessible in constant O(1) time."
    },
    {
      id: "ds8",
      question: "What is the space complexity of Depth-First Search (DFS) on a tree of height H?",
      options: [
        "O(1)",
        "O(H)",
        "O(N^2)",
        "O(2^H)"
      ],
      correctAnswer: 1,
      explanation: "DFS requires space proportional to the call stack depth, which corresponds to the height H of the tree."
    },
    {
      id: "ds9",
      question: "What is the main advantage of a Doubly Linked List over a Singly Linked List?",
      options: [
        "Requires less memory per node",
        "Allows bidirectional navigation (previous and next pointers)",
        "Has faster cache locality",
        "Guarantees O(1) random array access"
      ],
      correctAnswer: 1,
      explanation: "Doubly linked lists store pointers to both next and previous nodes, enabling backward traversal."
    },
    {
      id: "ds10",
      question: "Which sorting algorithm is stable and has a guaranteed O(n log n) time complexity in all cases?",
      options: [
        "QuickSort",
        "MergeSort",
        "Selection Sort",
        "HeapSort"
      ],
      correctAnswer: 1,
      explanation: "MergeSort consistently runs in O(n log n) time across best, average, and worst cases while maintaining element order stability."
    }
  ]
};

// Generic fallback question generator guaranteeing 10 questions per quiz
export const getQuestionsForQuiz = (quizId, quizTitle = "General Knowledge Quiz", questionCount = 10) => {
  if (sampleQuizQuestions[quizId]) {
    return sampleQuizQuestions[quizId];
  }

  // Generate 10 dynamic questions matching the title
  const totalNeeded = 10;
  return Array.from({ length: totalNeeded }).map((_, index) => ({
    id: `dynamic_${quizId}_${index + 1}`,
    question: `Question ${index + 1} of 10: What is a fundamental rule regarding ${quizTitle}?`,
    options: [
      `Core principle A regarding ${quizTitle}`,
      `Core principle B regarding ${quizTitle}`,
      `Core principle C regarding ${quizTitle}`,
      `Core principle D regarding ${quizTitle}`
    ],
    correctAnswer: index % 4,
    explanation: `Option ${String.fromCharCode(65 + (index % 4))} is the authoritative correct answer for ${quizTitle}.`
  }));
};

// LocalStorage Persistence Helpers
const RESULTS_KEY = "eduvisio_quiz_results";

export const getSavedResults = () => {
  try {
    const raw = localStorage.getItem(RESULTS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.error("Failed to parse quiz results", e);
    return {};
  }
};

export const saveQuizResult = (quizId, resultData) => {
  try {
    const currentResults = getSavedResults();
    const updated = {
      ...currentResults,
      [quizId]: {
        ...resultData,
        timestamp: new Date().toISOString()
      }
    };
    localStorage.setItem(RESULTS_KEY, JSON.stringify(updated));

    // Also update main user quiz attempt record
    const userQuizzesRaw = localStorage.getItem("eduvisio_user_quizzes");
    let userQuizzes = userQuizzesRaw ? JSON.parse(userQuizzesRaw) : [];
    const index = userQuizzes.findIndex(q => q.id === quizId);
    if (index !== -1) {
      userQuizzes[index].completionPercentage = 100;
      userQuizzes[index].score = resultData.score;
      localStorage.setItem("eduvisio_user_quizzes", JSON.stringify(userQuizzes));
    }
    return updated;
  } catch (e) {
    console.error("Failed to save quiz result", e);
  }
};
