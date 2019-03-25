import * as React from 'react'
import {Text} from 'native-base'
export default props => <Text {...props} style={[{color: 'white'}, props.style]}>{props.children}</Text>