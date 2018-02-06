import * as React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import Navigation from '../Navigation'

const props = {
  userData: undefined,
}

describe('Layout component', () => {
  let navigation: ShallowWrapper<any>

  beforeEach(() => {
    navigation = shallow(<Navigation {...props} />)
  })

  it('Has a link to the homepage', () => {
    const links = navigation.find("Link")

    const homelink = links.filterWhere((link: any) =>
      link.prop("href") === "/"
    )

    expect(homelink.length).toBe(1)
  })

  describe('when signed in', () => {
    let fakeUserData: any
    beforeEach(() => {
      fakeUserData = {
        username: "testuser"
      }
      navigation = shallow(<Navigation userData={fakeUserData} />)
    })

    it('does not have a link to sign in page when already signed in', () => {
      const links = navigation.find("Link")
      
      const signin = links.filterWhere((link: any) =>
      link.prop("href") === "/signin"
      )
      
      expect(signin.length).toBe(0)
    })
    
    it('Contains link to profile page when signed in', () => {
      const links = navigation.find("Link")
      
      const profile = links.filterWhere((link: any) => {
        const linktext = link.find('a').first().text() === fakeUserData.username
        const linkurl = link.prop("href") === "/profile"
        return linktext && linkurl
      })
      
      expect(profile.length).toBe(1)
    })
  })

  it('Has a link to sign in page when no not signed in', () => {
    const links = navigation.find("Link")

    const signin = links.filterWhere((link: any) =>
      link.prop("href") === "/signin"
    )

    expect(signin.length).toBe(1)
  })

  it('Should not show profile link when no userData is present', () => {
    const links = navigation.find("Link")

    const profile = links.filterWhere((link: any) =>
      link.prop("href") === "/profile"
    )

    expect(profile.length).toBe(0)
  })
})
