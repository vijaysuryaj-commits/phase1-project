import { Button } from '@mui/material'
import React, { Component } from 'react'
import { withRouter } from '../Helpers/withRouter'
import { ArrowBack } from '@mui/icons-material'
class NoPageFound extends Component {
    render() {
        const { navigate } = this.props
        return (
            <div style={{ textAlign: 'center' }}>
                <h1 style={{ color: 'white' }}>
                    {':)'} 404 page not found!
                </h1>
                <Button variant={'contained'}
                    onClick={() => navigate('/')}
                    sx={{
                        mt: 4,
                        backgroundColor: "orange",
                        color: "#000",
                        fontWeight: "bold",
                        "&:hover": {
                            backgroundColor: "#ffb84d",
                            boxShadow: "0 0 15px orange",
                        },
                    }}

                >
                    <ArrowBack/> Back
                </Button>
            </div>
        )
    }
}

export default withRouter(NoPageFound)