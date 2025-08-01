#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include <algorithm>
#include <random>
#include <chrono>
#include <iomanip>
#include <sstream>
#include <map>

// Player statistics structure
struct GameStats {
    std::string playerName;
    int score;
    int attempts;
    int timeTaken;
    long long timestamp;
    int targetNumber;
    
    GameStats() = default;
    GameStats(const std::string& name, int s, int att, int time, long long ts, int target)
        : playerName(name), score(s), attempts(att), timeTaken(time), timestamp(ts), targetNumber(target) {}
};

class NumberGuessGame {
private:
    std::string playerName;
    int targetNumber;
    int attempts;
    int score;
    std::chrono::steady_clock::time_point startTime;
    std::vector<GameStats> gameHistory;
    std::vector<std::pair<int, std::string>> guessHistory;
    
    // Random number generator
    std::random_device rd;
    std::mt19937 gen;
    std::uniform_int_distribution<> dis;
    
public:
    NumberGuessGame() : gen(rd()), dis(1, 100) {
        loadGameHistory();
    }
    
    void displayWelcome() {
        std::cout << "\n";
        std::cout << "╔══════════════════════════════════════════════════════════════╗\n";
        std::cout << "║                                                              ║\n";
        std::cout << "║        🎯 ULTIMATE NUMBER GUESSING CHALLENGE 🎯             ║\n";
        std::cout << "║                                                              ║\n";
        std::cout << "║           Test your intuition and compete globally!         ║\n";
        std::cout << "║                                                              ║\n";
        std::cout << "╚══════════════════════════════════════════════════════════════╝\n";
        std::cout << "\n";
    }
    
    void displayRules() {
        std::cout << "\n📋 GAME RULES:\n";
        std::cout << "═══════════════════════════════════════════════════════════════\n";
        std::cout << "🎯 Objective: Guess the secret number between 1 and 100\n";
        std::cout << "🏆 Scoring System:\n";
        std::cout << "   • 1st attempt: 100 points + time bonus\n";
        std::cout << "   • 2nd attempt: 90 points + time bonus\n";
        std::cout << "   • 3rd attempt: 80 points + time bonus\n";
        std::cout << "   • Each additional attempt: -10 points (minimum 10)\n";
        std::cout << "   • Time bonus: Up to 20 points for fast guesses\n";
        std::cout << "💡 Pro Tips:\n";
        std::cout << "   • Start with 50 to divide the range\n";
        std::cout << "   • Pay attention to feedback for better hints\n";
        std::cout << "   • Faster guesses earn bonus points\n";
        std::cout << "═══════════════════════════════════════════════════════════════\n\n";
    }
    
    void startNewGame() {
        std::cout << "Enter your name: ";
        std::getline(std::cin, playerName);
        
        if (playerName.empty()) {
            playerName = "Anonymous Player";
        }
        
        targetNumber = dis(gen);
        attempts = 0;
        score = 0;
        guessHistory.clear();
        startTime = std::chrono::steady_clock::now();
        
        std::cout << "\n🎮 Welcome, " << playerName << "!\n";
        std::cout << "I'm thinking of a number between 1 and 100...\n";
        std::cout << "Can you guess what it is?\n\n";
        
        playGame();
    }
    
    void playGame() {
        int guess;
        bool gameWon = false;
        
        while (!gameWon) {
            std::cout << "Attempt #" << (attempts + 1) << " - Enter your guess: ";
            
            if (!(std::cin >> guess)) {
                std::cin.clear();
                std::cin.ignore(10000, '\n');
                std::cout << "❌ Please enter a valid number!\n\n";
                continue;
            }
            
            if (guess < 1 || guess > 100) {
                std::cout << "❌ Please enter a number between 1 and 100!\n\n";
                continue;
            }
            
            attempts++;
            std::string feedback = getFeedback(guess);
            guessHistory.push_back({guess, feedback});
            
            std::cout << feedback << "\n";
            
            if (guess == targetNumber) {
                gameWon = true;
                handleVictory();
            } else {
                displayProgress();
            }
            
            std::cout << "\n";
        }
    }
    
    std::string getFeedback(int guess) {
        int difference = abs(guess - targetNumber);
        
        if (guess == targetNumber) {
            return "🎉 INCREDIBLE! You got it exactly right!";
        }
        
        std::string feedback;
        if (difference <= 5) {
            feedback = "🔥 You're burning hot! So close!";
        } else if (difference <= 10) {
            feedback = "🌡️  Getting warmer! You're very close!";
        } else if (difference <= 20) {
            feedback = guess < targetNumber ? 
                "📈 Too low, but you're on the right track!" : 
                "📉 Too high, but you're getting there!";
        } else {
            feedback = guess < targetNumber ? 
                "⬆️  Way too low! Think bigger!" : 
                "⬇️  Way too high! Think smaller!";
        }
        
        // Add motivational message based on attempts
        feedback += getMotivationalMessage();
        
        return feedback;
    }
    
    std::string getMotivationalMessage() {
        std::vector<std::string> encouragement = {
            " Keep it up, " + playerName + "!",
            " You're doing amazing!",
            " Great strategy!",
            " Trust your instincts!",
            " You've got this!"
        };
        
        std::map<int, std::string> attemptMessages = {
            {1, " Wow! Great first try!"},
            {2, " Excellent intuition!"},
            {3, " Three's a charm!"},
            {4, " Building great strategy!"},
            {5, " Halfway there! Keep going!"},
            {6, " Every guess teaches you something!"},
            {7, " You're in the zone!"},
            {8, " Almost there!"},
            {9, " One more push!"},
            {10, " Double digits! You're thinking this through!"}
        };
        
        if (attemptMessages.find(attempts) != attemptMessages.end()) {
            return attemptMessages[attempts];
        }
        
        return encouragement[attempts % encouragement.size()];
    }
    
    void displayProgress() {
        std::cout << "\n📊 Progress:\n";
        std::cout << "Attempts: " << attempts << " | ";
        
        // Show difficulty indicator
        if (attempts <= 3) {
            std::cout << "Difficulty: 🟢 Easy";
        } else if (attempts <= 6) {
            std::cout << "Difficulty: 🟡 Medium";
        } else {
            std::cout << "Difficulty: 🔴 Hard";
        }
        
        // Show recent guesses
        if (guessHistory.size() > 1) {
            std::cout << "\n\n📝 Recent guesses:\n";
            int start = std::max(0, (int)guessHistory.size() - 3);
            for (int i = start; i < guessHistory.size() - 1; i++) {
                std::cout << "   " << guessHistory[i].first << " - " << guessHistory[i].second << "\n";
            }
        }
    }
    
    void handleVictory() {
        auto endTime = std::chrono::steady_clock::now();
        auto duration = std::chrono::duration_cast<std::chrono::seconds>(endTime - startTime);
        int timeTaken = duration.count();
        
        score = calculateScore(attempts, timeTaken);
        
        // Victory animation
        std::cout << "\n";
        std::cout << "🎊🎉🎊🎉🎊🎉🎊🎉🎊🎉🎊🎉🎊🎉🎊🎉🎊\n";
        std::cout << "🏆                                           🏆\n";
        std::cout << "🏆           CONGRATULATIONS!                🏆\n";
        std::cout << "🏆                                           🏆\n";
        std::cout << "🎊🎉🎊🎉🎊🎉🎊🎉🎊🎉🎊🎉🎊🎉🎊🎉🎊\n\n";
        
        std::cout << "🎯 You guessed " << targetNumber << " in " << attempts << " attempts!\n";
        std::cout << "⏱️  Time taken: " << timeTaken << " seconds\n";
        std::cout << "🏆 Final Score: " << score << " points\n\n";
        
        // Save game result
        saveGameResult(timeTaken);
        
        displayGameSummary();
    }
    
    int calculateScore(int attemptCount, int timeTaken) {
        int baseScore = std::max(110 - attemptCount * 10, 10);
        int timeBonus = std::max(20 - timeTaken / 2, 0);
        return baseScore + timeBonus;
    }
    
    void displayGameSummary() {
        std::cout << "📈 GAME SUMMARY:\n";
        std::cout << "═══════════════════════════════════════════════════════════════\n";
        std::cout << "Player: " << playerName << "\n";
        std::cout << "Target Number: " << targetNumber << "\n";
        std::cout << "Attempts: " << attempts << "\n";
        std::cout << "Score: " << score << " points\n";
        
        if (attempts == 1) {
            std::cout << "🌟 PERFECT! First try - you're a natural!\n";
        } else if (attempts <= 3) {
            std::cout << "⭐ EXCELLENT! Great intuition!\n";
        } else if (attempts <= 6) {
            std::cout << "👍 GOOD JOB! Solid performance!\n";
        } else {
            std::cout << "💪 WELL DONE! Persistence pays off!\n";
        }
        
        std::cout << "═══════════════════════════════════════════════════════════════\n\n";
    }
    
    void saveGameResult(int timeTaken) {
        auto now = std::chrono::system_clock::now();
        auto timestamp = std::chrono::duration_cast<std::chrono::milliseconds>(now.time_since_epoch()).count();
        
        GameStats newGame(playerName, score, attempts, timeTaken, timestamp, targetNumber);
        gameHistory.push_back(newGame);
        
        saveGameHistory();
    }
    
    void displayLeaderboard() {
        std::cout << "\n🏆 GLOBAL LEADERBOARD 🏆\n";
        std::cout << "═══════════════════════════════════════════════════════════════\n";
        
        if (gameHistory.empty()) {
            std::cout << "No games played yet! Be the first to set a record!\n\n";
            return;
        }
        
        // Sort by score (descending), then by attempts (ascending), then by time (ascending)
        std::vector<GameStats> sortedHistory = gameHistory;
        std::sort(sortedHistory.begin(), sortedHistory.end(), 
            [](const GameStats& a, const GameStats& b) {
                if (a.score != b.score) return a.score > b.score;
                if (a.attempts != b.attempts) return a.attempts < b.attempts;
                return a.timeTaken < b.timeTaken;
            });
        
        std::cout << std::left << std::setw(4) << "Rank" 
                  << std::setw(20) << "Player" 
                  << std::setw(8) << "Score" 
                  << std::setw(10) << "Attempts" 
                  << std::setw(8) << "Time" << "\n";
        std::cout << "───────────────────────────────────────────────────────────────\n";
        
        for (int i = 0; i < std::min(10, (int)sortedHistory.size()); i++) {
            std::string rank;
            if (i == 0) rank = "🥇";
            else if (i == 1) rank = "🥈";
            else if (i == 2) rank = "🥉";
            else rank = std::to_string(i + 1) + ".";
            
            std::cout << std::left << std::setw(4) << rank
                      << std::setw(20) << sortedHistory[i].playerName.substr(0, 19)
                      << std::setw(8) << sortedHistory[i].score
                      << std::setw(10) << sortedHistory[i].attempts
                      << std::setw(8) << sortedHistory[i].timeTaken << "s\n";
        }
        std::cout << "═══════════════════════════════════════════════════════════════\n\n";
    }
    
    void displayPlayerStats() {
        std::string name;
        std::cout << "Enter player name to view stats: ";
        std::getline(std::cin, name);
        
        if (name.empty()) {
            name = playerName;
        }
        
        std::vector<GameStats> playerGames;
        for (const auto& game : gameHistory) {
            if (game.playerName == name) {
                playerGames.push_back(game);
            }
        }
        
        if (playerGames.empty()) {
            std::cout << "\n❌ No games found for player: " << name << "\n\n";
            return;
        }
        
        // Calculate statistics
        int totalGames = playerGames.size();
        int bestScore = 0;
        int totalAttempts = 0;
        int totalTime = 0;
        int totalScore = 0;
        
        for (const auto& game : playerGames) {
            bestScore = std::max(bestScore, game.score);
            totalAttempts += game.attempts;
            totalTime += game.timeTaken;
            totalScore += game.score;
        }
        
        double avgAttempts = (double)totalAttempts / totalGames;
        double avgTime = (double)totalTime / totalGames;
        
        std::cout << "\n📊 PLAYER STATISTICS: " << name << "\n";
        std::cout << "═══════════════════════════════════════════════════════════════\n";
        std::cout << "🎮 Total Games: " << totalGames << "\n";
        std::cout << "🏆 Best Score: " << bestScore << " points\n";
        std::cout << "📈 Total Score: " << totalScore << " points\n";
        std::cout << "🎯 Average Attempts: " << std::fixed << std::setprecision(1) << avgAttempts << "\n";
        std::cout << "⏱️  Average Time: " << std::fixed << std::setprecision(1) << avgTime << " seconds\n";
        
        // Show recent games
        std::cout << "\n📝 Recent Games (Last 5):\n";
        std::cout << "───────────────────────────────────────────────────────────────\n";
        
        std::sort(playerGames.begin(), playerGames.end(), 
            [](const GameStats& a, const GameStats& b) {
                return a.timestamp > b.timestamp;
            });
        
        for (int i = 0; i < std::min(5, (int)playerGames.size()); i++) {
            auto time_t = std::chrono::system_clock::time_point(
                std::chrono::milliseconds(playerGames[i].timestamp));
            auto tm = std::chrono::system_clock::to_time_t(time_t);
            
            std::cout << "Game #" << (totalGames - i) << " - "
                      << "Score: " << playerGames[i].score << ", "
                      << "Attempts: " << playerGames[i].attempts << ", "
                      << "Time: " << playerGames[i].timeTaken << "s\n";
        }
        std::cout << "═══════════════════════════════════════════════════════════════\n\n";
    }
    
    void loadGameHistory() {
        std::ifstream file("game_history.txt");
        if (!file.is_open()) return;
        
        std::string line;
        while (std::getline(file, line)) {
            std::istringstream iss(line);
            std::string name;
            int score, attempts, timeTaken, targetNum;
            long long timestamp;
            
            if (std::getline(iss, name, '|') &&
                iss >> score && iss.ignore() &&
                iss >> attempts && iss.ignore() &&
                iss >> timeTaken && iss.ignore() &&
                iss >> timestamp && iss.ignore() &&
                iss >> targetNum) {
                
                gameHistory.emplace_back(name, score, attempts, timeTaken, timestamp, targetNum);
            }
        }
        file.close();
    }
    
    void saveGameHistory() {
        std::ofstream file("game_history.txt");
        if (!file.is_open()) return;
        
        for (const auto& game : gameHistory) {
            file << game.playerName << "|"
                 << game.score << "|"
                 << game.attempts << "|"
                 << game.timeTaken << "|"
                 << game.timestamp << "|"
                 << game.targetNumber << "\n";
        }
        file.close();
    }
    
    void showMainMenu() {
        int choice;
        
        while (true) {
            std::cout << "🎮 MAIN MENU:\n";
            std::cout << "═══════════════════════════════════════════════════════════════\n";
            std::cout << "1. 🎯 Start New Game\n";
            std::cout << "2. 🏆 View Leaderboard\n";
            std::cout << "3. 📊 View Player Statistics\n";
            std::cout << "4. 📋 Show Game Rules\n";
            std::cout << "5. 🚪 Exit Game\n";
            std::cout << "═══════════════════════════════════════════════════════════════\n";
            std::cout << "Enter your choice (1-5): ";
            
            if (!(std::cin >> choice)) {
                std::cin.clear();
                std::cin.ignore(10000, '\n');
                std::cout << "❌ Please enter a valid number!\n\n";
                continue;
            }
            
            std::cin.ignore(); // Clear the newline character
            
            switch (choice) {
                case 1:
                    startNewGame();
                    break;
                case 2:
                    displayLeaderboard();
                    break;
                case 3:
                    displayPlayerStats();
                    break;
                case 4:
                    displayRules();
                    break;
                case 5:
                    std::cout << "\n👋 Thanks for playing! See you next time!\n";
                    return;
                default:
                    std::cout << "❌ Invalid choice! Please select 1-5.\n\n";
            }
        }
    }
    
    void run() {
        displayWelcome();
        showMainMenu();
    }
};

int main() {
    NumberGuessGame game;
    game.run();
    return 0;
}
