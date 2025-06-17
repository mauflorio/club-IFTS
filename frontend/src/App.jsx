import Header from "./components/Header";
import Footer from "./components/Footer";
import "./styles/global.css";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <div className="app-container">
      <Header />
      <main>
        <AppRouter></AppRouter>
      </main>
      <Footer />
    </div>
  );
}

export default App;
