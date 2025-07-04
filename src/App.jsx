import GameCanvas from "./components/GameCanvas" //importando o GameCanvas

function App() {//funcao App
  return (
    <div className = "App">
        <h1>Super Brunos World</h1>
        {/*chamando  o GameCanvas*/}
        <GameCanvas/>
    </div>
  )
}

export default App;
