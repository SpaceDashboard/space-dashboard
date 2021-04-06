const mergeConfigs = require('webpack-merge');

/**
 * Special merger for managing our configs in special ways.
 *
 * Feel free to split this and create a seperate Dev and Prod merger if needed.
 */
const merger = mergeConfigs({
    customizeArray: function(base, overrides, key) {
        if (key === 'plugins') {
            // Inject our additional plugins before the cleanup plugin
            //  (the last one listed in the base setting's plugins)
            //  so that the injected plugins still see the full file structure
            const injectionPoint = base.length - 1;
            const baseHead = base.slice(0, injectionPoint);
            const baseTail = base.slice(injectionPoint);
            return baseHead.concat(overrides).concat(baseTail);
        }
        // Default logic
        return undefined;
    }
});

module.exports = {
    merger
};
