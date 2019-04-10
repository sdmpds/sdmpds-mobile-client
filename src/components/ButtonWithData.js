import React, {Component} from 'react';
import {Picker, Text, View} from 'native-base'
import {Col, Row} from 'react-native-easy-grid'
import {map} from 'ramda'
import PropTypes from 'prop-types';

export default class ButtonWithData extends Component {

    state = {
        selected: this.props.selected
    };

    onSelect = (value) =>{
        this.setState({selected:value});
        this.props.onValueChange(value)
    }

    render() {
        const {items, description} = this.props;

        return (
            <Row size={10}  style={{textAlign: 'center', alignItems: "center", justifyContent: 'center',}}>
                <Col size={50}>
                    <View>
                        <Text style={{textAlign: 'center'}}>{description}</Text>
                    </View>
                </Col>
                <Col size={50}>
                    <Picker
                        note
                        mode="dropdown"
                        style={
                            {
                                width: 120,
                                borderWidth: 1,
                                borderRadius: 25,
                                borderColor: 'gray',
                            }
                        }
                        selectedValue={this.state.selected}
                        onValueChange={this.onSelect.bind(this)}
                    >
                        {
                            map(item => <Picker.Item key={item} label={item.label} value={item.value}/>, items)
                        }
                    </Picker>
                </Col>
            </Row>
        );
    }
};

ButtonWithData.propTypes = ({
    onValueChange: PropTypes.func.isRequired,
    selected: PropTypes.any.isRequired,
    description: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired
})