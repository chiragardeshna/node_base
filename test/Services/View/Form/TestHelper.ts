let mockFlash = (input) => {
    return {
        flash: (name) => {
            return input[name];
        }
    }
};

export {mockFlash};