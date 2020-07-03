const playSound = async(file, connection, dispatcher) => {
    // play
    dispatcher.on('start', () => {
        console.log(`${file} is now playing!`);
    });

    // when finished. Close 
    dispatcher.on('finish', () => {
        console.log(`${file} has finished playing!`);
        connection.disconnect();
    });

    // Always remember to handle errors appropriately!
    dispatcher.on('error', console.error);
};

module.exports.playSound = playSound;