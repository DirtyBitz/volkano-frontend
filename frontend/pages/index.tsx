import * as React from 'react'
import * as withRedux from 'next-redux-wrapper'
import store from '../store'
import { IStoreState } from '../store/StoreState'
import Layout from '../components/Layout'
import { SiteLayout } from '../constants/SiteLayout'
import { VolkaButton } from '../components/VolkaButton'

export class App extends React.Component<{}, {}> {
  render() {
    return (
      <Layout fixedHeader title="Volkano">
        <div id="jumbo">
          <div id="welcome-msg">
            <h1>Welcome to Volka.no</h1>
            <p>
              Start collecting today!
              <br />
              <br />
              <VolkaButton ghost title="Create Account" />
            </p>
          </div>

          <img src="https://www.svgrepo.com/show/31499/volcano.svg" />
        </div>

        <div id="info-boxes">
          <div className="info-box">
            <h3>Feature 1</h3>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the
              1500s, when an unknown printer took a galley of type and scrambled it to
              make a type specimen book. It has survived not only five centuries, but also
              the leap into electronic typesetting, remaining essentially unchanged. It
              was popularised in the 1960s with the release of Letraset sheets containing
              Lorem Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </div>
          <div className="info-box">
            <h3>Feature 2</h3>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the
              1500s, when an unknown printer took a galley of type and scrambled it to
              make a type specimen book. It has survived not only five centuries, but also
              the leap into electronic typesetting, remaining essentially unchanged. It
              was popularised in the 1960s with the release of Letraset sheets containing
              Lorem Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </div>
          <div className="info-box">
            <h3>Feature 3</h3>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the
              1500s, when an unknown printer took a galley of type and scrambled it to
              make a type specimen book. It has survived not only five centuries, but also
              the leap into electronic typesetting, remaining essentially unchanged. It
              was popularised in the 1960s with the release of Letraset sheets containing
              Lorem Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </div>
        </div>

        <style jsx>{`
          #jumbo {
            display: flex;
            background: #1c222a;
            padding-top: 100px;
            padding-bottom: 30px;
            color: #fff;
            flex-direction: column;

            img {
              margin: 0 auto;
              display: inline-block;
              margin-top: 30px;
              max-width: 200px;
            }
          }

          #welcome-msg {
            display: inline-block;
            margin: 0 auto;
            text-align: center;

            h1 {
              margin-bottom: 15px;
            }
          }

          #info-boxes {
            margin: 0 auto;
            display: flex;
            max-width: ${SiteLayout.pagewidth}px;
            padding: ${SiteLayout.defaultPadding};

            .info-box {
              margin: 15px;
              padding: 15px;
              border-radius: 5px;
              border: 1px solid #eee;
              background: #fff;
            }
          }
        `}</style>
      </Layout>
    )
  }
}

const mapStateToProps = (state: IStoreState) => {
  return {
    authentication: state.authentication,
  }
}

export default withRedux(store, mapStateToProps)(App)
