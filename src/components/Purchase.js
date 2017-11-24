import React from 'react';
import {Input, Button} from 'semantic-ui-react';
import {Field, reduxForm, SubmissionError} from 'redux-form';
import {buyTokens} from '../actions/actionCreators';
import Aux from 'react-aux';
import FaExclamationCircle from 'react-icons/lib/fa/exclamation-circle';


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
    if (!this.props.account.id || error){
      return true;
    } else {
      return false;
    }
  }

  purchaseInput({input, meta: {touched, error, active, invalid}, ...custom}){
    const hasError = ((error))
    return (
      <Aux>
        {hasError ? <div className="error-color"><FaExclamationCircle/>{error}</div> : <div>Enter amount to purchase</div>}
        <Input
          size="big"
          error={hasError}
          placeholder="SENS"
          {...input}
          {...custom} />
        <Button size="big" disabled={this.buttonDisabled(hasError)} type="submit">Purchase</Button>
      </Aux>
    )
  }

  submit({amount}, dispatch){
    if (!amount) return       /*this manually validates and works against redux-form philosophy, fix later*/
    return new Promise((resolve, reject) => dispatch(buyTokens(amount,resolve,reject)))
    .then(this.props.reset).catch((error)=> throw new SubmissionError(error));
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

const validate = (values, props) => {
  let errors = {}
  if (props.pristine && values.amount === undefined) return /*exit validate on initial render b/c redux-form shouldValidate not working*/
  if (!values.amount || values.amount.trim() === '') {
    errors.amount = 'Required';
  } else if (isNaN(Number(values.amount))) {
    errors.amount = 'Please enter a number.';
  }
  return errors
}

const purchaseForm = reduxForm({
  form: 'purchase',
  validate
})(Purchase);


export default purchaseForm;
