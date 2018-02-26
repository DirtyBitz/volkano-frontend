import * as React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import Navigation from '../Navigation'

const props = {
  isSignedIn: undefined,
  user: undefined,
}

describe('Layout component', () => {
  let navigation: ShallowWrapper<any>

  beforeEach(() => {
    navigation = shallow(<Navigation {...props} />)
  })

  it('has a link to the homepage', () => {
    const links = navigation.find('Link')

    const homelink = links.filterWhere((link: any) => link.prop('href') === '/')

    expect(homelink.length).toBe(1)
  })

  describe('when signed in', () => {
    let fakeProps: any
    beforeEach(() => {
      fakeProps = {
        isSignedIn: true,
        user: {
          email: 'testuser',
        },
      }
      navigation = shallow(<Navigation {...fakeProps} />)
    })

    it('has a link to collection page', () => {
      const links = navigation.find('Link')
      const collection = links.filterWhere(
        (link: any) => link.prop('href') === '/collection'
      )
      expect(collection.length).toBe(1)
    })

    it('does not have a link to sign in page', () => {
      const links = navigation.find('Link')

      const signin = links.filterWhere((link: any) => link.prop('href') === '/signin')

      expect(signin.length).toBe(0)
    })

    it('has a link to profile page', () => {
      const links = navigation.find('Link')

      const profile = links.filterWhere((link: any) => {
        const linktext =
          link
            .find('a')
            .first()
            .text() === fakeProps.user.email
        const linkurl = link.prop('href') === '/profile'
        return linktext && linkurl
      })

      expect(profile.length).toBe(1)
    })
  })

  describe('when not signed in', () => {
    it('has a link to sign in page', () => {
      const links = navigation.find('Link')
      const signin = links.filterWhere((link: any) => link.prop('href') === '/signin')

      expect(signin.length).toBe(1)
    })

    it('does not have a link to profile', () => {
      const links = navigation.find('Link')

      const profile = links.filterWhere((link: any) => link.prop('href') === '/profile')

      expect(profile.length).toBe(0)
    })

    it('does not have a link to collection page', () => {
      const links = navigation.find('Link')
      const collection = links.filterWhere(
        (link: any) => link.prop('href') === '/collection'
      )

      expect(collection.length).toBe(0)
    })
  })
})
