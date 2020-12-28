import React,  { Component } from 'react';
import Aux from '../Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = ( WrappedComponent, axiosInstance) => {
    return class extends Component {
        state = {
            error: null
        }

        setStateErrorNull = () => {
            this.setState({ error: null });
        }

        componentWillMount() {
            this.requestInceptors = axiosInstance.interceptors.request.use(request => {
                console.log(request);
                this.setStateErrorNull();
                return request;
            }, error => {
                console.log(error);
            });

            this.responseInceptors = axiosInstance.interceptors.response.use(response => response, error => {
                console.log(error);
                this.setState({ error: error });
            })
        }

        componentWillUnmount() {
            axiosInstance.interceptors.request.eject(this.requestInceptors);
            axiosInstance.interceptors.response.eject(this.responseInceptors);
        }
        
        render() {
            return (
                <Aux>
                    <Modal
                        show={this.state.error}
                        purchaseCancel={this.setStateErrorNull}>
                        {this.state.error ? this.state.error.message: null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
};

export default withErrorHandler;