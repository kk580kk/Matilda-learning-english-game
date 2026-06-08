import { useState, useEffect, useCallback, useRef } from 'react'
import { useBookStore, demoBooks } from '../../stores/bookStore'
import './SpeedReading.css'

interface SpeedReadingProps {
  bookId?: string
  chapterId?: string
  initialWpm?: number
}

export const SpeedReading: React.FC<SpeedReadingProps> = ({
  bookId,
  chapterId,
  initialWpm = 200
}) => {
  const {
    currentBook,
    currentChapter,
    speedReadingSession,
    selectBook,
    selectChapter,
    startSpeedReading,
    updateSpeedReading,
    completeSpeedReading,
    resetSpeedReading,
    loadBooks
  } = useBookStore()

  const [selectedBookId, setSelectedBookId] = useState<string>(bookId || '')
  const [selectedChapterId, setSelectedChapterId] = useState<string>(chapterId || '')
  const [userWpm, setUserWpm] = useState(initialWpm)
  const [userInput, setUserInput] = useState('')
  const [showInput, setShowInput] = useState(false)
  const [startTime, setStartTime] = useState<number | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Load books on mount
  useEffect(() => {
    loadBooks()
  }, [loadBooks])

  // Get all words from current chapter for speed reading
  const getWordsFromChapter = (content: string): string[] => {
    return content.split(/\s+/).filter(word => word.length > 0)
  }

  // Handle book selection change
  const handleBookChange = (newBookId: string) => {
    setSelectedBookId(newBookId)
    selectBook(newBookId)
    setSelectedChapterId('')
  }

  // Handle chapter selection change
  const handleChapterChange = (newChapterId: string) => {
    setSelectedChapterId(newChapterId)
    selectChapter(newChapterId)
  }

  // Start speed reading session
  const handleStart = () => {
    if (!currentBook || !currentChapter) return

    const words = getWordsFromChapter(currentChapter.content)
    startSpeedReading(currentBook.id, currentChapter.id, words)
    setStartTime(Date.now())
    setUserInput('')
    setShowInput(true)

    // Focus input after a brief delay
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  // Handle word reading progress
  const handleNextWord = useCallback(() => {
    if (!speedReadingSession || !speedReadingSession.isActive) return

    const elapsed = (Date.now() - (startTime || speedReadingSession.startTime)) / 1000
    const expectedTime = speedReadingSession.totalWords / (userWpm / 60)
    
    if (speedReadingSession.currentIndex >= speedReadingSession.totalWords - 1) {
      completeSpeedReading()
      setShowInput(false)
    } else {
      updateSpeedReading({
        currentIndex: speedReadingSession.currentIndex + 1
      })
    }

    // Reset timer for average WPM calculation
    if (elapsed > expectedTime * 1.5) {
      setStartTime(Date.now())
    }
  }, [speedReadingSession, startTime, userWpm, completeSpeedReading, updateSpeedReading])

  // Auto-advance words based on WPM
  useEffect(() => {
    if (!speedReadingSession?.isActive) return

    const intervalMs = 60000 / userWpm
    const timer = setInterval(() => {
      handleNextWord()
    }, intervalMs)

    return () => clearInterval(timer)
  }, [speedReadingSession?.isActive, userWpm, handleNextWord])

  // Handle user typing (for comprehension check)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value)
    
    // Check if user typed the current word
    const currentWord = speedReadingSession?.words[speedReadingSession.currentIndex] || ''
    if (e.target.value.toLowerCase().includes(currentWord.toLowerCase().replace(/[^a-zA-Z]/g, '')) && speedReadingSession) {
      // Word recognized
      updateSpeedReading({
        correctWords: speedReadingSession.correctWords + 1
      })
      setUserInput('')
      handleNextWord()
    }
  }

  // Reset session
  const handleReset = () => {
    resetSpeedReading()
    setShowInput(false)
    setUserInput('')
  }

  // Get current display word
  const displayWord = speedReadingSession?.words[speedReadingSession.currentIndex] || ''

  // Calculate progress percentage
  const progress = speedReadingSession 
    ? Math.round((speedReadingSession.currentIndex / speedReadingSession.totalWords) * 100)
    : 0

  // Calculate WPM stats
  const elapsedMinutes = startTime ? (Date.now() - startTime) / 60000 : 0
  const actualWpm = elapsedMinutes > 0 
    ? Math.round(speedReadingSession ? speedReadingSession.currentIndex / elapsedMinutes : 0)
    : 0

  const accuracy = speedReadingSession && speedReadingSession.totalWords > 0
    ? Math.round((speedReadingSession.correctWords / speedReadingSession.currentIndex) * 100) || 0
    : 100

  return (
    <div className="speed-reading">
      <div className="speed-reading-header">
        <h2>⚡ Speed Reading</h2>
        <p>Improve your reading speed and comprehension!</p>
      </div>

      {/* Book & Chapter Selection */}
      {!speedReadingSession && (
        <div className="speed-reading-setup">
          <div className="form-group">
            <label>Select Book:</label>
            <select 
              value={selectedBookId} 
              onChange={(e) => handleBookChange(e.target.value)}
            >
              <option value="">-- Choose a Book --</option>
              {demoBooks.filter(b => b.isOwned).map(book => (
                <option key={book.id} value={book.id}>{book.title}</option>
              ))}
            </select>
          </div>

          {currentBook && (
            <div className="form-group">
              <label>Select Chapter:</label>
              <select 
                value={selectedChapterId}
                onChange={(e) => handleChapterChange(e.target.value)}
              >
                <option value="">-- Choose a Chapter --</option>
                {currentBook.chapters.map(chapter => (
                  <option key={chapter.id} value={chapter.id}>
                    Chapter {chapter.chapterNumber}: {chapter.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="form-group">
            <label>Reading Speed (WPM):</label>
            <input
              type="range"
              min="100"
              max="600"
              step="25"
              value={userWpm}
              onChange={(e) => setUserWpm(Number(e.target.value))}
            />
            <span className="wpm-display">{userWpm} WPM</span>
          </div>

          <button 
            className="btn-primary"
            onClick={handleStart}
            disabled={!selectedBookId || !selectedChapterId}
          >
            Start Reading
          </button>
        </div>
      )}

      {/* Active Reading Session */}
      {speedReadingSession?.isActive && (
        <div className="speed-reading-active">
          <div className="reading-progress">
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="progress-text">{progress}%</span>
          </div>

          <div className="word-display">
            <span className="current-word">{displayWord}</span>
            <span className="word-index">
              {speedReadingSession.currentIndex + 1} / {speedReadingSession.totalWords}
            </span>
          </div>

          {showInput && (
            <div className="input-area">
              <input
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={handleInputChange}
                placeholder="Type the word you see..."
                className="word-input"
              />
              <div className="stats">
                <span>Target: {userWpm} WPM</span>
                <span>Actual: {actualWpm} WPM</span>
                <span>Accuracy: {accuracy}%</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Completed Session */}
      {speedReadingSession?.isCompleted && (
        <div className="speed-reading-results">
          <h3>🎉 Session Complete!</h3>
          <div className="results-grid">
            <div className="result-card">
              <span className="result-label">Total Words</span>
              <span className="result-value">{speedReadingSession.totalWords}</span>
            </div>
            <div className="result-card">
              <span className="result-label">Correct</span>
              <span className="result-value">{speedReadingSession.correctWords}</span>
            </div>
            <div className="result-card">
              <span className="result-label">Speed</span>
              <span className="result-value">{speedReadingSession.wpm} WPM</span>
            </div>
            <div className="result-card">
              <span className="result-label">Accuracy</span>
              <span className="result-value">{accuracy}%</span>
            </div>
          </div>
          <button className="btn-secondary" onClick={handleReset}>
            Try Another Chapter
          </button>
        </div>
      )}

      {/* Chapter Preview */}
      {currentChapter && !speedReadingSession && (
        <div className="chapter-preview">
          <h4>{currentChapter.title}</h4>
          <p className="preview-text">
            {currentChapter.content.substring(0, 200)}...
          </p>
          <span className="word-count">{currentChapter.wordCount} words</span>
        </div>
      )}
    </div>
  )
}

export default SpeedReading
