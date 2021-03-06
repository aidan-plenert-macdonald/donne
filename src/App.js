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
          id={props.id}
          role="input"
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

function App(props) {
  const [schema, setSchema] = useState({});
  const [verbs, setVerbs] = useState({});
  const [verb, setVerb] = useState(undefined);
  const randomVerb = () => {
    const v = Object.keys(verbs);
    setVerb(v[Math.floor(Math.random() * v.length)]);
  }
  const updatedSchema = (s, v) => {
    if (v === undefined) {
      const { title, ...filteredSchema } = s;
      return filteredSchema;
    } else {
      return { ...s, title: v, description: verbs[v]._def};
    }
  }

  const validate = (formData, errors) => {
    const expected = verbs[verb];

    Object.keys(schema.properties).forEach(
      tense => {
        Object.keys(schema.properties[tense].properties).forEach(
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
      fetch(`${process.env.PUBLIC_URL}/${props.schema}`)
        .then(res => res.json())
        .then(res => setSchema(updatedSchema(res, verb)))
    }, [props.schema]
  );

  useEffect(
    () => {
      fetch(`${process.env.PUBLIC_URL}/${props.list}`)
        .then(res => res.json())
        .then(res => setVerbs(res))
    }, [props.list]
  );

  useEffect(randomVerb, [verbs]);

  useEffect(
    () => {
      setSchema(s => updatedSchema(s, verb))
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
