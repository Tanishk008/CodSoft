# Makefile for Number Guess Game

CXX = g++
CXXFLAGS = -std=c++17 -Wall -Wextra -O2
TARGET = number_guess_game
SOURCE = game.cpp

# Default target
all: $(TARGET)

# Build the game
$(TARGET): $(SOURCE)
	$(CXX) $(CXXFLAGS) -o $(TARGET) $(SOURCE)

# Clean build files
clean:
	rm -f $(TARGET) game_history.txt

# Run the game
run: $(TARGET)
	./$(TARGET)

# Install dependencies (if needed)
install:
	@echo "No external dependencies required for this C++ game."

# Help target
help:
	@echo "Available targets:"
	@echo "  all     - Build the game (default)"
	@echo "  clean   - Remove build files and game data"
	@echo "  run     - Build and run the game"
	@echo "  help    - Show this help message"

.PHONY: all clean run install help
