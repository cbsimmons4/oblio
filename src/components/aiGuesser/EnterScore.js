import React, { Component,Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import {connect} from 'react-redux';
import {updateGuess} from '../../redux/actions/aiGuesserActions'

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = (theme) => ({
    ...theme.spreadThis,
    button: {
        marginTop: '25px',
        display: 'block',
        margin: 'auto',
        width: 250,
        height: 100,
        fontSize: 40
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 400,
        
    },
    textContainer: {
        margin: 'auto',
        width: '80%'
    },
    center: {
        display: 'block',
        margin: 'auto',
        textAlign: 'center'
    },
    submitButton: {
        marginTop: 20
    }
});

class EnterScore extends Component {

    state = {
        hardMatch: 0,
        softMatch: 0
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleClick = () => {
        this.props.updateGuess(this.state.hardMatch,this.state.softMatch);
    }

    render() {
        const {classes, ai: {currentGuess}} = this.props;
        return (

            <Fragment>
                <div className ={classes.textContainer}>
                    <Typography align="center" variant="h3" colors ="textSecondary" color = "primary"> 
                        The Guess Was {currentGuess[0]} {currentGuess[1]} {currentGuess[2]} {currentGuess[3]}
                    </Typography>
                    <Typography align="center" variant="h5" colors ="textSecondary" color = "primary"> 
                        How many digits within the guess are in the correct position?
                    </Typography>
                    <Typography align="center" variant="body1" colors ="textSecondary" color = "primary"> 
                        Ex: If your number was 4679 and the guess was 7689, 
                        the number of digits in the correct postion is 2
                    </Typography>
                    <Typography align="center" variant="body2" colors ="textSecondary" color = "primary"> 
                        (6 and 9 were in the correct position)
                    </Typography>
                </div>
                <div className = {classes.center}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-filled-label"># Digits in correct position</InputLabel>
                        <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        name="hardMatch"
                        value={this.state.hardMatch}
                        onChange={this.handleChange}
                        >
                            <MenuItem value={0}>0</MenuItem>
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className ={classes.textContainer}>
                    <Typography align="center" variant="h5" colors ="textSecondary" color = "primary"> 
                        How many digits were guessed correctly, but are in the wrong position?
                    </Typography>
                    <Typography align="center" variant="body1" colors ="textSecondary" color = "primary"> 
                        Ex: If your number was 4679 and the guess was 7689, 
                        the number of digits in the guess but in the correct position is 1
                    </Typography>
                    <Typography align="center" variant="body2" colors ="textSecondary" color = "primary"> 
                        (7 was in the guess, but it was not in the correct position)
                    </Typography>
                </div>
                <div className = {classes.center}>
                    <FormControl  className={classes.formControl}>
                        <InputLabel id="demo-simple-select-filled-label"># Digits in guess, but wrongly positioned? </InputLabel>
                        <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        name="softMatch"
                        value={this.state.softMatch}
                        onChange={this.handleChange}
                        >
                            <MenuItem value={0}>0</MenuItem>
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                        </Select>
                    </FormControl>
                    <div>
                        <Button variant="contained" color="primary" className = {classes.submitButton}
                            onClick = {this.handleClick}>
                            Submit
                        </Button>
                    </div>
                </div>
            </Fragment>
        )
    }
}

EnterScore.propTypes = {
    updateGuess: PropTypes.func.isRequired,
    ai: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    ai: state.ai
})

export default connect(mapStateToProps, {updateGuess} )(withStyles(styles)(EnterScore))
