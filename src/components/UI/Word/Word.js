import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import EditButton from '../Buttons/Edit/Edit.js';
import DeleteButton from '../Buttons/Delete/Delete.js';
import Button from 'material-ui/Button';

const styles = theme => ({
    root: theme.mixins.gutters({
        paddingBottom: 8,
        margin: theme.spacing.unit * 6,
        maxWidth: '60%',
        minWidth: '40%'
    }),
    headline: {
        fontSize: 48,
        fontWeight: 300,
        marginTop: theme.spacing.unit*2,
        textAlign: 'center'
    },
    POS: {
        padding: theme.spacing.unit,
        width: 150,
        fontSize: 22,
        fontWeight: 300,
        textAlign: 'center'
    },
    meanings: {
        fontSize: 18,
        fontWeight: 300,
        padding: theme.spacing.unit,
        // textAlign: 'center',
        width: '100%'
    },
    button: {
        margin: theme.spacing.unit
    }
});

function PaperSheet(props) {
    const { classes, onEdit, onDelete, word } = props;
    return (
        <Paper className={classes.root} elevation={4}>
            <Typography className={classes.headline} type="headline" component="h2">
                {word.eng} <span style={{fontSize: 18}}>{word.rus}</span>
            </Typography>
            <div>
                {Object.entries(word.translations).map((pos, index) => {
                    return (
                        <div key={index} style={{
                            display: 'flex', borderTop: '1px solid #EEEEEE', alignItems: 'center'}}>
                            <Typography className={classes.POS}>
                                {pos[0]}
                            </Typography>
                            <Typography className={classes.meanings}>
                                {pos[1].join(', ')}
                            </Typography>
                        </div>
                    );
                })}
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                borderTop: '1px solid #EEEEEE',
                paddingTop: '8px'
            }}>
                <a
                    href={`https://en.oxforddictionaries.com/definition/${word.eng}`}
                    target='_blank'
                    style={{textDecoration: 'none', outline: 'none'}}
                >
                    <Button className={classes.button}>
                        Definition and examples
                    </Button>
                </a>
                <div style={{display: 'flex'}}>
                    <EditButton
                        onEdit={onEdit}/>
                    <DeleteButton onDelete={onDelete} />
                </div>
            </div>
        </Paper>
    );
}

PaperSheet.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PaperSheet);