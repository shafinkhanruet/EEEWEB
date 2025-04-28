const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  // Enable production mode for optimizations
  mode: 'production',
  
  // Entry point
  entry: './src/index.js',
  
  // Output configuration
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[contenthash].js', // Use content hash for cache busting
    chunkFilename: '[name].[contenthash].chunk.js', // Chunk naming for code splitting
    publicPath: '/',
    clean: true, // Clean the output directory before emit
  },
  
  // Optimization settings
  optimization: {
    minimize: true,
    minimizer: [
      // JavaScript minification
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true, // Remove console.log in production
          },
          mangle: true,
        },
        extractComments: false,
      }),
      // CSS minification
      new CssMinimizerPlugin(),
    ],
    // Code splitting configuration
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 20000, // 20kb minimum size to create a chunk
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // Get the package name
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            // Create a clean package name for better readability
            return `npm.${packageName.replace('@', '')}`;
          },
        },
      },
    },
    runtimeChunk: 'single', // Create a single runtime bundle for all chunks
  },
  
  // Module rules for processing different file types
  module: {
    rules: [
      // JavaScript/React processing
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
      // CSS processing
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      // Image optimization
      {
        test: /\.(png|jpg|jpeg|gif|svg|webp)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024, // 8kb - inline smaller images as data URLs
          },
        },
        generator: {
          filename: 'assets/images/[name].[hash][ext]',
        },
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              optipng: {
                enabled: true,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },
      // Font processing
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name].[hash][ext]',
        },
      },
      // Audio files
      {
        test: /\.(mp3|wav)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/audio/[name].[hash][ext]',
        },
      },
    ],
  },
  
  // Plugins
  plugins: [
    // Enable GZIP compression
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240, // Only compress files larger than 10kb
      minRatio: 0.8, // Only compress files that compress well
    }),
    // Bundle analyzer (disabled by default, enable for analysis)
    process.env.ANALYZE && new BundleAnalyzerPlugin(),
  ].filter(Boolean),
  
  // Performance hints
  performance: {
    hints: 'warning',
    maxEntrypointSize: 512000, // 500kb
    maxAssetSize: 512000, // 500kb
  },
  
  // Development server configuration
  devServer: {
    historyApiFallback: true,
    hot: true,
    compress: true,
  },
  
  // Source maps for production (hidden-source-map for security)
  devtool: 'hidden-source-map',
};
