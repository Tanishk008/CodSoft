# 🎯 Number Guess Game - C++ Edition

A comprehensive console-based number guessing game written in C++ with advanced features including AI-like feedback, scoring system, leaderboard, and persistent data storage.

## 🎮 Features

### Core Game Mechanics
- **Random Number Generation**: Computer generates a number between 1-100
- **Interactive Gameplay**: Real-time feedback and hints
- **Smart Scoring System**: Points based on attempts and time taken
- **Persistent Data**: Game history saved to file

### Scoring System
- **1st attempt**: 100 points + time bonus
- **2nd attempt**: 90 points + time bonus  
- **3rd attempt**: 80 points + time bonus
- **Each additional attempt**: -10 points (minimum 10 points)
- **Time Bonus**: Up to 20 extra points for fast guesses

### Advanced Features
- **Global Leaderboard**: Top 10 players ranked by score
- **Player Statistics**: Personal performance tracking
- **Game History**: Track all games with detailed stats
- **Motivational Feedback**: Encouraging messages based on performance
- **Progress Tracking**: Visual indicators for game difficulty

## 🚀 Getting Started

### Prerequisites
- C++17 compatible compiler (GCC, Clang, or MSVC)
- Make (optional, for using Makefile)

### Compilation

#### Using Makefile (Recommended)
\`\`\`bash
# Build the game
make

# Build and run
make run

# Clean build files
make clean
\`\`\`

#### Manual Compilation
\`\`\`bash
# Compile with GCC
g++ -std=c++17 -Wall -Wextra -O2 -o number_guess_game game.cpp

# Run the game
./number_guess_game
\`\`\`

#### Windows (Visual Studio)
\`\`\`cmd
# Compile with MSVC
cl /EHsc /std:c++17 game.cpp /Fe:number_guess_game.exe

# Run the game
number_guess_game.exe
\`\`\`

## 🎯 How to Play

### Game Rules
1. **Objective**: Guess the secret number between 1 and 100
2. **Input**: Enter your guess when prompted
3. **Feedback**: Receive hints about whether your guess is too high, too low, or close
4. **Scoring**: Earn points based on attempts and speed
5. **Victory**: Find the number and see your final score!

### Pro Tips
- Start with 50 to divide the range in half
- Pay attention to feedback messages for better hints
- Faster guesses earn time bonus points
- Check the leaderboard to see top players
- Your stats are automatically saved

## 📊 Game Features

### Main Menu Options
1. **🎯 Start New Game** - Begin a new guessing challenge
2. **🏆 View Leaderboard** - See top 10 global players
3. **📊 View Player Statistics** - Check personal performance
4. **📋 Show Game Rules** - Display complete instructions
5. **🚪 Exit Game** - Quit the application

### Data Persistence
- Game history stored in \`game_history.txt\`
- Automatic saving after each game
- Cross-session statistics tracking
- Leaderboard persistence

## 🏆 Scoring Details

### Base Score Calculation
\`\`\`
Base Score = max(110 - (attempts × 10), 10)
Time Bonus = max(20 - (time_in_seconds ÷ 2), 0)
Final Score = Base Score + Time Bonus
\`\`\`

### Examples
- **1 attempt, 5 seconds**: 100 + 18 = 118 points
- **3 attempts, 15 seconds**: 80 + 13 = 93 points
- **7 attempts, 45 seconds**: 40 + 0 = 40 points

## 📁 File Structure

\`\`\`
number-guess-game/
├── game.cpp           # Main game source code
├── Makefile          # Build configuration
├── README.md         # This file
└── game_history.txt  # Generated data file (after first run)
\`\`\`

## 🔧 Technical Details

### Requirements
- **C++ Standard**: C++17 or later
- **Compiler**: GCC 7+, Clang 5+, or MSVC 2017+
- **Platform**: Cross-platform (Windows, macOS, Linux)

### Dependencies
- Standard C++ Library only
- No external dependencies required

### Key Classes and Functions
- \`NumberGuessGame\`: Main game class
- \`GameStats\`: Structure for storing game data
- \`calculateScore()\`: Scoring algorithm
- \`getFeedback()\`: AI-like response generation
- \`saveGameHistory()\`: Data persistence

## 🎨 Game Experience

### Visual Elements
- Unicode emojis for enhanced visual appeal
- ASCII art for victory celebrations
- Formatted tables for leaderboards and statistics
- Progress indicators and difficulty levels

### Feedback System
- **Proximity-based hints**: "Burning hot", "Getting warmer", etc.
- **Motivational messages**: Personalized encouragement
- **Attempt-specific feedback**: Different messages based on try count
- **Performance indicators**: Visual difficulty progression

## 🚀 Future Enhancements

### Potential Features
- Multiple difficulty levels (1-50, 1-100, 1-500)
- Achievement system with badges
- Multiplayer mode (turn-based)
- Custom number ranges
- Sound effects (system beeps)
- Color output (using ANSI codes)

### Technical Improvements
- JSON data format for better structure
- Configuration file support
- Logging system
- Unit tests
- Cross-platform GUI version

## 🤝 Contributing

Feel free to contribute to this project by:
1. Reporting bugs or issues
2. Suggesting new features
3. Improving code quality
4. Adding documentation
5. Creating tests

## 📝 License

This project is open source and available under the MIT License.

## 🎮 Enjoy the Game!

Have fun testing your number-guessing skills and competing for the top spot on the leaderboard!
