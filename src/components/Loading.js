import * as React from 'react'
import {Container, Spinner} from 'native-base';

export default class Loading extends React.Component {

    render() {
        return (
            <Container style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                <Spinner color={'black'}/>
            </Container>
        )
    }
}
