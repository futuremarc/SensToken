import React, {Component} from 'react';
import {Input, Button} from 'semantic-ui-react';
import {Field, reduxForm, SubmissionError} from 'redux-form';
import {buyToken} from '../actions/actionCreators';
import Aux from 'react-aux';
import Message from './Message';
import injectSheet from 'react-jss';

class Purchase extends Component{

  constructor(props) {
  	super();
    this.submit = this.submit.bind(this);
    this.purchaseInput = this.purchaseInput.bind(this);
  }

  isButtonDisabled(error){
    const {wallet, txStatus} = this.props;
    if (!wallet.id || error || txStatus.pending === true){
      return true;
    }
    else {
      return false;
    }
  }

  purchaseInput({input, meta: {error}, ...custom}){
    const {classes, token, txStatus, wallet} = this.props;
    const {label, disabled} = classes;
    const {symbol} = token;
    const {pending} = txStatus;
    const hasError = (error !== undefined);
    const messageProps = {
      text: error,
      type: 'error'
    };
    return (
      <Aux>
        <div className={!wallet.id ? `${label} ${disabled}` : label}>
          Enter amount to purchase
        </div>
        <Input
          size="big"
          error={hasError}
          placeholder={symbol}
          {...input}
          {...custom} />
        <Button
          type="submit"
          size="big"
          loading={!pending ? false : true }
          disabled={this.isButtonDisabled(hasError)}>Purchase
        </Button>
        {hasError ? <Message {...messageProps}/> : <div></div>}
      </Aux>
    )
  }

  submit({amount}, dispatch){
    if (!amount) return /*temp: if empty dont throw a validate error just do nothing*/
    const {reset} = this.props;
    return new Promise((resolve, reject) => {
      dispatch(buyToken(amount,resolve,reject))
    })
    .then(reset).catch((error)=> {throw new SubmissionError(error)});
  }

  render() {
    const {handleSubmit, classes, wallet} = this.props;
    const {purchaseInput} = classes;
    const {id} = wallet;
    return (
      <form className={purchaseInput} onSubmit={handleSubmit(this.submit)}>
        <Field
          name="amount"
          disabled={id ? false : true}
          component={this.purchaseInput}/>
      </form>
    )
  }
}

const validate = ({amount}, props) => {
  let errors = {}
  if (amount === undefined) return /*temp: if empty dont throw a validate error just do nothing*/
  if (isNaN(Number(amount))) {
    errors.amount = 'Please enter a number';
  }
  return errors
}

const purchaseForm = reduxForm({
  form: 'purchase',
  validate
})(Purchase);

const styles = theme => ({
  purchaseInput: {
    paddingTop:'40px'
  },
  label: {
    marginBottom: '7px'
  },
  disabled: theme.disabled
});

export default injectSheet(styles)(purchaseForm)
