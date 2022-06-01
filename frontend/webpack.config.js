export const module = {
    loaders: [
        {
            test: /plugin\.css$/,
            loaders: ['style-loader', 'css'],
        },
    ],
};