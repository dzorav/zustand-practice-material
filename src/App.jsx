import Column from "./Column"

function App() {

  return (
    <main style={{ display: "flex", minHeight: "300px", gap: "20px" }}>
      <Column state="PLANNED" />
      <Column state="ONGOING" />
      <Column state="DONE" />
    </main>
  )
}

export default App
