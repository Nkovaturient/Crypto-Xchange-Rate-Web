import React from "react";
import { Typography } from "antd";

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state= { hasError: false };
    }

    static getDerivedStateFromError(error) {
       //update state so the nxt render will show the fallback UI
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        //u cn also log the err to an err reportingservice
        console.error("Caught Error: ");
    }

    render (){
        if(this.state.hasError){
            //u cn render any custom fallback UI
            return <Typography.Title level={4}>
                Something went wrong! Sorry for the inconvenience!
            </Typography.Title>

        }
        return this.props.children;
    }
}