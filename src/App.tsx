import { useCallback, useEffect, useMemo, useState } from 'react';
// sampled from https://botia.se/sprak/substantiv
import vocabsJson from '../assets/vocabs.json';
import './App.css';

interface Vocab {
  word: string;
  article: 'en' | 'ett';
}

async function getVocabs(): Promise<Vocab[]> {
  return Promise.resolve(vocabsJson as Vocab[]);
  // const response = await fetch('assets/vocabs.json');
  // return await response.json();
}

interface VocabQuizProps {
  vocab: Vocab;
  done: () => void;
}

function VocabQuiz({ vocab, done }: VocabQuizProps) {
  const [selection, setSelection] = useState<'en' | 'ett' | undefined>();

  useEffect(() => {
    setSelection(undefined);
  }, [vocab]);

  const onSelection = useCallback(
    (newSelection: 'en' | 'ett') => {
      if (selection === undefined) {
        setSelection(newSelection);
      } else {
        done();
      }
    },
    [selection]
  );

  return (
    <div className="VocabQuiz">
      <div className="word">{vocab.word}</div>
      <div className="buttons">
        <button
          onClick={() => onSelection('en')}
          className={
            selection && (vocab.article === 'en' ? 'correct' : undefined)
          }
        >
          en
        </button>
        <button
          onClick={() => onSelection('ett')}
          className={
            selection && (vocab.article === 'ett' ? 'correct' : undefined)
          }
        >
          ett
        </button>
      </div>
      {/* {selection !== undefined && (
        <div className="feedback">
          {selection === vocab.article ? 'Correct' : 'Happy little mistake'}
        </div>
      )} */}
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

  return (
    <div className="App">
      {vocab && (
        <VocabQuiz
          vocab={vocab}
          done={() => setVocabIndex((index) => (index + 1) % vocabs.length)}
        />
      )}
    </div>
  );
}

export default App;
