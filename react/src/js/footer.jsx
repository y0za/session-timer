import React from 'react'

export default ({ timerProgress }) => {
  const style = {
    transform: `rotate(${360 * timerProgress}deg)`
  }

  return (
    <div id="footer">
      <p>
        <img src="./logo-flat.png" style={style} />
        <span>Powered by <a href="https://builderscon.io" target="_blank">builderscon</a></span>
      </p>
    </div>
  )
}
