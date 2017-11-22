import React from 'react';
import {Input, Button, Message} from 'semantic-ui-react';
import {Field, reduxForm, SubmissionError} from 'redux-form';
import {BUY_TOKENS} from '../constants';
import Aux from 'react-aux';


class Purchase extends React.Component{

  constructor(props){
  	super(props);
    this.submit = this.submit.bind(this);
    this.amountInput = this.amountInput.bind(this);
  }

  amountInput({input, meta: {touched, error}, ...custom}){

    const hasError = touched && error !== undefined;
    return(
      <Aux>

        {hasError &&
          <Message
            error
            header="Error"
            content={error}/>
        }

        <Input
          error={hasError}
          placeholder="Enter Amount"
          {...input}
          {...custom} />

      </Aux>
    )
  }

  submit({amount},dispatch){
    const {reset} = this.props;
    return new Promise((resolve, reject)=>{
      dispatch({
        type:BUY_TOKENS,
        amount,
        resolve,
        reject
      })
    }).catch((error)=>{
      throw new SubmissionError(error);
    }).then(()=>{
      reset();
    })
  }

  render(){
    const { handleSubmit} = this.props;

    return(
      <form onSubmit={handleSubmit(this.submit)}>
        <div>Buy Tokens</div>
        <Field name="amount" type="text" component={this.amountInput}/>
        <Button type="submit">Purchase</Button>
      </form>
    )
  }
}

const validate = ({amount}) => {
  const errors = {}
  if (!amount) amount = " ";
  if (amount.length < 1) {
    errors.amount = 'Required';
  }
  if (isNaN(Number(amount))) {
    errors.amount = 'Must be a number';
  }
  return errors
}


export default reduxForm({
  form: 'purchase',
  validate
})(Purchase);
