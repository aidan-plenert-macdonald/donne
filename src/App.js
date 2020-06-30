import React, { useState, useEffect } from 'react';
import Form from "@rjsf/core";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function App() {
  const [schema, setSchema] = useState({});
  const [verbs, setVerbs] = useState({});
  const [verb, setVerb] = useState(undefined);
  const randomVerb = () => {
    const v = Object.keys(verbs);
    setVerb(v[Math.floor(Math.random() * v.length)]);
  }

  const validate = (formData, errors) => {
    const expected = verbs[verb];

    Object.keys(expected).forEach(
      tense => {
        Object.keys(expected[tense]).forEach(
          pronoun => {
            if (expected[tense][pronoun] != formData[tense][pronoun]) {
              errors[tense][pronoun].addError("Not correct: " + expected[tense][pronoun]);
            }
          }
        )
      }
    )

    return errors;
  }

  useEffect(
    () => {
      fetch("/verbs.schema.json")
        .then(res => res.json())
        .then(res => setSchema(res))
    }, []
  );

  useEffect(
    () => {
      fetch("/verbs.json")
        .then(res => res.json())
        .then(res => setVerbs(res))
    }, []
  );

  useEffect(randomVerb, [verbs]);
  
  useEffect(
    () => {
      setSchema({title: verb, ...schema})
    }, [verb]
  )

  return (
    <div>
      <Container>
        <Row>
          <Form
            schema={schema} 
            validate={validate}
            ErrorList={() => { return <div></div>; }}
          />
        </Row>
      </Container>
    </div>
  );
}

export default App;
