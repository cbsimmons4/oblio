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

class PlayerWon extends Component {

    handleClick = () => {
        this.props.restart();
    }

    render() {
        const {classes, playerGuesser: {history,currentNumberChoice,guessCountP}} = this.props;
        const numberChoice = `${currentNumberChoice[0]}${currentNumberChoice[1]}${currentNumberChoice[2]}${currentNumberChoice[3]}`;
        return (
            <Fragment>
                <Typography align="center" variant="h5" colors ="textSecondary" color = "primary"> 
                    It took {guessCountP} {guessCountP === 1? 'try' : 'tries'} for you to guess the number correctly!
                </Typography>
                <Typography align="center" variant="h5" colors ="textSecondary" color = "primary"> 
                    The number was {numberChoice}
                </Typography>
                <Button variant="contained" color = "primary" className = {[classes.button]}
                onClick = {this.handleClick}
                >Restart</Button>
            </Fragment>
        )
    }
}

PlayerWon.propTypes = {
    restart: PropTypes.func.isRequired,
    playerGuesser: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    playerGuesser: state.playerGuesser
})

export default connect(mapStateToProps, {restart} )(withStyles(styles)(PlayerWon))
