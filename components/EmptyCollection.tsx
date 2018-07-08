import Link from 'next/link'
import { Container, Button } from 'semantic-ui-react'

export default props => (
  <div className="page">
    <Container textAlign="center">
      <h1>Your collection is empty</h1>
      <div>
        This page will display all of the items you've collected. Click the friendly
        button to get started!
      </div>
      <div id="add-item">
        <Link href="/additem">
          <Button
            circular
            color="green"
            size="massive"
            icon="add"
            style={{ marginTop: '2em' }}
          />
        </Link>
      </div>
    </Container>
    <style jsx>{`
      .page {
        display: flex;
        justify-content: space-around;
      }
    `}</style>
  </div>
)
