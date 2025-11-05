import logo from './logo.svg';


const App: React.FC = () => {
  return (
    <div className="text-center">
      <header className="bg-[#282c34] min-h-screen flex flex-col items-center justify-center text-white text-[calc(10px+2vmin)]">
        <img src={logo} className="h-[40vmin] pointer-events-none animate-App-logo-spin" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="text-[#61dafb]"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
