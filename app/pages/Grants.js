import React from 'react'
import { local } from 'redux-react-local'
import { L, setLanguage } from '../lib/language'

import ReCAPTCHA from 'react-google-recaptcha'
import moment from 'moment'

var DatePicker = require('react-datepicker');
require('react-datepicker/dist/react-datepicker.css');

import s from './Grants.css'

@local({
  ident: btoa(`Grants`),
  initial: {
    date: '',
    name: '',
    email: '',
    phone: '',
    ask: '',
    totalCost: '',
    shortDescription: '',
    longDescription: '',
    googleToken: undefined,
    isSubmitting: false
  }
})
export default class Frontpage extends React.Component {
  constructor(props){
    super(props)

    this.inputChange = this.inputChange.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.captchaChange = this.captchaChange.bind(this)
  }
  inputChange(type,event){
    const { state, setState } = this.props
    const value = event.target.value

    setState({
      ...state,
      [type]: value ? value : ''
    })
  }
  handleDateChange(date) {
    const { state, setState } = this.props

    setState({
      ...state,
      date
    });
  }
  captchaChange(token){
    const { state, setState } = this.props

    setState({
      ...state,
      googleToken: token
    })
  }
  onSubmit(){
    const { state, setState } = this.props
    const {
      date,
      name,
      email,
      phone,
      ask,
      totalCost,
      longDescription,
      shortDescription,
      googleToken,
      isSubmitting
    } = state

    if(isSubmitting) return

    setState({
      ...state,
      isSubmitting: true
    })

    // const url = 'https://api.grassroots.com/grant/request'
    const url = 'http://localhost:3000/grant/request'

    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        date,
        name,
        email,
        phone,
        ask,
        totalCost,
        longDescription,
        shortDescription,
        googleToken
      })
    }).then( (res) => {
      if(!res.ok){
        setState({
          ...this.props.state,
          isSubmitting: false
        })

        return console.error('Something went wrong')
      }

      setState({
        ...this.props.state,
        isSubmitting: false
      })

      // this.props.handleSuccess()

    }).catch( (error) => {
      console.error('Could not send network request',error)
    })
  }
  render() {
    const {
      language,
      date,
      name,
      email,
      phone,
      ask,
      totalCost,
      longDescription,
      shortDescription
    } = this.props.state

    //Use correct language
    setLanguage(language)

    return (
      <div className={s.container}>
        <div className={s.content}>
          <div className={s.labelContainer}>
            <div className={s.label} >Contact</div>
          </div>

          <input
            type='text'
            value={name}
            placeholder="Name"
            className={ s.input }
            onChange={ (e) => this.inputChange('name',e) }/>

          <div className={s.contactContainer}>
            <input
              type='text'
              value={email}
              placeholder="Email"
              className={`${s.input} ${s.email}`}
              onChange={ (e) => this.inputChange('email',e) }/>

            <input
              type='text'
              value={phone}
              placeholder="Phone number"
              className={`${s.input} ${s.phone}`}
              onChange={ (e) => this.inputChange('phone',e) }/>
          </div>

          <div className={s.labelContainer}>
            <div className={s.label}>About your event</div>
          </div>

          <DatePicker
            selected={date}
            placeholderText="Date"
            dateFormat="DD/MM/YYYY"
            onChange={ (e) => this.handleDateChange(e) }
            locale="en"
            className={`${s.input} ${s.date}`} />

          <input
            type='text'
            value={shortDescription}
            placeholder="Short summary"
            className={ s.input }
            onChange={ (e) => this.inputChange('shortDescription',e) }/>

          <textarea
            type='text'
            value={longDescription}
            placeholder="Description"
            className={`${s.input} ${s.longDescription}`}
            onChange={ (e) => this.inputChange('longDescription',e) }/>

            <div className={s.labelContainer} >
              <div className={s.label}>Grant</div>
            </div>

          <div className={s.costContainer}>
            <input
              type='text'
              value={ask}
              placeholder="How much money do you need"
              className={`${s.input} ${s.ask}`}
              onChange={ (e) => this.inputChange('ask',e) }/>

            <input
              type='text'
              value={totalCost}
              placeholder="How much does the event cost?"
              className={`${s.input} ${s.totalCost}`}
              onChange={ (e) => this.inputChange('totalCost',e) }/>
          </div>

          <div className={s.captchaContainer}>
            <ReCAPTCHA
              ref='recaptcha'
              sitekey='6LdRlycTAAAAAHFDPQDPkspMIqEDnUR4xk7ouueV'
              onChange={ (e) => this.captchaChange(e) }
              className={s.captcha}
              />
          </div>
          <div className={s.sendContainer}>
            <div className={s.send} onClick={ () => this.onSubmit() }>Send</div>
          </div>
        </div>
      </div>
    )
  }
}
