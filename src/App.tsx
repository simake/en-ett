import { useCallback, useEffect, useMemo, useState } from 'react';
import './App.css';

interface Vocab {
  word: string;
  article: 'en' | 'ett';
}

async function getVocabs(): Promise<Vocab[]> {
  const response = await fetch('assets/vocabs.json');
  return await response.json();
}

interface VocabQuizProps {
  vocab: Vocab;
}

function VocabQuiz({ vocab }: VocabQuizProps) {
  const [feedback, setFeedback] = useState<boolean | undefined>();

  const onEnClick = useCallback(() => {
    setFeedback(vocab.article === 'en');
  }, []);

  const onEttClick = useCallback(() => {
    setFeedback(vocab.article === 'ett');
  }, []);

  return (
    <div className="VocabQuiz">
      <div className="word">
        <span>?</span>
        <span>{vocab.word}</span>
      </div>
      <div className="buttons">
        <button onClick={onEnClick}>en</button>
        <button onClick={onEttClick}>ett</button>
      </div>
      {feedback !== undefined && (
        <div className="feedback">{feedback ? 'Correct' : 'Wrong'}</div>
      )}
    </div>
  );
}

function App() {
  const [vocabs, setVocabs] = useState<Vocab[]>([]);
  const [vocabIndex, setVocabIndex] = useState(0);

  const shuffledVocabs = useMemo(
    () => vocabs.sort(() => 0.5 - Math.random()),
    [vocabs]
  );
  const vocab = shuffledVocabs[vocabIndex];

  useEffect(() => {
    getVocabs().then((x) => setVocabs(x));
  }, []);

  return <div className="App">{vocab && <VocabQuiz vocab={vocab} />}</div>;
}

export default App;
