import { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8000/api/test/", {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        })
            .then(res => {
                if (!res.ok) throw new Error('Ошибка сети');
                return res.json();
            })
            .then(data => setData(data))
            .catch(err => console.error('Ошибка запроса:', err));
    }, []);

    return (
        <h1>{data ? data.data : "Загрузка..."}</h1>
    );
}

export default App;