# ⚛️ Assembly Endgame

**Assembly Endgame** is a high-stakes, word-guessing game designed to test your vocabulary while "saving" the world of web development. As you guess letters incorrectly, the programming languages you know and love are "eliminated" one by one. Can you crack the code before all your languages are gone?

---

## 🚀 Key Features

* **Language Protection System:** Eight distinct programming languages act as your "lives."
* **Dynamic Status Messaging:** Real-time feedback that changes based on your last guess and game progress.
* **Responsive Keyboard:** A custom-built virtual keyboard that tracks used letters and game state.
* **Accessibility First:** Built with `aria-live` regions to ensure the game state is communicated clearly to screen readers.
* **Confetti Celebration:** Integrated visual rewards for winning the game.

---

## 🛠️ Technical Deep Dive

### Complex State Management
The core engine relies on a unified state architecture to keep the UI in sync. By deriving as much data as possible from a few central states, the app remains performant and bug-free:

* **Derived State:** Instead of manual trackers, the game calculates "wrong guesses" and "game over" status on the fly based on the `guessedLetters` array.
* **Game Flow Logic:** Complex conditional logic determines if the user has won (all letters found) or lost (all languages eliminated), triggering specific UI transitions.

### React Hooks Mastery
* **`useState`**: Managed for tracking the secret word and the collection of guessed characters.
* **`useEffect`**: Used for side effects like handling keyboard events or triggering focus shifts for accessibility.
* * **`useRef`**: used for storing essential details which stay even after rerenders
* **Refined Components:** Functional components organized for maximum reusability and readability.

### Clean UI & UX
* **Visual Feedback:** Each incorrect guess triggers a "Farewell" message for a specific language using specialized CSS transitions.
* **Polished Styling:** A sleek, dark-mode-inspired aesthetic using **Flexbox** and **Grid** for a perfectly centered, responsive layout.
* **Interactive Elements:** Buttons provide tactile feedback and visual cues:
    * 🟩 **Green**: Correct guess
    * 🟥 **Red**: Incorrect guess
    * ⚪ **Dimmed**: Already used letters
