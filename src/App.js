import React, { useState, useEffect } from 'react';
import Form from "@rjsf/core";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

const widgets = {
  TextWidget: (props) => {
    return (
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text>{props.label}</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          key={props.id}
          onChange={
            ({ target: { value } }) => {
              return props.onChange(
                value === "" ? props.options.emptyValue : value.toLowerCase());
            }
          } />
      </InputGroup>
    )
  }
};

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
            if (expected[tense][pronoun] !== formData[tense][pronoun]) {
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
      fetch(`${process.env.PUBLIC_URL}/verbs.schema.json`)
        .then(res => res.json())
        .then(res => setSchema(res))
    }, []
  );

  useEffect(
    () => {
      fetch(`${process.env.PUBLIC_URL}/verbs.json`)
        .then(res => res.json())
        .then(res => setVerbs(res))
    }, []
  );

  useEffect(randomVerb, [verbs]);

  useEffect(
    () => {
      if (verb === undefined) {
        const { title, ...filteredSchema } = schema;
        setSchema(filteredSchema);
      } else {
        setSchema({ ...schema, title: verb });
      }
    }, [verb]
  )

  return (
    <div>
      <Container>
        <Row>
          <Form
            key={verb}
            schema={schema}
            validate={validate}
            showErrorList={false}
            onSubmit={randomVerb}
            widgets={widgets}
            FieldTemplate={
              (props) => {
                return (
                  <div>
                    {props.children}
                    {props.errors}
                  </div>
                );
            }}
          />
        </Row>
      </Container>
    </div>
  );
}

export default App;
