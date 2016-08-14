import React from 'react'
import { Link } from 'react-router'

import s from './Frontpage.css'

import { local } from 'redux-react-local'

import { Parallax } from 'react-parallax';

import { L, setLanguage } from '../lib/language'

@local({
  ident: btoa(`Frontpage`),
  initial: {
    language: 'english'
  }
})
export default class Frontpage extends React.Component {
  componentWillMount() {
    //language realted code
    // fetch('http://ip-api.com/json')
    //   .then( (res) => res.json())
    //   .then( (data) => {
    //     console.log('data',data)
    //
    //     const { state, setState } = this.props
    //
    //     if(data.country === 'Iceland'){
    //       setState({
    //         ...state,
    //         language: 'icelandic'
    //       })
    //     }else{
    //       setState({
    //         ...state,
    //         language: 'english'
    //       })
    //     }
    //   })
    //   .catch( (error) => console.error(error))
  }
  render() {
    const {
      language
    } = this.props.state

    //Use correct language
    setLanguage(language)

    return (
      <div className={s.container}>
        <div className={s.firstContainer}
          style={{
            backgroundImage: `url("${require('../img/frontimg.png')}")`
          }}>
          <div className={s.wrapper}>
            <img className={s.logo} src=""/>
            <div className={s.headline}>GETTING A GRANT FOR AN EVENT IS HARD </div>
            <div className={s.slogan}>We make that process much more simple...</div>
            <Link className={s.tryButton}
              style={{marginTop:'40px'}}
              to='/grants'>
              Apply for a grant
            </Link>
          </div>
        </div>
        <div className={s.secondContainer}>
          <div className={s.wrapper}>
            <div className={s.showcaseContainer}>
              <div className={s.showcaseLeft}>
                <div className={s.showcaseHeadline}>WHAT IS IT</div>
                <div className={s.showcaseText}>The grassroots fund is a fund to help you raise money to host your first community event.</div>
                <div className={s.showcaseText}>With a transparent grant process it is easier than ever to bootstrap an event, where everyone can apply who wants to host a startup or a tech related event.</div>
                <div className={s.showcaseText}>By working with partners from both the private sector and the government we are able to pool togeather resources so you don't have to.</div>
              </div>
              <div className={s.showcaseRight}>
                <img className={s.phone} src={require('../img/phone@2x.png')}/>
              </div>
            </div>
          </div>
        </div>
        <div className={s.thirdContainer}>
          <Parallax bgImage={require('../img/lyingimg.png')} strength={200} className={s.parallax}>
            <div className={s.testemonyContainer}>
              <div className={s.testimonyHeadline}>WE COULD BE LYING BUT OUR CLIENTS WON'T</div>
            </div>
          </Parallax>
        </div>
        <div className={s.fourthContainer}>
          <div className={s.wrapper}>
            <div className={s.testimonyContainer}>
              Show partners
            </div>
            <div className={s.calculatorContainer}>
              <div className={`${s.calculatorText} ${s.calculatorTextUpper}`} >
                We hand out up to&nbsp;<div className={s.calculatorCost}>200.000kr.</div>&nbsp;in grants per month
              </div>
              <Link className={`${s.tryButton} ${s.calculatorTryButton}`} to="/grants">Apply for a grant</Link>
            </div>
          </div>
        </div>
        <div className={s.footerBreaker}/>
        <div className={s.footer}>
          <div className={`${s.wrapper} ${s.footerWrapper}`}>
            <div className={s.footerItems}>

              <div style={{flex:8}}/>

              <div className={s.footerItemWrapper}>
                <a className={s.footerItemInner} href="https://grassroots.com/Press.zip">
                  <img className={s.pressIcon} src={require('../img/press@2x.png')}/>
                  {L('press')}
                </a>
              </div>
              <div className={s.footerItemWrapper}>
                <a className={s.footerItemInner} href="mailto:david@watchboxapp.com">
                  <img className={s.contactIcon} src={require('../img/contact@2x.png')}/>
                  {L('contactUs')}
                </a>
              </div>
              <div className={s.footerItemWrapper}>
                <div className={s.footerItemInner}>
                  <img className={s.teamIcon} src={require('../img/team@2x.png')}/>
                  The Team
                </div>
              </div>

              <div style={{flex:8}}/>
            </div>
            <div className={s.copyright}>© The Grassroots Fund&nbsp;{new Date().getFullYear()}&nbsp;</div>
          </div>
        </div>
      </div>
    )
  }
}
