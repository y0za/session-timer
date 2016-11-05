
import React, { Component } from 'react'
import _ from 'lodash'
import Header from './header'
import Config from './config'
import Timer from './timer'
import Toolbar from './toolbar'
import Footer from './footer'
import SE from './se'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = this.getDefaultState()
  }

  getDefaultState() {
    return {
      limit: this.props.choices[0].total,
      timerProgress: 0,
      restTimeClassName: '',
      running: false,
      pausing: false
    }
  }

  render() {
    return (
      <div className={'rest-time ' + this.state.restTimeClassName} onClick={this.handleClickScreen.bind(this)}>
        <Header />
        <SE ref="se" sound={this.props.sound} />
        <Timer ref="timer" limit={this.state.limit} pausing={this.state.pausing} onTick={this.handleTick.bind(this)} onLimit={this.handleLimit.bind(this)} />
        <Toolbar>
          <button disabled={!this.state.pausing && this.state.running} onClick={this.handleClickStart.bind(this)}>{this.getStartLabel()}</button>
          <Config disabled={this.state.running} choices={this.props.choices} onChange={this.handleChangeLimit.bind(this)} />
          <button disabled={!this.state.running} onClick={this.handleClickPauseReset.bind(this)}>{this.getPauseResetLabel()}</button>
        </Toolbar>
        <Footer timerProgress={this.state.timerProgress} />
      </div>
    )
  }

  handleClickScreen() {
    this.refs.se.load()
  }

  handleClickStart() {
    if (this.state.pausing) {
      this.setState({
        pausing: false
      })
    } else {
      this.refs.timer.start()
      this.setState({ running: true })
    }
  }

  handleClickPauseReset() {
    if (this.state.pausing) {
      this.refs.timer.stop()
      this.refs.se.pause()
      this.setState({
        timerProgress: 0,
        running: false,
        pausing: false
      })
    } else {
      this.setState({
        pausing: true
      })
    }
  }

  handleChangeLimit(limit) {
    const restTimeClassName = this.getDefaultState().restTimeClassName
    this.setState({ limit, restTimeClassName })
  }

  handleTick(past) {
    this.setState({
      timerProgress: past / this.state.limit,
      restTimeClassName: this.getRestTimeClass(past)
    })
  }

  handleLimit() {
    this.refs.se.play()
    this.setState(_.pick(this.getDefaultState(), 'restTimeClassName', 'running'))
  }

  getRestTimeClass(past) {
    const choice = this.getCurrentChoice()
    const offset = this.getNotificationOffset(past, choice)
    const classes = this.getRestTimeClasses(choice)
    const idx = Math.max(classes.length - offset, 0)

    return classes[idx]
  }

  getRestTimeClasses(choice) {
    const classes = [
      'notice',
      'warning',
      'danger'
    ]

    return [''].concat(classes.slice(-choice.notifications.length))
  }

  getChoice(total) {
    for (let t of this.props.choices) {
      if (t.total === total) return t
    }

    throw new Error(`Unknown total: ${total}`)
  }

  getCurrentChoice() {
    return this.getChoice(this.state.limit)
  }

  getNotificationOffset(past, choice) {
    past = parseInt(past)
    const timings = [0].concat(choice.notifications).concat([choice.total])

    return _.findIndex(timings.reverse(), n => past >= n)
  }

  getStartLabel() {
    return this.state.pausing ? 'Resume' : 'Start'
  }

  getPauseResetLabel() {
    return this.state.pausing ? 'Reset' : 'Pause'
  }
}
