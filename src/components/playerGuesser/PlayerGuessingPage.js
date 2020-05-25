import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

import {connect} from 'react-redux';
import {setError,playerWin,guessMade} from '../../redux/actions/playerGuesserActions';

const styles = (theme) => ({
    ...theme.spreadThis,
    formControl: {
        margin: theme.spacing(1),
        minWidth: 20,
    },
    center: {
        display: 'block',
        margin: 'auto',
        textAlign: 'center'
    },
    submitButton: {
        margin: 5
    },
    historyContainer: {
        width: '300px',
        margin: 'auto',
        marginTop: 5
    },
    root: {
        maxWidth: '300px',
        overflow: 'auto',
        height: 260,
    },
    historySubHeader: {
        backgroundColor: '#fff',
        borderBottom: '1px solid rgba(100,100,100)'
    },
    historyListItem: {
        borderBottom: '1px solid rgba(230,230,230)'
    },
    listSection: {
        backgroundColor: 'inherit'
      },
    ul: {
        backgroundColor: 'inherit',
        padding: 0,
        textAlign: 'center'
    },
    giveupButton:{
        position: 'absolute',
        bottom: '-45px',
        left: '275px',
        fontSize: '12px'
    },
    giveupText: {
        margin: '5px'
    }
});

class PlayerGuessingPage extends Component {

    state = {
        forthDigit: 0,
        thirdDigit: 0,
        secondDigit: 0,
        firstDigit: 0,
        giveup: false
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleClickGiveUp = () => {
        this.setState({
            giveup: true
        })
    }

    // [{guess: [5,6,7,8], score:[2,0]},{guess: [1,2,3,4], score:[4,0]}]
    handleClick = () => {
        const {playerGuesser:{currentNumberChoice,history}} = this.props
        const forthDigit = this.state.forthDigit;
        const thirdDigit = this.state.thirdDigit;
        const secondDigit = this.state.secondDigit;
        const firstDigit = this.state.firstDigit;
        let error = ''

        this.props.setError('');
        history.forEach (current => {
            const guess = current.guess;
            // const score = current.score;
            if (forthDigit === guess[0] && thirdDigit === guess[1] &&
                secondDigit === guess[2] && firstDigit === guess[3] ){
                    error = 'Already made this guess'
                }
        });
        if (forthDigit === thirdDigit || forthDigit === secondDigit || forthDigit === firstDigit ||
            thirdDigit === secondDigit || thirdDigit === firstDigit || secondDigit === firstDigit) {
                error = 'Can\'t have repeating digits'
            }
        if (error !== '') {
            this.props.setError(error);
        } else if (
            forthDigit === currentNumberChoice[0] &&
            thirdDigit === currentNumberChoice[1] &&
            secondDigit === currentNumberChoice[2] &&
            firstDigit === currentNumberChoice[3]
        ) {
            this.props.playerWin();
        } else {
            this.props.guessMade([
                forthDigit,
                thirdDigit,
                secondDigit,
                firstDigit
            ])
        }
    }

    render() {
        const {classes, playerGuesser:{currentNumberChoice,history,errorMessage}} = this.props;
        return (
            <div>
                <Typography align="center" variant="h4" colors ="textSecondary" color = "primary"> 
                A number has been picked! 
                </Typography>
                <Typography align="center" variant="h5" colors ="textSecondary" color = "primary"> 
                Try to guess it...
                </Typography>
                <div className = {classes.center}>
                    <span>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-filled-label"></InputLabel>
                            <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            name="forthDigit"
                            value={this.state.forthDigit}
                            onChange={this.handleChange}
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={6}>6</MenuItem>
                                <MenuItem value={7}>7</MenuItem>
                                <MenuItem value={8}>8</MenuItem>
                                <MenuItem value={9}>9</MenuItem>
                            </Select>
                        </FormControl>
                    </span>
                    <span>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-filled-label"></InputLabel>
                            <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            name="thirdDigit"
                            value={this.state.thirdDigit}
                            onChange={this.handleChange}
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={6}>6</MenuItem>
                                <MenuItem value={7}>7</MenuItem>
                                <MenuItem value={8}>8</MenuItem>
                                <MenuItem value={9}>9</MenuItem>
                            </Select>
                        </FormControl>
                    </span>
                    <span>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-filled-label"></InputLabel>
                            <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            name="secondDigit"
                            value={this.state.secondDigit}
                            onChange={this.handleChange}
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={6}>6</MenuItem>
                                <MenuItem value={7}>7</MenuItem>
                                <MenuItem value={8}>8</MenuItem>
                                <MenuItem value={9}>9</MenuItem>
                            </Select>
                        </FormControl>
                    </span>
                    <span>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-filled-label"></InputLabel>
                            <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            name="firstDigit"
                            value={this.state.firstDigit}
                            onChange={this.handleChange}
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={6}>6</MenuItem>
                                <MenuItem value={7}>7</MenuItem>
                                <MenuItem value={8}>8</MenuItem>
                                <MenuItem value={9}>9</MenuItem>
                            </Select>
                        </FormControl>
                    </span>
                </div> 
                <div className = {classes.center}>
                    <Button variant="contained" color="primary" className = {classes.submitButton}
                        onClick = {this.handleClick}>
                        Make Guess!
                    </Button>
                    <div>
                        <Typography align="center" variant="body2" colors ="textSecondary" color = "secondary"> 
                            {errorMessage}
                        </Typography>
                    </div>
                </div>
                {
                    (history.length > 0) ? (
                        <div className = {classes.historyContainer}>
                            <List className={classes.root} subheader={<li />}>
                                <li className={classes.listSection}>
                                    <ul className={classes.ul}>
                                        <ListSubheader className = {classes.historySubHeader}>{`Previous Guesses`}</ListSubheader>
                                        {history.map((item) => (
                                        <ListItem key={item.guess} className = {classes.historyListItem}>
                                            <ListItemText 
                                            primary=
                                            {`${item.guess[0]}${item.guess[1]}${item.guess[2]}${item.guess[3]}
                                            . . . . ${item.score[0]}, ${item.score[1]}`} 
                                            />
                                        </ListItem>
                                        ))}
                                    </ul>
                                </li>
                            </List>
                        </div>
                    ) : (
                        null
                    )
                }
                {
                    this.state.giveup ? (
                        <Typography className = {classes.giveupText} align="center" variant="h5" colors ="textSecondary" color = "secondary"> 
                            Hmmm... try {currentNumberChoice[0]}{currentNumberChoice[1]}{currentNumberChoice[2]}{currentNumberChoice[3]}
                        </Typography>
                    ) : (null)
                }
                <div className = {classes.center}>
                    <Button color="secondary" className = {classes.giveupButton}
                        onClick = {this.handleClickGiveUp}>
                        Click here to give up
                    </Button>
                </div>
            </div>
        )
    }
}

PlayerGuessingPage.propTypes = {
    setError: PropTypes.func.isRequired,
    playerWin: PropTypes.func.isRequired,
    playerGuesser: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    playerGuesser: state.playerGuesser
})
const mapActionsToProps = {
    setError,
    playerWin,
    guessMade
}

export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(PlayerGuessingPage))
