import * as React from 'react'

class Footer extends React.Component {
  render() {
    return (
      <footer>
        Copyright © {new Date().getFullYear()} Volkano
        <style jsx>{`
          footer {
            padding: 15px;
            border-top: 1px solid #efefef;
            text-align: center;
          }
        `}</style>
      </footer>
    )
  }
}

export default Footer
