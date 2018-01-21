import { h, render, Component } from 'preact'
import renderToString from 'preact-render-to-string'

const initialState = window.__INITIAL_STATE__

class Clock extends Component {
  render(props, state) {
    let time = new Date(state.time).toLocaleTimeString()
    return <span>{time}</span>
  }

  componentDidMount() {
    // update time every second
    this.timer = setInterval(() => {
      this.setState({ time: Date.now() })
    }, 1000)
  }

  componentWillUnmount() {
    // stop when not renderable
    clearInterval(this.timer)
  }

  state = { time: Date.now() }
}

class Name extends Component {
  render(props, { name }) {
    return (
      <button onClick={this.handleButton}>{name}</button>
    )
  }

  componentDidMount() {
    const { name } = initialState
    this.setState({ name })
  }

  handleButton = () => alert(JSON.stringify(this.state))

  state = { name: '' }
}

export const html = renderToString(<Clock />)

class App extends Component {
  render() {
    return (
      <div>
        <Clock />
        <br />
        <Name />
      </div>
    )
  }

  componentDidMount() {
    console.log(html)
  }
}

render(<App />, document.body)
