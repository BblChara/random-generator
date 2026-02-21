import { useState } from 'react'
import './App.css'

function App() {
  const [min, setMin] = useState('')
  const [max, setMax] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [isAnimating, setIsAnimating] = useState(false)

  const handleGenerate = () => {
    setError('')
    const minNum = parseInt(min, 10)
    const maxNum = parseInt(max, 10)

    // Валидация
    if (isNaN(minNum) || isNaN(maxNum)) {
      setError('Пожалуйста, введите корректные числа.')
      return
    }
    if (minNum >= maxNum) {
      setError('Минимальное число должно быть меньше максимального.')
      return
    }
    if (minNum < -1000000 || maxNum > 1000000) {
      setError('Числа слишком большие! Используйте диапазон от -1млн до 1млн.')
      return
    }

    setIsAnimating(true)
    setResult(null)

    // Анимация "перебора" чисел перед показом результата
    let iterations = 0
    const maxIterations = 20
    const interval = setInterval(() => {
      const tempRandom = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum
      setResult(tempRandom)
      iterations++

      if (iterations >= maxIterations) {
        clearInterval(interval)
        // Финальное число
        const finalRandom = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum
        setResult(finalRandom)
        setIsAnimating(false)
      }
    }, 50) // Скорость смены чисел
  }

  return (
    <div className="container">
      <h1>🎲 Генератор Случайных Чисел</h1>
      
      <div className="card">
        <div className="input-group">
          <label>От (мин):</label>
          <input 
            type="number" 
            value={min} 
            onChange={(e) => setMin(e.target.value)} 
            placeholder="Например: 1"
            data-testid="input-min"
          />
        </div>

        <div className="input-group">
          <label>До (макс):</label>
          <input 
            type="number" 
            value={max} 
            onChange={(e) => setMax(e.target.value)} 
            placeholder="Например: 100"
            data-testid="input-max"
          />
        </div>

        {error && <div className="error-message" data-testid="error-msg">{error}</div>}

        <button 
          onClick={handleGenerate} 
          disabled={isAnimating}
          className="generate-btn"
          data-testid="btn-generate"
        >
          {isAnimating ? 'Генерирую...' : 'Сгенерировать'}
        </button>

        {result !== null && (
          <div className={`result ${isAnimating ? 'animating' : ''}`} data-testid="result-display">
            {result}
          </div>
        )}
      </div>
    </div>
  )
}

export default App