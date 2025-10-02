# Enhanced Bulk Quiz Upload System

## Overview

The enhanced bulk quiz upload system allows administrators to upload multiple quizzes using various formats including JSON, CSV, TXT files, and even AI-powered generation from content descriptions. This is much more efficient than creating quizzes one by one through the UI.

## How to Use

1. **Access the Admin Panel**
   - Go to `/admin`
   - Sign in with your admin account (`onyeije@gmail.com`)

2. **Open Bulk Upload**
   - Click "Bulk Upload" in the Quiz Management section, or
   - Use the "Bulk Upload Quizzes" quick action button

3. **Choose Your Upload Method**
   - **JSON/Text Input**: Paste JSON directly or load sample data
   - **File Upload**: Upload JSON, CSV, or TXT files
   - **AI-Powered**: Describe your content for AI generation (coming soon)

4. **Validate & Upload**
   - Click "Preview & Validate" to check your data
   - If validation passes, click "Upload" to import the quizzes

## Supported Formats

### 1. JSON Format (Recommended)

### Quiz Structure
```json
[
  {
    "title": "Quiz Title Here",
    "moduleId": null,  // Optional: UUID of associated module
    "questions": [
      // Array of question objects
    ]
  }
]
```

### Question Structure
```json
{
  "questionText": "Your question text here?",
  "questionType": "mcq",  // "mcq", "true_false", or "fill_blank"
  "options": ["Option 1", "Option 2", "Option 3", "Option 4"],  // For MCQ only
  "correctAnswer": "Option 2",
  "explanation": "Explanation of why this is correct",  // Optional
  "order": 1  // Question order (1, 2, 3, etc.)
}
```

### 2. CSV Format (Spreadsheet-Friendly)

CSV files are perfect if you prefer working in Excel or Google Sheets.

**Required Columns:**
- `title`: Quiz title
- `questionText`: The question text
- `questionType`: "mcq", "true_false", or "fill_blank"
- `correctAnswer`: The correct answer
- `options`: For MCQ only, separate options with pipes (|)
- `explanation`: Optional explanation (leave empty if not needed)
- `moduleId`: Optional module association

**Example CSV:**
```csv
title,questionText,questionType,correctAnswer,options,explanation
"Sabbath Quiz","Which day is the Sabbath?",mcq,"Saturday","Sunday|Saturday|Friday","Saturday is the 7th day"
"Sabbath Quiz","Sabbath was made at creation",true_false,"True",,"Genesis 2:3 confirms this"
```

### 3. TXT Format (Simple Text)

Text files use a simple format that's easy to type:

```
QUIZ: Quiz Title Here

Q: Your question text?
A: Correct answer
E: Explanation (optional)

Q: Next question?
A: Next answer
E: Next explanation

QUIZ: Another Quiz Title

Q: Another question?
A: Another answer
```

### 4. AI-Powered Generation (Coming Soon)

Describe your PDF, Word document, or lesson content and let AI generate quiz questions:
- Upload or describe your source material
- Specify question types and difficulty
- AI creates properly formatted questions
- Review and edit before uploading

## Question Types

### 1. Multiple Choice (mcq)
```json
{
  "questionText": "What is the capital of France?",
  "questionType": "mcq",
  "options": ["London", "Berlin", "Paris", "Madrid"],
  "correctAnswer": "Paris",
  "explanation": "Paris has been the capital of France since 508 AD.",
  "order": 1
}
```

### 2. True/False (true_false)
```json
{
  "questionText": "The Sabbath was made holy at creation.",
  "questionType": "true_false",
  "correctAnswer": "True",
  "explanation": "Genesis 2:3 shows God blessed and sanctified the seventh day at creation.",
  "order": 1
}
```

### 3. Fill in the Blank (fill_blank)
```json
{
  "questionText": "Complete this Bible verse: 'Remember the _______ day, to keep it holy.'",
  "questionType": "fill_blank",
  "correctAnswer": "Sabbath",
  "explanation": "This is from Exodus 20:8, the Fourth Commandment.",
  "order": 1
}
```

## Complete Example

```json
[
  {
    "title": "Sabbath Truth Quiz",
    "moduleId": null,
    "questions": [
      {
        "questionText": "Which day is the biblical Sabbath?",
        "questionType": "mcq",
        "options": ["Sunday", "Saturday", "Friday", "Any day"],
        "correctAnswer": "Saturday",
        "explanation": "The seventh day (Saturday) is the biblical Sabbath.",
        "order": 1
      },
      {
        "questionText": "The Sabbath was established at creation.",
        "questionType": "true_false",
        "correctAnswer": "True",
        "explanation": "Genesis 2:3 shows this happened at creation.",
        "order": 2
      },
      {
        "questionText": "Fill in: 'The Sabbath was made for _____.'",
        "questionType": "fill_blank",
        "correctAnswer": "man",
        "explanation": "Mark 2:27 - Jesus said the Sabbath was made for man.",
        "order": 3
      }
    ]
  }
]
```

## Validation Rules

- **Quizzes** must have:
  - `title` (string)
  - `questions` (array with at least 1 question)

- **Questions** must have:
  - `questionText` (string)
  - `questionType` (must be "mcq", "true_false", or "fill_blank")
  - `correctAnswer` (string)
  - `order` (number)

- **MCQ Questions** must also have:
  - `options` (array with at least 2 options)

## Tips for Creating Quiz JSON

1. **Use a JSON validator** to check your syntax before uploading
2. **Start with sample data** - click "Load Sample Data" to see working examples
3. **Test with small batches** first to make sure your format is correct
4. **Use proper escaping** for quotes in your text: `"He said \"Hello\""`
5. **Keep order numbers sequential** (1, 2, 3, etc.) within each quiz

## Error Messages

Common validation errors and solutions:

- **"Invalid JSON format"** - Check your syntax (missing commas, brackets, quotes)
- **"Missing question text"** - Every question needs `questionText`
- **"MCQ questions must have options"** - Multiple choice needs `options` array
- **"Invalid question type"** - Use only "mcq", "true_false", or "fill_blank"

## Sample Data Included

The system includes three sample quizzes:
1. **Recipe for Success — Joshua 1** (5 MCQ questions)
2. **The Sabbath Truth Quiz** (4 MCQ questions)  
3. **Sanctuary Truth Assessment** (4 MCQ questions)

These demonstrate proper formatting and provide quality SDA theological content.

## After Upload

Once uploaded successfully:
1. Quizzes appear immediately in the `/quizzes` page
2. Users can take the quizzes right away
3. Results are tracked in the database
4. You can edit individual questions through the admin panel if needed

## Best Practices

1. **Create themed quizzes** - Group related questions together
2. **Provide good explanations** - Help users learn from their mistakes
3. **Use varied question types** - Mix MCQ, True/False, and fill-in-the-blank
4. **Test your quizzes** - Take them yourself to ensure they work correctly
5. **Link to modules** - Associate quizzes with study modules when possible