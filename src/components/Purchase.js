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
      return "error";
    } else {
      return "";
    }
  }

  purchaseInput({input, meta: {touched, error}, ...custom}){
    return(
      <Aux>
        <div className={this.isDisabled(error)}>{error ? error : "Enter amount to purchase"} </div>
        <Input
          size="big"
          error={error}
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
      <form className="Token-purchase" onSubmit={handleSubmit(this.onSubmit)}>
        <Field name="amount" disabled={this.props.account.id ? false : true} component={this.purchaseInput}/>
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
