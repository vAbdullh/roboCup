const healthHandler = {
    async health(req, res) {
        res.send({ message: 'Healthy server!' });
    },

}

module.exports = healthHandler;