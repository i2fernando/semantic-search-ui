import React, { useState } from "react";

function App() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const search = async () => {
        if (!query) return alert("Digite uma pergunta!");

        setLoading(true);
        setResults([]);

        const response = await fetch("http://localhost:5000/search", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query })
        });

        const data = await response.json();
        setResults(data);
        setLoading(false);
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>🔍 Busca Semântica com FAISS + React</h1>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Digite sua pergunta..."
                style={{ padding: "10px", width: "300px", marginRight: "10px" }}
            />
            <button onClick={search} style={{ padding: "10px 20px", backgroundColor: "#28a745", color: "white", border: "none", cursor: "pointer" }}>
                Buscar
            </button>

            {loading && <p>🔄 Carregando...</p>}

            <div style={{ marginTop: "20px", textAlign: "left", maxWidth: "500px", margin: "auto" }}>
                {results.map((result, index) => (
                    <div key={index} style={{ background: "#e9ecef", padding: "10px", borderRadius: "5px", margin: "5px 0" }}>
                        <strong>{result.text}</strong> (Similaridade: {result.score.toFixed(4)})
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
