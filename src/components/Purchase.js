import React from 'react';
import {Input, Button, Message} from 'semantic-ui-react';
import {Field, reduxForm, SubmissionError} from 'redux-form';
import {BUY_TOKENS} from '../constants';


class Purchase extends React.Component{

  constructor(props){
  	super(props);
    this.submit = this.submit.bind(this);
    this.amountInput = this.amountInput.bind(this);
  }

  amountInput({input, meta: {touched, error}, ...custom}){

    const hasError = touched && error !== undefined;
    return(
      <div>

        {hasError &&
          <Message
            error
            header="Error"
            content={error}/>
        }

        <Input
          error={hasError}
          placeholder='Enter Amount'
          value=' '
          {...input}
          {...custom} />

      </div>
    )
  }

  submit({amount},dispatch){
    return new Promise((resolve, reject)=>{
      dispatch({
        type:BUY_TOKENS,
        amount,
        resolve,
        reject
      })
    }).catch((error)=>{
      throw new SubmissionError(error);
    })
  }

  render(){
    const { handleSubmit } = this.props;

    return(
      <form onSubmit={handleSubmit(this.submit)}>
        <div>Buy Tokens</div>
        <Field name="amount" component={this.amountInput}/>
        <Button type="submit">Purchase</Button>
      </form>
    )
  }
}

const validate = values => {

  const errors = {}

  if (!values.amount) {
    // errors.amount = 'Required'
  } else if (isNaN(Number(values.amount))) {
    // errors.amount = 'Must be a number'
  }

  console.log('VALUES!! ERRORS', values, errors)

  return errors
}


export default reduxForm({
  form: 'purchase',
  validate
})(Purchase);
