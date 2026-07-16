import SpeedTest from "./components/SpeedTest";
import ThemeToggle from "./components/ThemeToggle";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="logo">
          <span className="logo-text">SPEED</span>
          <span className="logo-dot">.</span>
        </div>
        <ThemeToggle />
      </header>

      <main className="app-main">
        <SpeedTest />
      </main>
    </div>
  );
}

export default App;
