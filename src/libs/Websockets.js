import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import http from './../libs/Http'

window.Pusher = Pusher;

const echo = new Echo({
    /* authEndpoint : 'http://localhost:8000/api/broadcasting/auth',*/
    authorizer: (channel, options) => {
        return {
            authorize: (socketId, callback) => {
                http.post('/api/broadcasting/auth', {
                    socket_id: socketId,
                    channel_name: channel.name
                })
                    .then(response => {
                        callback(false, response.data);
                    })
                    .catch(error => {
                        callback(true, error);
                    });
            }
        };
    },
    broadcaster: 'pusher',
    key: 'ccpT67Q9OqTSA73beV2rh1MH7g',
    wsHost: window.location.hostname,
    wsPort: 6001,
    forceTLS: false,
    disableStats: true,
    enabledTransports: ['ws', 'wss'],
    encrypted: true,
    cluster: 'mt1',
});

export default echo;