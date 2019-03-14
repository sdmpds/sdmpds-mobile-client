import React, {Component} from 'react';
import {Fab} from 'native-base';
import {Button, Icon} from 'react-native-elements'
import {withNavigation} from "react-navigation";
import PropTypes from 'prop-types';
import {map} from 'ramda';

class FloatButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false
        };
    }

    _onPressIcon(path: string) {
        this.setState({active: false}, () => this.props.navigation.navigate(path));

    }

    _onPressFab() {
        this.setState({active: !this.state.active})
    }

    render() {
        const {direction, backgroundColor, buttons} = this.props;

        if (buttons.length > 1) {
            return (

                <Fab
                    active={this.state.active}
                    direction={direction}
                    style={{backgroundColor: backgroundColor}}
                    position="bottomRight"
                    onPress={() => this._onPressFab()}
                >
                    <Icon name="plus" type={'entypo'} color={'white'}/>
                    {
                        map(item =>
                                <Button
                                    style={{backgroundColor: '#c4c4c4'}}
                                    title={item.title}
                                    onPress={() => this._onPressIcon(item.navigation)}
                                >
                                    <Icon name={item.icon.iconName} type={item.icon.type}/>
                                </Button>
                            , buttons)
                    }
                </Fab>

            )
        }
        else {
            return (
                <Fab
                    active={this.state.active}
                    direction={direction}
                    style={{backgroundColor: backgroundColor}}
                    position="bottomRight"
                    onPress={() => this._onPressIcon(buttons[0].navigation)}
                >
                    <Icon name={buttons[0].icon.name} type={buttons[0].icon.type} color={'white'}/>
                </Fab>
            )
        }
    }
}

FloatButton.propTypes = ({
    direction: PropTypes.string,
    backgroundColor: PropTypes.string,
    buttons: PropTypes.array.isRequired
});

FloatButton.defaultProps = ({
    direction: 'up',
    backgroundColor: 'gray',
    buttons: [{
        navigation: 'Home',
        title: 'Button',
        icon: {name: 'plus', type: 'entypo'}
    }]
});

export default withNavigation(FloatButton)