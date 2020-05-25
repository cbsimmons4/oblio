import React, { Component,Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import {connect} from 'react-redux';
import {aiWin,goToEnterScore} from '../../redux/actions/aiGuesserActions';

const styles = (theme) => ({
    ...theme.spreadThis,
    yes: {
        color: "#fff",
        backgroundColor: '#00e676'
    },
    button: {
        margin: '10px',
        width: 200,
        height: 100,
        fontSize: 40
    },
    buttonsContainer: {
        display: 'block',
        margin: 'auto',
        textAlign: 'center'
    }
});

class Guess extends Component {

    handleClickYes = () => {
        this.props.aiWin();
    }

    handleClickNo = () => {
        this.props.goToEnterScore();
    }

    render() {
        const {classes, ai: {currentGuess}} = this.props;
        const guess = `${currentGuess[0]}${currentGuess[1]}${currentGuess[2]}${currentGuess[3]}`;
        return (
            <Fragment>
                <Typography align="center" variant= "h4" colors ="textSecondary" color = "primary"> 
                     Is your number {guess}?
            </Typography>
            <div className = {classes.buttonsContainer}>
                <Button variant="contained" className = {[classes.button,classes.yes]}
                onClick = {this.handleClickYes}
                >Yes</Button>
                  <Button variant="contained" color="secondary" className = {classes.button}
                onClick = {this.handleClickNo}
                >No</Button>
            </div>
            </Fragment>
        )
    }
}

Guess.propTypes = {
    aiWin: PropTypes.func.isRequired,
    goToEnterScore: PropTypes.func.isRequired,
    ai: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    ai: state.ai
})

export default connect(mapStateToProps, {aiWin, goToEnterScore} )(withStyles(styles)(Guess))
