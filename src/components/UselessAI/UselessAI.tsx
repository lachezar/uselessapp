import React, { useEffect, useRef, useState } from 'react';
import * as styles from './UselessAI.module.scss';
import { Button, TextField } from '@mui/material';

const UselessAI = (props: unknown) => {
  const [count, setCount] = useState(0);
  const [correction, setCorrection] = useState(0);
  const countRef = useRef(count);
  countRef.current = count;
  const correctionRef = useRef(correction);
  correctionRef.current = correction;

  useEffect(() => {
    const timerId = setInterval(() => setCount(countRef.current + correctionRef.current), 1000);
    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    if (count >= 10 && correction === 0) {
      setCorrection(-1);
    } else if (count <= -10 && correction === 0) {
      setCorrection(1);
    } else if (count === 0) {
      setCorrection(0);
    }
  }, [count]);

  return (
    <div className={styles.uselessContainer}>
      <div className={styles.uselessClass}>
        <Button variant="contained" onClick={() => setCount(count + 1)}>
          +
        </Button>
        <TextField variant="outlined" inputProps={{ readOnly: true, sx: { textAlign: 'center' } }} value={count} />
        <Button variant="contained" onClick={() => setCount(count - 1)}>
          -
        </Button>
      </div>
      <div className={styles.uselessClass}>Count to 10 in either direction.</div>
    </div>
  );
};

export default UselessAI;
