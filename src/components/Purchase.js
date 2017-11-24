import React from 'react';
import {Input, Button, Message} from 'semantic-ui-react';
import {Field, reduxForm, SubmissionError} from 'redux-form';
import {BUY_TOKENS} from '../constants';
import Aux from 'react-aux';

class Purchase extends React.Component{

  constructor(props){
  	super();
    this.onSubmit = this.onSubmit.bind(this);
    this.purchaseInput = this.purchaseInput.bind(this);
  }

  isDisabled(error){
    if (!this.props.account.id){
      return "disabled";
    } else if (error){
      return "error-color";
    } else {
      return "";
    }
  }

  purchaseInput({input, meta: {touched, error}, ...custom}){
    const hasError = (error && touched)
    return(
      <Aux>
        <div className={this.isDisabled(error)}>{error ? error : "Enter amount to purchase"} </div>
        <Input
          size="big"
          error={hasError}
          placeholder="SENS"
          {...input}
          {...custom} />
        <Button size="big" disabled={this.isDisabled(error)} type="submit">Purchase</Button>
      </Aux>
    )
  }

  onSubmit({amount}, dispatch){
    const {reset} = this.props;
    return new Promise((resolve, reject)=>{
      dispatch({
        type: BUY_TOKENS,
        amount,
        resolve,
        reject
      })
    }).catch((error)=>{
      throw new SubmissionError(error);
    }).then(reset);
  }

  render(){
    const {handleSubmit} = this.props;
    return(
      <form className="Purchase" onSubmit={handleSubmit(this.onSubmit)}>
        <Field
          name="amount"
          disabled={this.props.account.id ? false : true}
          component={this.purchaseInput}/>
      </form>
    )
  }
}

const validate = ({amount}) => {
  let errors = {}
  if (!amount) amount = ' ';
  if (!amount) {
    errors.amount = 'Required';
  } else if (isNaN(Number(amount))) {
    errors.amount = 'Must be a number';
  }
  console.log('errors', errors, typeof errors)
  return errors
}

export default reduxForm({
  form: 'purchase',
  validate
})(Purchase);
