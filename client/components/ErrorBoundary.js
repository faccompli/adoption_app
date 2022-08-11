import { Component } from "react";
import { Link, Navigate } from 'react-router-dom';

class ErrorBoundary extends Component {
    state = { hasError: false, redirect: false };

    static getDerivedStateFromError(){
        return { hasError: true };
    }

    componentDidCatch(erro, info){
        console.error("Error Boundary caught an error:", error, info);
    }

    componentDidUpdate(){
        if(this.state.hasError){
            setTimeout(() => this.setState({ redirect: true }), 5000);
        }
    }

    render(){
        const { hasError, redirect } = this.state;

        if(redirect){
            return <Navigate to="/" />;
        } else if (hasError){
            return (
                <h2>There was an error. <Link to="/">Click here</Link> to go back to the home page, or wait five seconds to be redirected automatically.</h2>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;