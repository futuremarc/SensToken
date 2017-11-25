import React from 'react';
import {Input, Button} from 'semantic-ui-react';
import {Field, reduxForm, SubmissionError} from 'redux-form';
import {buyTokens} from '../actions/actionCreators';
import Aux from 'react-aux';
import Message from './Message';

class Purchase extends React.Component{

  constructor(props) {
  	super(props);
    this.submit = this.submit.bind(this);
    this.purchaseInput = this.purchaseInput.bind(this);
  }

  labelDisabled(error) {
    if (!this.props.account.id) {
      return "disabled";
    } else if (error) {
      return "error-color";
    } else {
      return "";
    }
  }

  buttonDisabled(error){
    if (!this.props.account.id || error || this.props.txStatus.pending === true){
      return true;
    } else {
      return false;
    }
  }

  purchaseInput({input, meta: {error}, ...custom}){
    const hasError = (error !== undefined);
    const labelStyle = {
      marginBottom: '7px'
    };
    const messageProps = {
      text: error,
      type: 'error'
    };
    return (
      <Aux>
        <div style={labelStyle}>Enter amount to purchase</div>
        <Input
          size="big"
          error={hasError}
          placeholder={this.props.tokens.symbol}
          {...input}
          {...custom} />
        <Button
          type="submit"
          size="big"
          loading={!this.props.txStatus.pending ? false : true }
          disabled={this.buttonDisabled(hasError)}>Purchase
        </Button>
        {hasError ? <Message {...messageProps}/> : <div></div>}
      </Aux>
    )
  }

  submit({amount}, dispatch){
    if (!amount) return       /*temporary... see validate function*/
    return new Promise((resolve, reject) => dispatch(buyTokens(amount,resolve,reject)))
    .then(this.props.reset).catch((error)=> {throw new SubmissionError(error)});
  }

  render() {
    const {handleSubmit} = this.props;
    return (
      <form className="Purchase" onSubmit={handleSubmit(this.submit)}>
        <Field
          name="amount"
          disabled={this.props.account.id ? false : true}
          component={this.purchaseInput}/>
      </form>
    )
  }
}

const validate = ({amount}, props) => {
  let errors = {}
  if (props.pristine && amount === undefined) return /*exit validate on initial render redux-form shouldValidate not working?*/
  if (isNaN(Number(amount))) {
    errors.amount = 'Please enter a number.';
  }
  return errors
}

const purchaseForm = reduxForm({
  form: 'purchase',
  validate
})(Purchase);


export default purchaseForm;
