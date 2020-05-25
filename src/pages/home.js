import React, { Component,Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import StartGame from '../components/aiGuesser/StartGame';
import PlayerThinking from '../components/aiGuesser/PlayerThinking';
import Guess from '../components/aiGuesser/Guess';
import AiWonPage from '../components/aiGuesser/AiWonPage';
import EnterScore from '../components/aiGuesser/EnterScore';
import ErrorPage from '../components/aiGuesser/ErrorPage';
import PlayerGuessingPage from '../components/playerGuesser/PlayerGuessingPage';
import PlayerWon from '../components/playerGuesser/PlayerWon';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import CircularProgress from '@material-ui/core/CircularProgress';

import {connect} from 'react-redux';
import {restart} from '../redux/actions/aiGuesserActions';
import {toggleMode} from '../redux/actions/modeActions';

const styles = (theme) => ({
    ...theme.spreadThis,
    gameBox: {
        position: 'relative',
        margin: 'auto',
        width: 700,
        height: 700
    },
    title: {
        padding: 25,
        paddingBottom: 10
    },
    guessCount: {
        position: 'absolute',
        bottom: '20px',
        right: '20px'
    },
    cp: {
        marginTop: "20%",
        display: 'block',
        margin: 'auto'
    },
    resetButton: {
        position: 'absolute',
        bottom: '20px',
        left: '20px'
    },
    toggleButton: {
        position: 'absolute',
        top: '-40px',
    }
});

class home extends Component {

    handleClick = () => {
        this.props.restart();
    }

    handleClickToggle = () => {
        this.props.toggleMode();
    }

    render() {
        const {
            classes,
            ai: {guessCount,uiState, loading},
            mode: {aiMode},
            playerGuesser: {uiStateP, loadingP, guessCountP}
        } = this.props;

        const gameMarkup = (

            (aiMode) ? (

                (loading)? (
                    <CircularProgress size = {100} className = {classes.cp}/>
                ) : (uiState === 'pregame') ? (
                    <StartGame/>
                ) : (uiState === 'playerThinking') ? (
                    <PlayerThinking/>
                ) : (uiState === 'guessing')? (
                    <Guess/>
                ) : (uiState === 'aiWin')? (
                    <AiWonPage/>
                ) : (uiState === 'score')? (
                    <EnterScore/>
                ):  (uiState === 'userMistake')? (
                    <ErrorPage/>
                ) : (
                    <Typography align="center" variant="body2" 
                    colors ="textSecondary" color = "primary"> 
                    Something went wrong...</Typography>
                )
            ) : (
                (loadingP) ? (
                    <CircularProgress size = {100} className = {classes.cp}/>
                ) : (uiStateP === 'playerGuessing') ? (
                    <PlayerGuessingPage/>
                ) : (uiStateP === 'playerWon') ? (
                    <PlayerWon/>
                ) : (
                    <p>Oops! Something went wrong...</p>
                )
            )
        )

        return (
            <Paper elevation={3} className = {classes.gameBox}>
                 <Fragment>
                     <Button variant="outlined" color = "secondary" 
                     className = {[classes.toggleButton]}
                     onClick = {this.handleClickToggle}>
                         {
                              (aiMode)? (
                                  'Click here to play as guesser'
                                ) :
                                (
                                    'Click here to play with AI guesser'
                                )
                         }
                    </Button>
                    <Typography className ={classes.title} align="center"
                    variant="h1" colors ="textSecondary" color = "primary">
                        Oblio!
                    </Typography>
                    {gameMarkup}
                    {
                        ((uiState !== 'pregame' && aiMode) || 
                        (uiStateP === 'playerGuessing' && !aiMode)) ? (
                            <Fragment>
                                <Typography className = {classes.guessCount} 
                                variant="h5" colors ="textSecondary" color = "primary">
                                    {
                                        aiMode ? (
                                            `Guess Count: ${guessCount}`
                                        ) : (
                                            `Guess Count: ${guessCountP}`
                                        )
                                    }
                                </Typography>
                                <Button color = "secondary" 
                                className = {[classes.resetButton]}
                                onClick = {this.handleClick}>
                                    Reset
                                </Button>
                            </Fragment>
                            ) : (
                            null
                        )
                    }
                 </Fragment>
            </Paper>
        )   
    }
}

home.propTypes = {
    restart: PropTypes.func.isRequired,
    toggleMode: PropTypes.func.isRequired,
    ai: PropTypes.object.isRequired,
    mode: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    ai: state.ai,
    mode: state.mode,
    playerGuesser: state.playerGuesser
})

export default connect(mapStateToProps,
    {restart,toggleMode})(withStyles(styles)(home))
