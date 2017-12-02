/**
 * Created by Bharat Negi on 24/11/17.
 */
import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import FormControlT from 'react-bootstrap/es/FormControl';
import { FormGroup, InputGroup } from 'react-bootstrap';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});


class callscripting extends Component{  
    state = {
        age: '',
        name: 'hai',
    };
    
    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };    

    render(){
        const { classes } = this.props;
        return(
            <div className="ibox">
                <div className="iboxHead"><h5>Call Scripting</h5></div>
                <div className="iboxContent">
                
                <div className="callScr-Dropdown">

                <FormControl>
                    <InputLabel htmlFor="age-simple">Select Campaign</InputLabel>
                    <Select
                        value={this.state.age}
                        onChange={this.handleChange('age')}
                        input={<Input id="age-simple" />}
                        >
                        <MenuItem value="">
                        <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>

                </div>
                    
                    <div className="howCan">
                        <FormGroup>
                            <InputGroup>
                                <FormControlT type="text" placeholder="How can i help you today?" />
                                <InputGroup.Addon><i class="fa fa-paper-plane-o" aria-hidden="true"></i></InputGroup.Addon>
                            </InputGroup>
                        </FormGroup>
                    </div>
                </div>
            </div>            
        );
    }
}

export default callscripting