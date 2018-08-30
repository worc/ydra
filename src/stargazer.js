import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { connect } from 'react-redux'
import { take, call, put, fork } from 'redux-saga/effects'

import token from './token.js'

class Stargazer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            org: '',
            repo: '',
        }
    }

    handleKeyUp(e) {
        if(e.key === 'Enter') {
            this.props.requestStargazers(this.state.org, this.state.repo)
        }
    }

    render() {
        return (
            <Container>
                <h1>stargazer</h1>
                <input value={ this.state.org } placeholder='Organization' onChange={ (e) => this.setState({ org: `${ e.target.value }`}) } />
                <input value={ this.state.repo } placeholder='Repository' onChange={ (e) => this.setState({ repo: `${ e.target.value }`}) } onKeyUp={ (e) => this.handleKeyUp(e) }/>
                <input type='submit' onClick={ () => this.props.requestStargazers(this.state.org, this.state.repo) }/>
                <GazerGrid>{ this.props.gazers.map(gazer => (
                    <Gazer key={ gazer.id }>
                        <Avatar src={ gazer.avatar_url } />
                        <Name>{ gazer.login }</Name>
                    </Gazer>
                ))}
                </GazerGrid>
            </Container>
        )
    }
}

// {
//     "login": "goatslacker",
//     "id": 10632,
//     "node_id": "MDQ6VXNlcjEwNjMy",
//     "avatar_url": "https://avatars1.githubusercontent.com/u/10632?v=4",
//     "gravatar_id": "",
//     "url": "https://api.github.com/users/goatslacker",
//     "html_url": "https://github.com/goatslacker",
//     "followers_url": "https://api.github.com/users/goatslacker/followers",
//     "following_url": "https://api.github.com/users/goatslacker/following{/other_user}",
//     "gists_url": "https://api.github.com/users/goatslacker/gists{/gist_id}",
//     "starred_url": "https://api.github.com/users/goatslacker/starred{/owner}{/repo}",
//     "subscriptions_url": "https://api.github.com/users/goatslacker/subscriptions",
//     "organizations_url": "https://api.github.com/users/goatslacker/orgs",
//     "repos_url": "https://api.github.com/users/goatslacker/repos",
//     "events_url": "https://api.github.com/users/goatslacker/events{/privacy}",
//     "received_events_url": "https://api.github.com/users/goatslacker/received_events",
//     "type": "User",
//     "site_admin": false
// }

const REQUEST_STARGAZERS = 'request_stargazers'
export const stargazerSaga = () => fork(function* () {
    while(true) {
        const message = yield take(REQUEST_STARGAZERS)
        const response = yield call(() => axios({
            method: 'get',
            url: `https://api.github.com/repos/${ message.org }/${ message.repo }/stargazers`,
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'Authorization': `token ${ token }`
            }
        }))
        yield put({ type: 'RECEIVED_STARGAZERS', gazers: response.data })
    }
})

export const gazers = (gazers = [], message) => {
    switch (message.type) {
        case 'RECEIVED_STARGAZERS':
            return message.gazers
        default:
            return gazers
    }
}

const mapStateToProps = state => ({
    gazers: state.gazers
})

const mapDispatchToProps = dispatch => ({
    requestStargazers: (org, repo) => dispatch({ type: REQUEST_STARGAZERS, org, repo })
})

export default connect(mapStateToProps, mapDispatchToProps)(Stargazer)

const Container = styled.div`
  font-family: 'Lato', sans-serif;
`

const GazerGrid = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  width: 600px;
  margin: 50px auto;
`

const Gazer = styled.div`
  position: relative;
  margin: 5px;
  overflow: hidden;
`

const Avatar = styled.img`
  position: relative;
  z-index: 0;
  height: 100px;
  width: 100px;
`

const Name = styled.div`
  position: absolute;
  color: white;
  z-index: 1;
  bottom: 2px;
  left: 2px;
`
