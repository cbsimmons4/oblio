import React, { Component,Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import {connect} from 'react-redux';
import {restart} from '../../redux/actions/aiGuesserActions';

const styles = (theme) => ({
    ...theme.spreadThis,
    button: {
        marginTop: '50px',
        display: 'block',
        margin: 'auto',
        width: 250,
        height: 100,
        fontSize: 40
    }
});

class AiWonPage extends Component {

    handleClick = () => {
        this.props.restart();
    }

    render() {
        const {classes, ai: {guessCount,currentGuess}} = this.props;
        const guess = `${currentGuess[0]}${currentGuess[1]}${currentGuess[2]}${currentGuess[3]}`;
        return (
            <Fragment>
                <Typography className ={classes.title} align="center" variant="h5" colors ="textSecondary" color = "primary"> 
                    It took {guessCount} {guessCount === 1? 'try' : 'tries'} to guess your number!
                </Typography>
                <Typography className ={classes.title} align="center" variant="h5" colors ="textSecondary" color = "primary"> 
                    Your number: {guess}
                </Typography>
                <Button variant="contained" color = "primary" className = {[classes.button]}
                onClick = {this.handleClick}
                >Restart</Button>
            </Fragment>
        )
    }
}

AiWonPage.propTypes = {
    restart: PropTypes.func.isRequired,
    ai: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    ai: state.ai
})

export default connect(mapStateToProps, {restart} )(withStyles(styles)(AiWonPage))
