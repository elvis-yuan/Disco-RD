import {connect} from 'react-redux';
import ChannelChat from './channel_chat';
import {withRouter} from 'react-router-dom'

const msp = state => ({
  
})

const mdp = dispatch => ({
  
})

export default withRouter(connect(msp,mdp)(ChannelChat))