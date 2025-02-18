const healthHandler = {
    async health(req, res) {
        res.send({ message: 'Healthy server!' });
    },

}

export default healthHandler;